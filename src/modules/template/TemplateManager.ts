import DOMPurify from 'dompurify';
import { TemplateApiClient, toServerId } from './TemplateApiClient.js';
import { getUserId } from '../../core/UserSession.js';

export interface TemplateNode {
  id:        string;
  type:      'folder' | 'template';
  name:      string;
  parentId:  string | null;
  content?:  string;
  isPublic:  boolean;
  isTemp?:   boolean;
  createdBy?: string | null;
  createdAt: number;
  updatedAt: number;
  order:     number;
}

const STORAGE_KEY = 'poa-templates';

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const SEED_TEMPLATES: { name: string; content: string }[] = [
  {
    name: '공지사항 기본 양식',
    content:
      '<h2>공지사항</h2>' +
      '<p><strong>제목:</strong>&nbsp;</p>' +
      '<p><strong>내용:</strong>&nbsp;</p>' +
      '<p><strong>담당자:</strong>&nbsp;</p>' +
      '<p><strong>날짜:</strong>&nbsp;</p>',
  },
  {
    name: '회의록 양식',
    content:
      '<h2>회의록</h2>' +
      '<p><strong>일시:</strong>&nbsp;</p>' +
      '<p><strong>장소:</strong>&nbsp;</p>' +
      '<p><strong>참석자:</strong>&nbsp;</p>' +
      '<hr>' +
      '<h3>안건</h3><ol><li></li></ol>' +
      '<h3>결정사항</h3><ol><li></li></ol>' +
      '<h3>다음 회의</h3><p>&nbsp;</p>',
  },
  {
    name: '주간 보고서 양식',
    content:
      '<h2>주간 보고서</h2>' +
      '<p><strong>기간:</strong>&nbsp;</p>' +
      '<p><strong>작성자:</strong>&nbsp;</p>' +
      '<hr>' +
      '<h3>이번 주 완료 업무</h3><ul><li></li></ul>' +
      '<h3>다음 주 계획</h3><ul><li></li></ul>' +
      '<h3>이슈 및 건의사항</h3><p>&nbsp;</p>',
  },
];

export class TemplateManager {
  private nodes: TemplateNode[] = [];

  constructor() {
    this._load();
    if (this.nodes.length === 0) this._seed();
    // API에서 데이터 동기화 (fire-and-forget, 실패 시 localStorage 유지)
    void this._syncFromServer();
  }

  // ── 저장/불러오기 ────────────────────────────────────────────────────────────

  private _load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.nodes = raw ? (JSON.parse(raw) as TemplateNode[]) : [];
    } catch {
      this.nodes = [];
    }
    this._cleanTemp();
    this._cleanDuplicates();
  }

  /** 같은 (type, parentId, name) 조합의 중복 노드 제거 — 가장 오래된 항목 유지, 자식 재귀 재연결 */
  private _cleanDuplicates(): void {
    const seen = new Map<string, string>(); // key → first id
    const remap = new Map<string, string>(); // duplicate id → first id

    for (const n of [...this.nodes].sort((a, b) => a.createdAt - b.createdAt)) {
      const key = `${n.type}|${n.parentId ?? ''}|${n.name}`;
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, n.id);
      } else {
        remap.set(n.id, existing);
      }
    }
    if (remap.size === 0) return;

    this.nodes = this.nodes
      .filter(n => !remap.has(n.id))
      .map(n => {
        if (n.parentId && remap.has(n.parentId)) return { ...n, parentId: remap.get(n.parentId)! };
        return n;
      });
    this._persist();
  }

  /** "임시_" 이름 항목 및 24시간 초과 isTemp 항목 자동 정리 */
  private _cleanTemp(): void {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const before = this.nodes.length;
    this.nodes = this.nodes.filter(n => {
      if (n.type !== 'template') return true;
      if (n.name.startsWith('임시_')) return false;
      if (n.isTemp && n.createdAt < cutoff) return false;
      return true;
    });
    if (this.nodes.length !== before) this._persist();
  }

  private _persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.nodes));
    } catch {
      this._evict();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.nodes)); } catch { /* full */ }
    }
  }

  /** LocalStorage 용량 초과 시 가장 오래된 템플릿 하나 제거 */
  private _evict(): void {
    const oldest = this.nodes
      .filter(n => n.type === 'template')
      .sort((a, b) => a.updatedAt - b.updatedAt)[0];
    if (oldest) this.nodes = this.nodes.filter(n => n.id !== oldest.id);
  }

  private _seed(): void {
    const pub: TemplateNode = {
      id: genId(), type: 'folder', name: '공용 템플릿',
      parentId: null, isPublic: true,
      createdAt: Date.now(), updatedAt: Date.now(), order: 0,
    };
    const my: TemplateNode = {
      id: genId(), type: 'folder', name: '내 템플릿',
      parentId: null, isPublic: false,
      createdAt: Date.now(), updatedAt: Date.now(), order: 1,
    };
    this.nodes.push(pub, my);

    SEED_TEMPLATES.forEach((t, i) => {
      const clean = String(DOMPurify.sanitize(t.content, { USE_PROFILES: { html: true } }));
      this.nodes.push({
        id: genId(), type: 'template', name: t.name,
        parentId: pub.id, content: clean, isPublic: true,
        createdAt: Date.now(), updatedAt: Date.now(), order: i,
      });
    });
    this._persist();
  }

  /** 서버 API에서 전체 데이터를 로드하여 localStorage에 반영한다 */
  private async _syncFromServer(): Promise<void> {
    try {
      const serverNodes = await TemplateApiClient.getAllNodes();
      if (serverNodes.length === 0) return;
      // isTemp 로컬 항목은 유지, 나머지는 서버 데이터로 교체
      const tempNodes = this.nodes.filter(n => n.isTemp);
      this.nodes = [...serverNodes, ...tempNodes];
      this._persist();
    } catch {
      console.warn('API 서버 연결 실패. LocalStorage 모드로 동작합니다.');
    }
  }

  // ── 조회 ────────────────────────────────────────────────────────────────

  getAll(): TemplateNode[] { return [...this.nodes]; }

  getById(id: string): TemplateNode | null {
    return this.nodes.find(n => n.id === id) ?? null;
  }

  getChildren(parentId: string | null): TemplateNode[] {
    return this.nodes
      .filter(n => n.parentId === parentId)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  }

  getRoots(): TemplateNode[] { return this.getChildren(null); }

  getFolders(): TemplateNode[] { return this.nodes.filter(n => n.type === 'folder'); }

  // ── 변경 ────────────────────────────────────────────────────────────────

  addFolder(name: string, parentId: string | null, isPublic = false): TemplateNode {
    const node: TemplateNode = {
      id: genId(), type: 'folder', name, parentId, isPublic,
      createdBy: isPublic ? null : getUserId(),
      createdAt: Date.now(), updatedAt: Date.now(),
      order: this.getChildren(parentId).length,
    };
    this.nodes.push(node);
    this._persist();

    // 서버 동기화 (성공 시 node.id를 서버 ID로 업데이트)
    const serverParentId = parentId ? toServerId(parentId) : null;
    void TemplateApiClient.createFolder({
      parentId: serverParentId,
      name: node.name,
      isPublic: node.isPublic,
      orderIndex: node.order,
    }).then(serverNode => {
      node.id = serverNode.id;
      this._persist();
    }).catch(() => {});

    return node;
  }

  addTemplate(name: string, content: string, parentId: string | null, isPublic = false, isTemp = false): TemplateNode {
    const clean = String(DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }));
    const node: TemplateNode = {
      id: genId(), type: 'template', name, parentId, content: clean, isPublic,
      ...(isTemp ? { isTemp: true } : {}),
      createdBy: isPublic ? null : getUserId(),
      createdAt: Date.now(), updatedAt: Date.now(),
      order: this.getChildren(parentId).length,
    };
    this.nodes.push(node);
    this._persist();

    // isTemp 항목은 서버에 저장하지 않음
    if (!isTemp) {
      const serverFolderId = parentId ? toServerId(parentId) : null;
      void TemplateApiClient.createTemplate({
        folderId: serverFolderId,
        name: node.name,
        content: node.content ?? '',
        isPublic: node.isPublic,
        isTemp: false,
        orderIndex: node.order,
      }).then(serverNode => {
        node.id = serverNode.id;
        this._persist();
      }).catch(() => {});
    }

    return node;
  }

  rename(id: string, name: string): boolean {
    const node = this.nodes.find(n => n.id === id);
    if (!node || !name.trim()) return false;
    node.name = name.trim();
    node.updatedAt = Date.now();
    this._persist();

    const serverId = toServerId(id);
    if (serverId !== null) {
      if (node.type === 'folder') {
        void TemplateApiClient.updateFolder(serverId, {
          parentId: node.parentId ? (toServerId(node.parentId) ?? null) : null,
          name: node.name,
          isPublic: node.isPublic,
          orderIndex: node.order,
        }).catch(() => {});
      } else {
        void TemplateApiClient.updateTemplate(serverId, {
          folderId: node.parentId ? (toServerId(node.parentId) ?? null) : null,
          name: node.name,
          isPublic: node.isPublic,
          orderIndex: node.order,
        }).catch(() => {});
      }
    }

    return true;
  }

  delete(id: string): void {
    const node = this.nodes.find(n => n.id === id);
    const type = node?.type;
    const serverId = toServerId(id);

    for (const child of this.getChildren(id)) this.delete(child.id);
    this.nodes = this.nodes.filter(n => n.id !== id);
    this._persist();

    if (serverId !== null) {
      const call = type === 'folder'
        ? TemplateApiClient.deleteFolder(serverId)
        : TemplateApiClient.deleteTemplate(serverId);
      void call.catch(() => {});
    }
  }

  move(id: string, newParentId: string | null): boolean {
    const node = this.nodes.find(n => n.id === id);
    if (!node || this._isDescendant(newParentId, id)) return false;
    node.parentId = newParentId;
    node.order = this.getChildren(newParentId).filter(n => n.id !== id).length;
    node.updatedAt = Date.now();
    this._persist();

    const serverId = toServerId(id);
    if (serverId !== null) {
      const serverParent = newParentId ? (toServerId(newParentId) ?? null) : null;
      if (node.type === 'folder') {
        void TemplateApiClient.updateFolder(serverId, {
          parentId: serverParent,
          name: node.name,
          isPublic: node.isPublic,
          orderIndex: node.order,
        }).catch(() => {});
      } else {
        void TemplateApiClient.updateTemplate(serverId, {
          folderId: serverParent,
          name: node.name,
          isPublic: node.isPublic,
          orderIndex: node.order,
        }).catch(() => {});
      }
    }

    return true;
  }

  private _isDescendant(nodeId: string | null, ancestorId: string): boolean {
    if (nodeId === null) return false;
    if (nodeId === ancestorId) return true;
    const n = this.nodes.find(n => n.id === nodeId);
    return n ? this._isDescendant(n.parentId, ancestorId) : false;
  }
}
