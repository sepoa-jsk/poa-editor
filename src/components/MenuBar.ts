import { eventBus, BusEvent } from '../utils/eventBus.js';
import type { MenuTab } from '../core/types.js';

const TABS: ReadonlyArray<{ id: MenuTab; label: string }> = [
  { id: 'file',   label: '파일' },
  { id: 'edit',   label: '편집' },
  { id: 'insert', label: '삽입' },
  { id: 'view',   label: '보기' },
  { id: 'table',  label: '표' },
  { id: 'format', label: '서식' },
  { id: 'misc',   label: '기타' },
  { id: 'help',   label: '도움말' },
];

const CSS = `
:host { display: block; }
.menubar {
  display: flex; align-items: stretch;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 8px;
  user-select: none; -webkit-user-select: none;
}
.tab {
  padding: 6px 12px;
  font-size: 13px; font-weight: 500;
  color: #374151;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color 0.12s, background 0.12s;
  border-radius: 4px 4px 0 0;
}
.tab:hover {
  color: #111827;
  background: #F9FAFB;
}
.tab.active {
  color: #2563EB;
  border-bottom-color: #2563EB;
  background: transparent;
}
.tab[data-user-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
.user-mode-badge {
  margin-left: auto;
  align-self: center;
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
`;

const USER_DISABLED_TABS = new Set<MenuTab>(['edit', 'insert', 'table', 'format', 'misc']);

export class PoaMenuBar extends HTMLElement {
  private shadow: ShadowRoot;
  private _activeTab: MenuTab = 'edit';
  private _userMode = false;

  private readonly busHandler = ({ tab }: { tab: MenuTab }): void => {
    this._activeTab = tab;
    this.updateActive();
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    const html = TABS.map((t) =>
      `<button class="tab${t.id === this._activeTab ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`,
    ).join('');
    this.shadow.innerHTML = `<style>${CSS}</style><div class="menubar">${html}</div>`;
    this.shadow.querySelector('.menubar')!.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const tab = (e.target as HTMLElement).dataset.tab as MenuTab | undefined;
      if (tab) eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab });
    });
    eventBus.on<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
  }

  disconnectedCallback(): void {
    eventBus.off<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
  }

  /** 사용자 모드 적용: 편집·삽입·표·서식·기타 탭 비활성화, 뱃지 표시 */
  applyUserMode(): void {
    this._userMode = true;
    // 현재 탭이 비활성화 대상이면 파일 탭으로 전환
    if (USER_DISABLED_TABS.has(this._activeTab)) {
      eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: 'file' as MenuTab });
    }
    this._applyUserModeStyles();
  }

  private _applyUserModeStyles(): void {
    if (!this._userMode) return;
    this.shadow.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn => {
      const tab = btn.dataset.tab as MenuTab;
      if (USER_DISABLED_TABS.has(tab)) {
        btn.dataset.userDisabled = 'true';
      }
    });
    const bar = this.shadow.querySelector('.menubar')!;
    if (!bar.querySelector('.user-mode-badge')) {
      const badge = document.createElement('span');
      badge.className = 'user-mode-badge';
      badge.textContent = '사용자 모드';
      bar.appendChild(badge);
    }
  }

  private updateActive(): void {
    this.shadow.querySelectorAll<HTMLElement>('.tab').forEach((el) => {
      el.classList.toggle('active', el.dataset.tab === this._activeTab);
    });
  }
}
