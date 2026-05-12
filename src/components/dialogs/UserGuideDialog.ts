import {
  Type, Bold, Clipboard, Search, Table, ChevronRight,
  TableCellsMerge, Rows3, Image, Maximize2, ImagePlus, FormInput, List, User,
} from 'lucide-static';
import { pxN } from '../../utils/icons.js';

type GuideTab = '기본편집' | '표' | '이미지' | '양식필드';

interface Section {
  icon: string;
  title: string;
  body: string[];
  tip?: string;
}

const G = {
  type:      pxN(Type, 16),
  bold:      pxN(Bold, 16),
  clipboard: pxN(Clipboard, 16),
  search:    pxN(Search, 16),
  table:     pxN(Table, 16),
  chevron:   pxN(ChevronRight, 16),
  merge:     pxN(TableCellsMerge, 16),
  rows:      pxN(Rows3, 16),
  image:     pxN(Image, 16),
  maximize:  pxN(Maximize2, 16),
  imagePlus: pxN(ImagePlus, 16),
  formInput: pxN(FormInput, 16),
  list:      pxN(List, 16),
  user:      pxN(User, 16),
};

const GUIDE_DATA: Record<GuideTab, Section[]> = {
  '기본편집': [
    {
      icon: G.type, title: '텍스트 입력',
      body: [
        '에디터 영역을 클릭하면 텍스트를 입력할 수 있습니다.',
        '폰트, 크기, 색상 등 서식은 툴바에서 변경하세요.',
      ],
    },
    {
      icon: G.bold, title: '서식 적용',
      body: ['텍스트를 선택한 후 툴바 버튼을 클릭하거나 단축키(Ctrl+B, Ctrl+I 등)를 사용하세요.'],
    },
    {
      icon: G.clipboard, title: '복사·붙여넣기',
      body: ['외부에서 복사한 내용을 붙여넣을 때 Ctrl+Shift+V 를 사용하면 서식 없이 붙여넣기됩니다.'],
      tip: 'Ctrl+Shift+V 로 서식 없이 붙여넣기',
    },
    {
      icon: G.search, title: '찾기·바꾸기',
      body: ['Ctrl+F 로 찾기, Ctrl+H 로 찾기·바꾸기를 열 수 있습니다.'],
    },
  ],
  '표': [
    {
      icon: G.table, title: '표 삽입',
      body: ['삽입 탭 → 표 삽입 버튼을 클릭하면 그리드에서 행/열 수를 선택하여 삽입합니다.'],
    },
    {
      icon: G.chevron, title: '셀 이동',
      body: [
        'Tab 키로 다음 셀, Shift+Tab 으로 이전 셀로 이동합니다.',
        '마지막 셀에서 Tab 을 누르면 새 행이 자동 추가됩니다.',
      ],
    },
    {
      icon: G.merge, title: '셀 병합·분할',
      body: ['표 탭에서 셀 병합/셀 나누기 버튼을 사용하세요.'],
    },
    {
      icon: G.rows, title: '행·열 관리',
      body: ['표 탭에서 행/열 삽입·삭제가 가능합니다.'],
    },
  ],
  '이미지': [
    {
      icon: G.image, title: '이미지 삽입',
      body: ['삽입 탭 → 이미지 버튼으로 파일을 업로드하거나 URL로 이미지를 삽입할 수 있습니다.'],
    },
    {
      icon: G.maximize, title: '크기 조절',
      body: [
        '삽입된 이미지를 클릭하면 크기 조절 핸들이 표시됩니다.',
        '드래그로 크기를 변경하세요.',
      ],
    },
    {
      icon: G.imagePlus, title: '이미지 편집',
      body: ['편집 탭 → 이미지 편집에서 자르기, 회전, 반전이 가능합니다.'],
    },
  ],
  '양식필드': [
    {
      icon: G.formInput, title: '필드 삽입',
      body: ['삽입 탭 → 양식 필드를 클릭하면 텍스트, 숫자, 날짜 등 다양한 필드를 삽입할 수 있습니다.'],
    },
    {
      icon: G.list, title: '필드 유형',
      body: [
        '텍스트: 일반 문자 입력',
        '숫자: 숫자 입력 (천 단위 구분, 원화 등 포맷 지원)',
        '날짜: 날짜 선택 (다양한 포맷 지원)',
        '계약 정보: 계약명, 계약일, 금액 등 전문 필드',
      ],
    },
    {
      icon: G.user, title: '사용자 모드',
      body: ['기타 탭 → 사용자 모드로 보기를 클릭하면 양식 필드만 입력 가능한 사용자 전용 화면으로 전환됩니다.'],
    },
  ],
};

const GUIDE_TABS: GuideTab[] = ['기본편집', '표', '이미지', '양식필드'];

const CSS = `
:host { display: none; }
:host([open]) { display: block; }

.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
}

.dialog {
  background: #fff; border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 620px; max-width: 95vw; height: 540px; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
  animation: dlgIn .15s ease;
}

@keyframes dlgIn {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
  font-size: 15px; font-weight: 600; color: #111827;
}

.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #9CA3AF; line-height: 1; padding: 0 4px;
  border-radius: 4px; font-family: inherit;
}
.close-btn:hover { color: #374151; background: #F3F4F6; }

.tabs {
  display: flex; align-items: stretch; height: 36px;
  border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
  padding: 0 8px;
}

.tab-btn {
  font-size: 13px; color: #6B7280; padding: 0 16px;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  font-family: inherit; white-space: nowrap;
  transition: color .1s;
}
.tab-btn:hover { color: #374151; }
.tab-btn.active { color: #2563EB; border-bottom-color: #2563EB; font-weight: 600; }

.content { flex: 1; overflow-y: auto; padding: 20px 24px; }

h3 { margin: 0; padding: 0; font-weight: inherit; }

.section.has-divider {
  border-bottom: 1px solid #F3F4F6;
  padding-bottom: 16px; margin-bottom: 16px;
}

.sec-title {
  font-size: 15px; font-weight: 600; color: #111827;
  margin: 20px 0 8px;
  display: flex; align-items: center; gap: 8px;
}
.section:first-child .sec-title { margin-top: 0; }

.sec-icon { display: flex; align-items: center; color: #2563EB; }

.body-text {
  font-size: 13px; color: #4B5563; line-height: 1.8;
  margin: 0 0 4px;
}

.tip {
  background: #EFF6FF;
  border-left: 3px solid #2563EB;
  border-radius: 0 6px 6px 0;
  padding: 8px 12px;
  font-size: 12px; color: #1D4ED8;
  margin-top: 6px;
}
`;

export class PoaUserGuideDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private activeTab: GuideTab = '기본편집';

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog">
    <div class="header">
      <span>사용자 가이드</span>
      <button class="close-btn" id="btn-close">✕</button>
    </div>
    <div class="tabs" id="tabs"></div>
    <div class="content" id="content"></div>
  </div>
</div>`;

    this.shadow.getElementById('btn-close')?.addEventListener('click', () => this._close());
    this.shadow.getElementById('backdrop')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'backdrop') this._close();
    });
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._close();
    });
    this.shadow.getElementById('tabs')?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-tab]');
      if (!btn) return;
      this.activeTab = btn.dataset.tab as GuideTab;
      this._renderTabs();
      this._renderContent();
    });
  }

  open(): void {
    this.activeTab = '기본편집';
    this.setAttribute('open', '');
    this._renderTabs();
    this._renderContent();
    requestAnimationFrame(() => this.shadow.getElementById('btn-close')?.focus());
  }

  private _renderTabs(): void {
    this.shadow.getElementById('tabs')!.innerHTML = GUIDE_TABS
      .map(t => `<button class="tab-btn${t === this.activeTab ? ' active' : ''}" data-tab="${t}">${t}</button>`)
      .join('');
  }

  private _renderContent(): void {
    const sections = GUIDE_DATA[this.activeTab];
    const last = sections.length - 1;
    this.shadow.getElementById('content')!.innerHTML = sections
      .map((sec, i) => {
        const body = sec.body.map(p => `<p class="body-text">${p}</p>`).join('');
        const tip  = sec.tip ? `<div class="tip">${sec.tip}</div>` : '';
        return `
<div class="section${i < last ? ' has-divider' : ''}">
  <h3 class="sec-title">
    <span class="sec-icon">${sec.icon}</span>${sec.title}
  </h3>
  ${body}${tip}
</div>`;
      })
      .join('');
  }

  private _close(): void {
    this.removeAttribute('open');
  }
}
