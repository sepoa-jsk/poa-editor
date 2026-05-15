import DOMPurify from 'dompurify';
import { TemplateApiClient, toServerId } from './TemplateApiClient.js';
import { getUserId } from '../../core/UserSession.js';
import { isWriteMode } from '../../core/AppMode.js';
const STORAGE_KEY = 'poa-templates';
const CLEANUP_FLAG = 'poa-cleanup-v2';
function genId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function isTempNode(n) {
    if (n.isTemp)
        return true;
    if (n.name.startsWith('임시_'))
        return true;
    if (n.name.startsWith('preview_'))
        return true;
    if (n.name.startsWith('__'))
        return true;
    return false;
}
export class TemplateManager {
    nodes = [];
    constructor() {
        TemplateManager.cleanupOnce();
        this._load();
        if (!isWriteMode())
            void this._syncFromServer();
    }
    // ── 저장/불러오기 ────────────────────────────────────────────────────────────
    _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this.nodes = raw ? JSON.parse(raw) : [];
        }
        catch {
            this.nodes = [];
        }
        this._cleanTemp();
        this._deduplicateById();
        this._cleanDuplicates();
    }
    /** id 기준 단순 중복 제거 (localStorage 폴백 시 동일 id가 두 번 들어온 경우 방어) */
    _deduplicateById() {
        const seen = new Set();
        const before = this.nodes.length;
        this.nodes = this.nodes.filter(n => {
            if (seen.has(n.id))
                return false;
            seen.add(n.id);
            return true;
        });
        if (this.nodes.length !== before)
            this._persist();
    }
    /** 같은 (type, parentId, name) 조합의 중복 노드 제거 — 가장 오래된 항목 유지, 자식 재귀 재연결 */
    _cleanDuplicates() {
        const seen = new Map(); // key → first id
        const remap = new Map(); // duplicate id → first id
        for (const n of [...this.nodes].sort((a, b) => a.createdAt - b.createdAt)) {
            const key = `${n.type}|${n.parentId ?? ''}|${n.name}`;
            const existing = seen.get(key);
            if (!existing) {
                seen.set(key, n.id);
            }
            else {
                remap.set(n.id, existing);
            }
        }
        if (remap.size === 0)
            return;
        this.nodes = this.nodes
            .filter(n => !remap.has(n.id))
            .map(n => {
            if (n.parentId && remap.has(n.parentId))
                return { ...n, parentId: remap.get(n.parentId) };
            return n;
        });
        this._persist();
    }
    /** isTemp 항목 및 임시_/preview_/__ 이름 항목 전부 정리 */
    _cleanTemp() {
        const before = this.nodes.length;
        this.nodes = this.nodes.filter(n => !isTempNode(n));
        if (this.nodes.length !== before)
            this._persist();
    }
    _persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.nodes));
        }
        catch {
            this._evict();
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.nodes));
            }
            catch { /* full */ }
        }
    }
    /** LocalStorage 용량 초과 시 가장 오래된 템플릿 하나 제거 */
    _evict() {
        const oldest = this.nodes
            .filter(n => n.type === 'template')
            .sort((a, b) => a.updatedAt - b.updatedAt)[0];
        if (oldest)
            this.nodes = this.nodes.filter(n => n.id !== oldest.id);
    }
    /** localStorage를 다시 읽어 노드 목록을 갱신한다 */
    reload() {
        this._load();
    }
    /** 서버 API에서 전체 데이터를 로드하여 localStorage에 반영한다 */
    async _syncFromServer() {
        try {
            const serverNodes = await TemplateApiClient.getAllNodes();
            // API 응답 성공 시 → 로컬 캐시/시드 완전 교체 (서버가 단일 진실 원천)
            try {
                localStorage.removeItem(STORAGE_KEY);
            }
            catch { /* ignore */ }
            this.nodes = serverNodes.filter(n => !isTempNode(n));
            this._persist();
        }
        catch {
            console.warn('API 서버 연결 실패. LocalStorage 모드로 동작합니다.');
        }
    }
    /**
     * 최초 1회: localStorage의 임시/프리뷰 항목을 일괄 제거한다.
     * `poa-cleanup-v2` 플래그로 중복 실행을 방지한다.
     */
    static cleanupOnce() {
        try {
            if (localStorage.getItem(CLEANUP_FLAG))
                return;
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const nodes = JSON.parse(raw);
                const cleaned = nodes.filter(n => !isTempNode(n));
                if (cleaned.length !== nodes.length) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
                }
            }
            localStorage.setItem(CLEANUP_FLAG, '1');
        }
        catch { /* localStorage 불가 환경 */ }
    }
    // ── 조회 ────────────────────────────────────────────────────────────────
    getAll() { return [...this.nodes]; }
    getById(id) {
        return this.nodes.find(n => n.id === id) ?? null;
    }
    getChildren(parentId) {
        return this.nodes
            .filter(n => n.parentId === parentId)
            .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    }
    getRoots() { return this.getChildren(null); }
    getFolders() { return this.nodes.filter(n => n.type === 'folder'); }
    // ── 변경 ────────────────────────────────────────────────────────────────
    addFolder(name, parentId, isPublic = false) {
        const node = {
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
        }).catch(() => { });
        return node;
    }
    addTemplate(name, content, parentId, isPublic = false, isTemp = false) {
        const clean = String(DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }));
        const node = {
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
            }).catch(() => { });
        }
        return node;
    }
    rename(id, name) {
        const node = this.nodes.find(n => n.id === id);
        if (!node || !name.trim())
            return false;
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
                }).catch(() => { });
            }
            else {
                void TemplateApiClient.updateTemplate(serverId, {
                    folderId: node.parentId ? (toServerId(node.parentId) ?? null) : null,
                    name: node.name,
                    isPublic: node.isPublic,
                    orderIndex: node.order,
                }).catch(() => { });
            }
        }
        return true;
    }
    delete(id) {
        const node = this.nodes.find(n => n.id === id);
        const type = node?.type;
        const serverId = toServerId(id);
        for (const child of this.getChildren(id))
            this.delete(child.id);
        this.nodes = this.nodes.filter(n => n.id !== id);
        this._persist();
        if (serverId !== null) {
            const call = type === 'folder'
                ? TemplateApiClient.deleteFolder(serverId)
                : TemplateApiClient.deleteTemplate(serverId);
            void call.catch(() => { });
        }
    }
    move(id, newParentId) {
        const node = this.nodes.find(n => n.id === id);
        if (!node || this._isDescendant(newParentId, id))
            return false;
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
                }).catch(() => { });
            }
            else {
                void TemplateApiClient.updateTemplate(serverId, {
                    folderId: serverParent,
                    name: node.name,
                    isPublic: node.isPublic,
                    orderIndex: node.order,
                }).catch(() => { });
            }
        }
        return true;
    }
    moveNode(nodeId, newParentId, position, targetId) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node)
            return false;
        if (node.type === 'folder' && this._isDescendant(newParentId, nodeId))
            return false;
        const oldParentId = node.parentId;
        node.parentId = newParentId;
        // 새 위치의 형제 목록 (이동 노드 제외) 정렬
        const siblings = this.nodes
            .filter(n => n.parentId === newParentId && n.id !== nodeId)
            .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
        // 삽입 위치 계산
        let insertIdx;
        if (targetId === null || position === 'inside') {
            insertIdx = siblings.length;
        }
        else {
            const ti = siblings.findIndex(n => n.id === targetId);
            insertIdx = ti < 0 ? siblings.length : (position === 'before' ? ti : ti + 1);
        }
        siblings.splice(insertIdx, 0, node);
        siblings.forEach((n, i) => { n.order = i; });
        // 이전 부모 형제 재정렬
        if (oldParentId !== newParentId) {
            this.nodes
                .filter(n => n.parentId === oldParentId)
                .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
                .forEach((n, i) => { n.order = i; });
        }
        node.updatedAt = Date.now();
        this._persist();
        // 서버 동기화 (이동된 노드만)
        const serverId = toServerId(nodeId);
        if (serverId !== null) {
            const serverParent = newParentId ? (toServerId(newParentId) ?? null) : null;
            if (node.type === 'folder') {
                void TemplateApiClient.updateFolder(serverId, {
                    parentId: serverParent,
                    name: node.name,
                    isPublic: node.isPublic,
                    orderIndex: node.order,
                }).catch(() => { });
            }
            else {
                void TemplateApiClient.updateTemplate(serverId, {
                    folderId: serverParent,
                    name: node.name,
                    isPublic: node.isPublic,
                    orderIndex: node.order,
                }).catch(() => { });
            }
        }
        return true;
    }
    _isDescendant(nodeId, ancestorId) {
        if (nodeId === null)
            return false;
        if (nodeId === ancestorId)
            return true;
        const n = this.nodes.find(n => n.id === nodeId);
        return n ? this._isDescendant(n.parentId, ancestorId) : false;
    }
}
