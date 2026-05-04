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
  background: var(--poa-menubar-bg, #f0f0f0);
  border-bottom: 1px solid var(--poa-toolbar-border, #ddd);
  padding: 0 6px;
  user-select: none; -webkit-user-select: none;
}
.tab {
  padding: 5px 12px;
  font-size: 13px; color: #333;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
}
.tab:hover { background: rgba(0,0,0,0.06); color: #000; }
.tab.active {
  color: var(--poa-accent, #1565c0);
  border-bottom-color: var(--poa-accent, #1565c0);
  font-weight: 600;
  background: #fff;
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
