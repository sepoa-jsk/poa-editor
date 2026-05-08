import { buildUserModeUrl } from '../core/AppMode.js';
import { TemplateManager } from '../modules/template/TemplateManager.js';
import type { TemplateNode } from '../modules/template/TemplateManager.js';
import { TemplateApiClient, toServerId } from '../modules/template/TemplateApiClient.js';

/**
 * 사용자 모드 — 템플릿 선택 화면.
 * template 파라미터가 없을 때 저장된 템플릿 목록을 카드 형태로 표시한다.
 * template 파라미터가 있는 경우는 index.html에서 loadTemplateById()로 처리한다.
 */
export class UserModePage {
  private readonly mgr: TemplateManager;
  private grid!: HTMLElement;

  constructor(private readonly container: HTMLElement) {
    this.mgr = new TemplateManager();
  }

  renderTemplateSelector(): void {
    this.container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'user-mode-selector-title';
    title.textContent = '양식 선택';
    this.container.appendChild(title);

    this.grid = document.createElement('div');
    this.grid.className = 'user-mode-card-grid';
    this.container.appendChild(this.grid);

    // 로컬 캐시로 먼저 렌더 (빠른 초기 표시)
    const local = this.mgr.getAll().filter(n => n.type === 'template' && !n.isTemp);
    this._renderCards(local);

    // 서버에서 최신 목록으로 갱신
    void this._refreshFromServer();
  }

  private async _refreshFromServer(): Promise<void> {
    try {
      const serverTemplates = await TemplateApiClient.getTemplates();
      const templates = serverTemplates.filter(n => !n.isTemp);
      this._renderCards(templates);
    } catch {
      // 서버 연결 실패 시 로컬 캐시 유지
    }
  }

  private _renderCards(templates: TemplateNode[]): void {
    this.grid.innerHTML = '';
    if (templates.length === 0) {
      const empty = document.createElement('p');
      empty.style.cssText = 'color:#9ca3af;font-size:14px;';
      empty.textContent = '저장된 템플릿이 없습니다.';
      this.grid.appendChild(empty);
    } else {
      for (const tmpl of templates) {
        this.grid.appendChild(this._buildCard(tmpl));
      }
    }
  }

  private _buildCard(tmpl: TemplateNode): HTMLElement {
    const card = document.createElement('div');
    card.className = 'user-mode-card';

    const icon = document.createElement('div');
    icon.className = 'user-mode-card-icon';
    icon.textContent = '📄';

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
   * 서버 ID('s-64' 형식)면 API 단건 조회, 실패 시 로컬 스토리지 폴백.
   */
  static async loadTemplateById(templateId: string): Promise<TemplateNode | null> {
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
