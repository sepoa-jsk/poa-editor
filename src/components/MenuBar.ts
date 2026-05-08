import { eventBus, BusEvent } from '../utils/eventBus.js';
import type { MenuTab } from '../core/types.js';
import { getUserName, setUserName, isAdmin } from '../core/UserSession.js';
import { Icons } from '../utils/icons.js';

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
.user-area {
  margin-left: auto;
  display: flex; align-items: center; gap: 5px;
  padding: 0 8px; font-size: 12px; color: #6B7280;
  cursor: pointer; border-radius: 4px; user-select: none;
  position: relative; height: 100%;
}
.user-area:hover { color: #374151; }
.user-area svg { flex-shrink: 0; }
.user-name-text { max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.admin-badge {
  font-size: 10px; font-weight: 700; color: #2563eb; background: #eff6ff;
  border: 1px solid #bfdbfe; border-radius: 3px; padding: 1px 5px;
}
.user-dropdown {
  position: absolute; top: calc(100% + 4px); right: 0;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 12px; z-index: 10000; box-shadow: 0 4px 16px rgba(0,0,0,.12);
  width: 200px; display: flex; flex-direction: column; gap: 8px;
}
.user-dropdown-label {
  font-size: 11px; font-weight: 600; color: #94a3b8;
}
.user-dropdown input {
  width: 100%; padding: 7px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit;
  transition: border-color .15s;
}
.user-dropdown input:focus { border-color: #2563eb; }
.user-dropdown-btn {
  align-self: flex-end; padding: 6px 14px; border: none; border-radius: 8px;
  background: #2563eb; color: #fff; font-size: 13px; cursor: pointer; font-family: inherit;
  transition: background .12s;
}
.user-dropdown-btn:hover { background: #1d4ed8; }
.user-dropdown.hidden { display: none; }
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
    // shadow.innerHTML에는 탭 버튼만 포함 — SVG 등 복잡한 HTML은 DOM API로 별도 구성
    const tabsHtml = TABS.map((t) =>
      `<button class="tab${t.id === this._activeTab ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`,
    ).join('');
    this.shadow.innerHTML = `<style>${CSS}</style><div class="menubar">${tabsHtml}</div>`;

    // 사용자 영역을 DOM API로 구성 (template literal 안 SVG 파싱 이슈 완전 방지)
    const bar = this.shadow.querySelector('.menubar')!;
    const userArea = document.createElement('div');
    userArea.className = 'user-area';
    userArea.id = 'user-area';

    // 아이콘 SVG (div.innerHTML로 단독 삽입 시 안전하게 파싱)
    const iconWrap = document.createElement('span');
    iconWrap.style.cssText = 'display:contents';
    iconWrap.innerHTML = Icons.userCircle;
    userArea.appendChild(iconWrap);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'user-name-text';
    nameSpan.id = 'user-name-text';
    nameSpan.textContent = getUserName();
    userArea.appendChild(nameSpan);

    if (isAdmin()) {
      const badge = document.createElement('span');
      badge.className = 'admin-badge';
      badge.textContent = '관리자';
      userArea.appendChild(badge);
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown hidden';
    dropdown.id = 'user-dropdown';
    const ddLabel = document.createElement('div');
    ddLabel.className = 'user-dropdown-label';
    ddLabel.textContent = '사용자 이름';
    const ddInput = document.createElement('input');
    ddInput.type = 'text';
    ddInput.id = 'user-name-input';
    ddInput.placeholder = '사용자 이름';
    const ddBtn = document.createElement('button');
    ddBtn.className = 'user-dropdown-btn';
    ddBtn.id = 'user-name-confirm';
    ddBtn.textContent = '확인';
    dropdown.append(ddLabel, ddInput, ddBtn);
    userArea.appendChild(dropdown);

    bar.appendChild(userArea);

    this.shadow.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: btn.dataset.tab as MenuTab });
      });
    });

    this._bindUserArea();
    eventBus.on<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
  }

  disconnectedCallback(): void {
    eventBus.off<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
  }

  private _bindUserArea(): void {
    const area     = this.shadow.getElementById('user-area')!;
    const dropdown = this.shadow.getElementById('user-dropdown')!;
    const input    = this.shadow.getElementById('user-name-input') as HTMLInputElement;
    const confirm  = this.shadow.getElementById('user-name-confirm')!;
    const nameText = this.shadow.getElementById('user-name-text')!;

    area.addEventListener('mousedown', e => {
      e.preventDefault();
      if ((e.target as HTMLElement).closest('#user-dropdown')) return;
      const hidden = dropdown.classList.contains('hidden');
      dropdown.classList.toggle('hidden', !hidden);
      if (hidden) {
        input.value = getUserName();
        setTimeout(() => { input.focus(); input.select(); }, 50);
      }
    });

    const apply = (): void => {
      const name = input.value.trim() || '사용자';
      setUserName(name);
      nameText.textContent = name;
      dropdown.classList.add('hidden');
    };

    confirm.addEventListener('mousedown', e => { e.preventDefault(); apply(); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });

    document.addEventListener('click', (e) => {
      if (!area.contains(e.target as Node)) dropdown.classList.add('hidden');
    });
  }

  /** 사용자 모드 적용: 편집·삽입·표·서식·기타 탭 비활성화, 뱃지 표시 */
  applyUserMode(): void {
    this._userMode = true;
    if (USER_DISABLED_TABS.has(this._activeTab)) {
      eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: 'file' as MenuTab });
    }
    this._applyUserModeStyles();
  }

  private _applyUserModeStyles(): void {
    if (!this._userMode) return;
    this.shadow.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn => {
      const tab = btn.dataset.tab as MenuTab;
      if (USER_DISABLED_TABS.has(tab)) btn.dataset.userDisabled = 'true';
    });
    const bar = this.shadow.querySelector('.menubar')!;
    if (!bar.querySelector('.user-mode-badge')) {
      const badge = document.createElement('span');
      badge.className = 'user-mode-badge';
      badge.textContent = '사용자 모드';
      // user-area 앞에 삽입
      const userArea = bar.querySelector('.user-area');
      if (userArea) bar.insertBefore(badge, userArea);
      else bar.appendChild(badge);
    }
  }

  private updateActive(): void {
    this.shadow.querySelectorAll<HTMLElement>('.tab').forEach((el) => {
      el.classList.toggle('active', el.dataset.tab === this._activeTab);
    });
  }
}
