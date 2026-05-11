import { eventBus, BusEvent } from '../utils/eventBus.js';
import type { MenuTab } from '../core/types.js';
import type { ViewMode } from '../modules/view/ViewManager.js';
import { Icons, ACTION_ICON } from '../utils/icons.js';
import { DOCUMENT_FIELDS } from '../modules/insert/DocumentFields.js';
import type { DocumentField } from '../modules/insert/DocumentFields.js';

/** [label, action, value?, title?] */
type BDef = readonly [string, string, string?, string?];
/** 드롭다운 버튼 정의 */
interface DropdownDef {
  readonly dropdown: true;
  readonly id: string;
  readonly label: string;
  /** Icons 키 — 드롭다운 토글 버튼 앞에 표시할 아이콘 */
  readonly iconKey?: string;
  /** [label, action, value?, typeIcon?] */
  readonly items: ReadonlyArray<readonly [string, string, string?, string?]>;
}
/** null = 구분선 */
type GroupDef = ReadonlyArray<BDef | DropdownDef | null>;

const TYPE_ICONS: Record<string, string> = {
  text:   Icons.fieldText,
  number: Icons.fieldNumber,
  date:   Icons.fieldDate,
};

/** 카테고리별로 그룹핑한 양식 필드 드롭다운 아이템 생성 */
function buildFieldDropdownItems(): ReadonlyArray<readonly [string, string, string?, string?]> {
  const categories: ReadonlyArray<DocumentField['category']> = ['기본', '계약', '금액', '보증', '기타'];
  const result: (readonly [string, string, string?, string?])[] = [];
  let first = true;
  for (const cat of categories) {
    const fields = DOCUMENT_FIELDS.filter(f => f.category === cat);
    if (fields.length === 0) continue;
    if (!first) result.push(['', '__sep__']);
    result.push([cat, '__cat__']);
    first = false;
    for (const f of fields) {
      result.push([f.label, 'insert:field', f.id, TYPE_ICONS[f.type]]);
    }
  }
  return result;
}

const TABS: Record<MenuTab, ReadonlyArray<GroupDef>> = {
  file: [
    [['새 문서','file:new'],['열기','file:open'],['저장','file:save'],['다른 이름으로 저장','file:saveas']],
    [['인쇄','file:print'],['환경설정','settings'],['이력','file:history']],
  ],
  edit: [
    [['잘라내기','edit:cut'],['복사','edit:copy'],['붙여넣기','edit:paste'],['서식 없이 붙여넣기','edit:paste-plain']],
    [['찾기·바꾸기','find-replace'],['이미지 편집','edit:image-edit'],['전체 선택','edit:select-all']],
  ],
  insert: [
    [['이미지','image']],
    // TODO: 추후 활성화 예정
    // [['비디오 태그','insert:video'],['외부 동영상','insert:embed']],
    [['하이퍼링크','insert:link'],['책갈피','insert:bookmark']],
    [['서명','insert:signature'],['이모지','insert:emoji']],
    [['툴팁','insert:tooltip'],['툴팁 관리','insert:tooltip-list']],
    [['날짜·시간','insert:datetime'],['가로줄','insert:hr'],['기호','insert:symbol'],['페이지 구분선','insert:pagebreak'],['템플릿','misc:template']],
    [{ dropdown: true, id: 'doc-field', label: '양식 필드', iconKey: 'formField',
       items: buildFieldDropdownItems() }],
  ],
  view: [
    [['디자인','view:design'],['HTML','view:html'],['미리보기','view:preview'],['텍스트','view:text'],['페이지','view:page']],
    [['전체화면','view:fullscreen'],['눈금자','view:ruler'],['그리드','view:grid'],['숨김 테두리','view:hidden-border']],
  ],
  table: [
    [['표 삽입','table'],['표 속성','table:table-props'],['셀 속성','table:cell-props']],
    [['셀 병합','table:merge'],['셀 나누기','table:split-cell']],
    [['위에 행 삽입','table:row-above'],['아래에 행 삽입','table:row-below'],['왼쪽에 열 삽입','table:col-left'],['오른쪽에 열 삽입','table:col-right']],
    [['행 삭제','table:row-delete'],['열 삭제','table:col-delete'],['표 삭제','table:delete']],
    [['표 왼쪽 정렬','table:align-left'],['표 가운데 정렬','table:align-center'],['표 오른쪽 정렬','table:align-right']],
  ],
  format: [
    [['서식 복사','format:painter-copy'],['서식 붙여넣기','format:painter-paste'],['서식 제거','format:clear']],
    [['글머리 기호','format:ul'],['글머리 번호','format:ol']],
    [['위 첨자','format:sup'],['아래 첨자','format:sub']],
  ],
  misc: [
    [['웹 접근성 체크','misc:a11y'],['개인정보 체크','misc:privacy']],
    [['폼 컨트롤','misc:form'],['계산식','misc:calc']],
    [['사용자 모드로 보기','misc:user-mode']],
  ],
  help: [
    [['단축키','help:shortcuts'],['사용자 가이드','help:guide'],['제품 정보','help:about']],
  ],
};

const VIEW_MODE_ACTIONS = new Set<string>(
  ['view:design','view:html','view:preview','view:text','view:page'],
);

const CSS = `
:host {
  display: block;
  --icon-color:         #374151;
  --icon-hover-bg:      #F3F4F6;
  --icon-hover-color:   #111827;
  --icon-active-bg:     #EFF6FF;
  --icon-active-color:  #2563EB;
  --icon-active-border: #BFDBFE;
  --toolbar-bg:         #F9FAFB;
  --toolbar-border:     #E5E7EB;
  --sep-color:          #D1D5DB;
}
.ctx-bar {
  display: flex; align-items: center; flex-wrap: wrap; gap: 2px;
  padding: 3px 8px; min-height: 36px;
  background: var(--toolbar-bg);
  border-bottom: 1px solid var(--toolbar-border);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep {
  width: 1px; height: 20px;
  background: var(--sep-color);
  margin: 0 4px; flex-shrink: 0;
}
.btn {
  position: relative;
  height: 30px; padding: 0 8px;
  border: 1px solid transparent; border-radius: 6px;
  background: transparent; color: var(--icon-color);
  font-size: 12px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 5px;
  white-space: nowrap;
  transition: background 0.12s, color 0.12s;
}
.btn svg { pointer-events: none; flex-shrink: 0; }
.btn:hover:not(:disabled) {
  background: var(--icon-hover-bg);
  color: var(--icon-hover-color);
}
.btn:disabled { opacity: 0.35; cursor: not-allowed; }
.btn.active {
  background: var(--icon-active-bg);
  color: var(--icon-active-color);
  border-color: var(--icon-active-border);
  font-weight: 600;
}

/* 드롭다운 */
.dropdown-wrap { position: relative; }
.dropdown-toggle::after { content: ' ▾'; font-size: 9px; }
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 2px); left: 0;
  min-width: 160px;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,.12);
  z-index: 9999;
  padding: 4px 0;
  max-height: 400px;
  overflow-y: auto;
}
.dropdown-menu.open { display: block; }
.drop-item {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 12px;
  font-size: 12px; color: #374151;
  cursor: pointer; white-space: nowrap;
}
.drop-item:hover { background: #F3F4F6; }
.drop-cat {
  padding: 5px 12px 3px;
  font-size: 10px; font-weight: 700; color: #9CA3AF;
  letter-spacing: .06em; text-transform: uppercase;
  cursor: default; white-space: nowrap;
}
.drop-sep {
  border: none; border-top: 1px solid #F3F4F6; margin: 3px 0;
}
.type-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px;
  color: #6B7280; flex-shrink: 0;
}
#menu-doc-field { width: 220px; }

/* 툴팁 */
.btn::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1F2937;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease 0s;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.btn:hover:not(:disabled)::after {
  opacity: 1;
  transition-delay: 0.6s;
}
`;

/** 사용자 모드에서 비활성화할 action 목록 */
const USER_MODE_DISABLED_ACTIONS = new Set([
  'file:new', 'file:open', 'settings',
]);

export class PoaContextToolbar extends HTMLElement {
  private shadow: ShadowRoot;
  private activeTab: MenuTab = 'edit';
  private activeViewMode: ViewMode = 'design';
  private outsideHandler: ((e: MouseEvent) => void) | null = null;
  private userMode = false;

  private readonly busHandler = ({ tab }: { tab: MenuTab }): void => {
    this.activeTab = tab;
    this.render();
  };

  private readonly viewHandler = ({ mode }: { mode: ViewMode }): void => {
    this.activeViewMode = mode;
    if (this.activeTab === 'view') this.render();
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    eventBus.on<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
    eventBus.on<{ mode: ViewMode }>(BusEvent.VIEW_CHANGE, this.viewHandler);
  }

  disconnectedCallback(): void {
    eventBus.off<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
    eventBus.off<{ mode: ViewMode }>(BusEvent.VIEW_CHANGE, this.viewHandler);
    this.closeAllDropdowns();
  }

  private render(): void {
    this.closeAllDropdowns();
    const groups = TABS[this.activeTab] ?? [];
    const parts: string[] = [];

    for (let gi = 0; gi < groups.length; gi++) {
      if (gi > 0) parts.push('<div class="sep"></div>');
      parts.push('<div class="group">');
      for (const item of groups[gi]) {
        if (item === null) {
          parts.push('<div class="sep" style="margin:0 2px;"></div>');
        } else if ('dropdown' in item && item.dropdown) {
          const menuItems = item.items.map(([label, action, value, typeIcon]) => {
            if (action === '__sep__') return `<hr class="drop-sep">`;
            if (action === '__cat__') return `<div class="drop-cat">${label}</div>`;
            const da = value ? ` data-value="${value}"` : '';
            const icon = typeIcon ? `<span class="type-icon">${typeIcon}</span>` : '';
            return `<div class="drop-item" data-action="${action}"${da}>${icon}${label}</div>`;
          }).join('');
          // 드롭다운 토글 버튼 아이콘 (iconKey가 Icons의 키를 직접 참조)
          const ddIconSvg = item.iconKey ? (Icons as Record<string, string>)[item.iconKey] ?? '' : '';
          const ddBtnContent = ddIconSvg ? `${ddIconSvg}<span>${item.label}</span>` : item.label;
          parts.push(
            `<div class="dropdown-wrap" id="dd-${item.id}">` +
            `<button class="btn dropdown-toggle" data-dropdown-id="${item.id}">${ddBtnContent}</button>` +
            `<div class="dropdown-menu" id="menu-${item.id}">${menuItems}</div>` +
            `</div>`,
          );
        } else {
          const [label, action, value, title] = item as BDef;
          const da = value ? ` data-value="${value}"` : '';
          const isActive = VIEW_MODE_ACTIONS.has(action)
            && action === `view:${this.activeViewMode}`;
          const cls = isActive ? ' active' : '';
          const tip = title ?? label;
          const iconKey = ACTION_ICON[action];
          const iconSvg = iconKey ? Icons[iconKey] : '';
          const content = iconSvg ? `${iconSvg}<span>${label}</span>` : label;
          parts.push(
            `<button class="btn${cls}" data-action="${action}"${da} data-tip="${tip}">${content}</button>`,
          );
        }
      }
      parts.push('</div>');
    }

    this.shadow.innerHTML = `<style>${CSS}</style><div class="ctx-bar">${parts.join('')}</div>`;
    if (this.userMode) this._applyUserModeButtons();

    this.shadow.querySelector('.ctx-bar')!.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;

      // 드롭다운 토글 버튼
      const toggleBtn = target.closest<HTMLButtonElement>('.dropdown-toggle');
      if (toggleBtn) {
        const ddId = toggleBtn.dataset.dropdownId;
        if (!ddId) return;
        e.preventDefault();
        const menu = this.shadow.getElementById(`menu-${ddId}`);
        if (!menu) return;
        const isOpen = menu.classList.contains('open');
        this.closeAllDropdowns();
        if (!isOpen) {
          menu.classList.add('open');
          this.setupOutsideClick(ddId);
        }
        return;
      }

      // 드롭다운 메뉴 항목
      const dropItem = target.closest<HTMLElement>('.drop-item');
      if (dropItem) {
        const action = dropItem.dataset.action;
        const value  = dropItem.dataset.value;
        if (!action) return;
        e.preventDefault();
        this.closeAllDropdowns();
        this.dispatchEvent(new CustomEvent('poa-action', {
          bubbles: true, composed: true,
          detail: { type: action, value },
        }));
        return;
      }

      // 일반 버튼
      const btn = target.closest<HTMLButtonElement>('.btn');
      if (!btn || btn.disabled) return;
      const action = btn.dataset.action;
      if (!action) return;
      e.preventDefault();
      const value = btn.dataset.value;
      this.dispatchEvent(new CustomEvent('poa-action', {
        bubbles: true, composed: true,
        detail: { type: action, value },
      }));
    });
  }

  private closeAllDropdowns(): void {
    this.shadow.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    if (this.outsideHandler) {
      document.removeEventListener('mousedown', this.outsideHandler);
      this.outsideHandler = null;
    }
  }

  private setupOutsideClick(ddId: string): void {
    this.outsideHandler = (e: MouseEvent): void => {
      const wrap = this.shadow.getElementById(`dd-${ddId}`);
      if (!wrap) return;
      if (!e.composedPath().includes(wrap)) {
        this.closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', this.outsideHandler);
  }

  /** 사용자 모드 적용: 비허용 버튼 비활성화 (탭 전환 후에도 유지) */
  applyUserMode(): void {
    this.userMode = true;
    this._applyUserModeButtons();
  }

  private _applyUserModeButtons(): void {
    this.shadow.querySelectorAll<HTMLButtonElement>('.btn[data-action]').forEach(btn => {
      const action = btn.dataset.action ?? '';
      if (USER_MODE_DISABLED_ACTIONS.has(action)) {
        btn.disabled = true;
        btn.title = (btn.title || btn.textContent?.trim() || '') + ' (사용자 모드에서 비활성화)';
      }
    });
  }
}
