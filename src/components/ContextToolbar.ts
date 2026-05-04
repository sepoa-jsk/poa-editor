import { eventBus, BusEvent } from '../utils/eventBus.js';
import type { MenuTab } from '../core/types.js';

/** [label, action, value?, title?] — value 없으면 undefined */
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
    [['하이퍼링크','insert:link'],['책갈피','insert:bookmark']],
    [['날짜·시간','insert:datetime'],['가로줄','insert:hr'],['기호','insert:symbol']],
  ],
  view: [
    [['디자인','view:design'],['HTML','view:html'],['미리보기','view:preview'],['텍스트','view:text'],['페이지','view:page']],
    [['전체화면','view:fullscreen'],['눈금자','view:ruler'],['그리드','view:grid']],
  ],
  table: [
    [['표 삽입','table'],['표 속성','table:table-props'],['셀 속성','table:cell-props']],
    [['셀 병합','table:merge'],['수평 분할','table:split-h'],['수직 분할','table:split-v']],
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
    [['폼 컨트롤','misc:form'],['계산식','misc:calc']],
  ],
  help: [
    [['단축키','help:shortcuts'],['사용자 가이드','help:guide'],['제품 정보','help:about']],
  ],
};

const CSS = `
:host { display: block; }
.ctx-bar {
  display: flex; align-items: center; flex-wrap: wrap; gap: 2px;
  padding: 3px 8px; min-height: 36px;
  background: var(--poa-ctx-bg, #fafafa);
  border-bottom: 1px solid var(--poa-toolbar-border, #ddd);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep { width: 1px; height: 20px; background: #ddd; margin: 0 4px; flex-shrink: 0; }
.btn {
  height: 26px; padding: 0 8px;
  border: 1px solid transparent; border-radius: 3px;
  background: transparent; color: #333;
  font-size: 12px; cursor: pointer; white-space: nowrap;
}
.btn:hover:not(:disabled) { background: #e6e6e6; border-color: #ccc; }
.btn:disabled { opacity: 0.38; cursor: default; }
`;

export class PoaContextToolbar extends HTMLElement {
  private shadow: ShadowRoot;
  private activeTab: MenuTab = 'edit';
  private readonly busHandler = ({ tab }: { tab: MenuTab }): void => {
    this.activeTab = tab;
    this.render();
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    eventBus.on<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
  }

  disconnectedCallback(): void {
    eventBus.off<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, this.busHandler);
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
          parts.push(`<button class="btn" data-action="${action}"${da} title="${title ?? label}">${label}</button>`);
        }
      }
      parts.push('</div>');
    }

    this.shadow.innerHTML = `<style>${CSS}</style><div class="ctx-bar">${parts.join('')}</div>`;

    this.shadow.querySelector('.ctx-bar')!.addEventListener('mousedown', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('.btn');
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
