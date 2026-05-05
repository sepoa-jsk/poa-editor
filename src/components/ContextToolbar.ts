import { eventBus, BusEvent } from '../utils/eventBus.js';
import type { MenuTab } from '../core/types.js';
import type { ViewMode } from '../modules/view/ViewManager.js';
import { Icons, ACTION_ICON } from '../utils/icons.js';

/** [label, action, value?, title?] */
type BDef = readonly [string, string, string?, string?];
/** null = 구분선 */
type GroupDef = ReadonlyArray<BDef | null>;

const TABS: Record<MenuTab, ReadonlyArray<GroupDef>> = {
  file: [
    [['새 문서','file:new'],['열기','file:open'],['저장','file:save'],['다른 이름으로 저장','file:saveas']],
    [['인쇄','file:print'],['환경설정','settings']],
  ],
  edit: [
    [['잘라내기','edit:cut'],['복사','edit:copy'],['붙여넣기','edit:paste'],['서식 없이 붙여넣기','edit:paste-plain']],
    [['찾기·바꾸기','find-replace'],['이미지 편집','edit:image-edit'],['전체 선택','edit:select-all']],
  ],
  insert: [
    [['이미지','image'],['다중 이미지','insert:multi-image']],
    [['비디오 태그','insert:video'],['외부 동영상','insert:embed']],
    [['하이퍼링크','insert:link'],['책갈피','insert:bookmark']],
    [['서명','insert:signature'],['이모지','insert:emoji']],
    [['툴팁','insert:tooltip'],['툴팁 관리','insert:tooltip-list']],
    [['날짜·시간','insert:datetime'],['가로줄','insert:hr'],['기호','insert:symbol']],
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
  ],
  format: [
    [['서식 복사','format:painter-copy'],['서식 붙여넣기','format:painter-paste'],['서식 제거','format:clear']],
    [['글머리 기호','format:ul'],['글머리 번호','format:ol']],
    [['위 첨자','format:sup'],['아래 첨자','format:sub']],
  ],
  misc: [
    [['웹 접근성 체크','misc:a11y'],['개인정보 체크','misc:privacy']],
    [['폼 컨트롤','misc:form'],['계산식','misc:calc'],['템플릿','misc:template']],
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

export class PoaContextToolbar extends HTMLElement {
  private shadow: ShadowRoot;
  private activeTab: MenuTab = 'edit';
  private activeViewMode: ViewMode = 'design';

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
  }

  private render(): void {
    const groups = TABS[this.activeTab] ?? [];
    const parts: string[] = [];

    for (let gi = 0; gi < groups.length; gi++) {
      if (gi > 0) parts.push('<div class="sep"></div>');
      parts.push('<div class="group">');
      for (const btn of groups[gi]) {
        if (btn === null) {
          parts.push('<div class="sep" style="margin:0 2px;"></div>');
        } else {
          const [label, action, value, title] = btn;
          const da = value ? ` data-value="${value}"` : '';
          const isActive = VIEW_MODE_ACTIONS.has(action)
            && action === `view:${this.activeViewMode}`;
          const cls = isActive ? ' active' : '';
          const tip = title ?? label;

          // 아이콘이 있으면 SVG + 텍스트, 없으면 텍스트만
          const iconKey = ACTION_ICON[action];
          const iconSvg = iconKey ? Icons[iconKey] : '';
          const content = iconSvg
            ? `${iconSvg}<span>${label}</span>`
            : label;

          parts.push(
            `<button class="btn${cls}" data-action="${action}"${da} data-tip="${tip}">${content}</button>`,
          );
        }
      }
      parts.push('</div>');
    }

    this.shadow.innerHTML = `<style>${CSS}</style><div class="ctx-bar">${parts.join('')}</div>`;

    this.shadow.querySelector('.ctx-bar')!.addEventListener('mousedown', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.btn');
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
}
