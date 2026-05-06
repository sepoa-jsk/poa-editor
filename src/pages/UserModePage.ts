import { buildUserModeUrl } from '../core/AppMode.js';
import { TemplateManager } from '../modules/template/TemplateManager.js';
import type { TemplateNode } from '../modules/template/TemplateManager.js';

/**
 * 사용자 모드 — 템플릿 선택 화면.
 * template 파라미터가 없을 때 저장된 템플릿 목록을 카드 형태로 표시한다.
 * template 파라미터가 있는 경우는 index.html에서 editor.enterUserMode()로 처리한다.
 */
export class UserModePage {
  private readonly mgr: TemplateManager;

  constructor(private readonly container: HTMLElement) {
    this.mgr = new TemplateManager();
  }

  renderTemplateSelector(): void {
    this.container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'user-mode-selector-title';
    title.textContent = '양식 선택';
    this.container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'user-mode-card-grid';

    const templates = this.mgr.getAll().filter(n => n.type === 'template');

    if (templates.length === 0) {
      const empty = document.createElement('p');
      empty.style.cssText = 'color:#9ca3af;font-size:14px;';
      empty.textContent = '저장된 템플릿이 없습니다.';
      grid.appendChild(empty);
    } else {
      for (const tmpl of templates) {
        grid.appendChild(this._buildCard(tmpl));
      }
    }

    this.container.appendChild(grid);
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
}
