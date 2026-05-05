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
`;

export class PoaMenuBar extends HTMLElement {
  private shadow: ShadowRoot;
  private _activeTab: MenuTab = 'edit';

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

  private updateActive(): void {
    this.shadow.querySelectorAll<HTMLElement>('.tab').forEach((el) => {
      el.classList.toggle('active', el.dataset.tab === this._activeTab);
    });
  }
}
