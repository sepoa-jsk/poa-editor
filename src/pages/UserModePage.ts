import { buildUserModeUrl } from '../core/AppMode.js';
import { TemplateManager } from '../modules/template/TemplateManager.js';
import type { TemplateNode } from '../modules/template/TemplateManager.js';
import { TemplateApiClient, toServerId } from '../modules/template/TemplateApiClient.js';
import DOMPurify from 'dompurify';
import { FileText, Users, User } from 'lucide-static';
import { pxN } from '../utils/icons.js';

const CARD_ICON   = pxN(FileText, 36);
const ICON_USERS  = pxN(Users, 14);
const ICON_USER   = pxN(User, 14);

function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } });
}

function isValidTemplate(n: TemplateNode): boolean {
  return (
    n.type === 'template' &&
    !n.isTemp &&
    !n.name?.startsWith('임시_') &&
    !n.name?.startsWith('preview_') &&
    !n.name?.startsWith('__') &&
    (n.name?.trim().length ?? 0) > 0 &&
    n.content != null
  );
}

/**
 * 사용자 모드 — 템플릿 선택 화면.
 * template 파라미터가 없을 때 저장된 템플릿 목록을 공용/개인 섹션으로 표시한다.
 * template 파라미터가 있는 경우는 index.html에서 loadTemplateById()로 처리한다.
 */
export class UserModePage {
  private readonly mgr: TemplateManager;
  private publicGrid!: HTMLElement;
  private privateGrid!: HTMLElement;

  constructor(private readonly container: HTMLElement) {
    this.mgr = new TemplateManager();
  }

  renderTemplateSelector(): void {
    this.container.innerHTML = '';

    const page = document.createElement('div');
    page.className = 'user-mode-page';

    const title = document.createElement('h2');
    title.className = 'user-mode-title';
    title.textContent = '양식 선택';
    page.appendChild(title);

    const [pubSection, pubGrid] = this._buildSection('공용 양식', ICON_USERS);
    this.publicGrid = pubGrid;
    page.appendChild(pubSection);

    const [priSection, priGrid] = this._buildSection('내 양식', ICON_USER);
    this.privateGrid = priGrid;
    page.appendChild(priSection);

    this.container.appendChild(page);

    // 로컬 캐시로 먼저 렌더 (빠른 초기 표시)
    this._renderSections(this.mgr.getAll().filter(isValidTemplate));

    // 서버에서 최신 목록으로 갱신
    void this._refreshFromServer();
  }

  private _buildSection(label: string, iconSvg: string): [HTMLElement, HTMLElement] {
    const section = document.createElement('section');
    section.className = 'user-mode-section';

    const header = document.createElement('h3');
    header.className = 'user-mode-section-header';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'section-header-icon';
    iconSpan.innerHTML = sanitizeSvg(iconSvg);

    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;

    header.appendChild(iconSpan);
    header.appendChild(labelSpan);
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'user-mode-card-grid';
    section.appendChild(grid);

    return [section, grid];
  }

  private async _refreshFromServer(): Promise<void> {
    try {
      const serverTemplates = await TemplateApiClient.getTemplates();
      this._renderSections(serverTemplates.filter(isValidTemplate));
    } catch {
      // 서버 연결 실패 시 로컬 캐시 유지
    }
  }

  private _renderSections(templates: TemplateNode[]): void {
    // id 기준 중복 제거
    const seenId = new Set<string>();
    const uniqueById = templates.filter(t => {
      if (seenId.has(t.id)) return false;
      seenId.add(t.id);
      return true;
    });

    // 동일 이름 중복 제거 — 가장 최근 updatedAt 유지
    const byName = new Map<string, TemplateNode>();
    for (const t of uniqueById) {
      const key = `${t.isPublic ? 'pub' : 'pri'}|${t.name}`;
      const existing = byName.get(key);
      if (!existing || t.updatedAt > existing.updatedAt) byName.set(key, t);
    }
    const unique = Array.from(byName.values());

    const publicTemplates  = unique.filter(t => t.isPublic);
    const privateTemplates = unique.filter(t => !t.isPublic);

    this._renderCards(this.publicGrid,  publicTemplates,  'public',  '등록된 공용 양식이 없습니다.');
    this._renderCards(this.privateGrid, privateTemplates, 'private', '저장된 개인 양식이 없습니다.');
  }

  private _renderCards(
    grid: HTMLElement,
    templates: TemplateNode[],
    kind: 'public' | 'private',
    emptyMsg: string,
  ): void {
    grid.innerHTML = '';
    if (templates.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'user-mode-empty';
      empty.textContent = emptyMsg;
      grid.appendChild(empty);
    } else {
      for (const tmpl of templates) {
        grid.appendChild(this._buildCard(tmpl, kind));
      }
    }
  }

  private _buildCard(tmpl: TemplateNode, kind: 'public' | 'private'): HTMLElement {
    const card = document.createElement('div');
    card.className = `user-mode-card user-mode-card--${kind}`;

    const icon = document.createElement('div');
    icon.className = 'user-mode-card-icon';
    icon.innerHTML = sanitizeSvg(CARD_ICON);

    const name = document.createElement('div');
    name.className = 'user-mode-card-name';
    name.textContent = tmpl.name;

    card.appendChild(icon);
    card.appendChild(name);
    card.addEventListener('click', () => {
      window.location.href = buildUserModeUrl(tmpl.id);
    });
    return card;
  }

  /**
   * URL의 templateId로 템플릿 내용을 로드한다.
   * '__preview__': sessionStorage에서 미리보기 HTML 반환 (DB/localStorage 저장 없음).
   * 서버 ID('s-64' 형식)면 API 단건 조회, 실패 시 로컬 스토리지 폴백.
   */
  static async loadTemplateById(templateId: string): Promise<TemplateNode | null> {
    if (templateId === '__preview__') {
      const html = sessionStorage.getItem('poa-preview-html');
      if (!html) return null;
      return {
        id: '__preview__',
        type: 'template',
        name: '미리보기',
        parentId: null,
        content: html,
        isPublic: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        order: 0,
      };
    }

    const serverId = toServerId(templateId);
    if (serverId !== null) {
      try {
        return await TemplateApiClient.getTemplate(serverId);
      } catch {
        // 서버 실패 시 로컬 폴백
      }
    }
    const mgr = new TemplateManager();
    return mgr.getById(templateId) ?? null;
  }
}
