import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ViewManager } from '../../src/modules/view/ViewManager.js';
import { PageView } from '../../src/modules/view/PageView.js';
import type { BookmarkEntry } from '../../src/modules/insert/BookmarkManager.js';

// ── 헬퍼 ──────────────────────────────────────────────────────────────────

function makeSetup(): { host: HTMLDivElement; contentEl: HTMLDivElement } {
  const host      = document.createElement('div');
  const contentEl = document.createElement('div');
  contentEl.className = 'poa-editor-content';
  contentEl.setAttribute('slot', 'content');
  contentEl.innerHTML = '<p>Hello <strong>World</strong></p>';
  host.appendChild(contentEl);
  document.body.appendChild(host);
  return { host, contentEl };
}

// ── ViewManager ────────────────────────────────────────────────────────────

describe('ViewManager', () => {
  let host: HTMLDivElement;
  let contentEl: HTMLDivElement;
  let vm: ViewManager;

  beforeEach(() => {
    ({ host, contentEl } = makeSetup());
    vm = new ViewManager(contentEl);
    vm.attach();
  });

  afterEach(() => {
    vm.detach();
    host.remove();
  });

  it('초기 모드는 design이다', () => {
    expect(vm.getMode()).toBe('design');
  });

  it('attach() 후 contentEl이 wrapper 안으로 이동된다', () => {
    const wrapper = host.querySelector('.poa-view-wrapper');
    expect(wrapper).toBeTruthy();
    expect(wrapper!.contains(contentEl)).toBe(true);
  });

  it('switchTo("preview")로 전환하면 모드가 바뀐다', async () => {
    await vm.switchTo('preview');
    expect(vm.getMode()).toBe('preview');
  });

  it('switchTo("preview")하면 contentEl이 숨겨진다', async () => {
    await vm.switchTo('preview');
    expect(contentEl.style.display).toBe('none');
  });

  it('switchTo("text")하면 contentEl이 숨겨진다', async () => {
    await vm.switchTo('text');
    expect(contentEl.style.display).toBe('none');
  });

  it('switchTo("design")으로 돌아오면 contentEl이 다시 보인다', async () => {
    await vm.switchTo('preview');
    await vm.switchTo('design');
    expect(vm.getMode()).toBe('design');
    expect(contentEl.style.display).not.toBe('none');
  });

  it('같은 모드로 switchTo() 해도 상태 변화 없다', async () => {
    const onViewChange = vi.fn();
    vm.detach();
    vm = new ViewManager(contentEl, { onViewChange });
    vm.attach();

    await vm.switchTo('design'); // 이미 design
    expect(onViewChange).not.toHaveBeenCalled();
  });

  it('onViewChange 콜백이 새 모드와 함께 호출된다', async () => {
    const onViewChange = vi.fn();
    vm.detach();
    vm = new ViewManager(contentEl, { onViewChange });
    vm.attach();

    await vm.switchTo('text');
    expect(onViewChange).toHaveBeenCalledWith('text');
  });

  it('toggleRuler()는 true/false를 번갈아 반환한다', () => {
    expect(vm.isRulerVisible()).toBe(false);
    expect(vm.toggleRuler()).toBe(true);
    expect(vm.isRulerVisible()).toBe(true);
    expect(vm.toggleRuler()).toBe(false);
    expect(vm.isRulerVisible()).toBe(false);
  });

  it('toggleRuler() 후 눈금자 DOM 요소가 생성된다', () => {
    vm.toggleRuler();
    expect(host.querySelector('.poa-ruler-h')).toBeTruthy();
    expect(host.querySelector('.poa-ruler-v')).toBeTruthy();
  });

  it('toggleGrid()는 true/false를 번갈아 반환한다', () => {
    expect(vm.toggleGrid()).toBe(true);
    expect(vm.isGridVisible()).toBe(true);
    expect(vm.toggleGrid()).toBe(false);
    expect(vm.isGridVisible()).toBe(false);
  });

  it('toggleGrid() 후 그리드 오버레이 DOM이 생성된다', () => {
    vm.toggleGrid();
    expect(host.querySelector('.poa-grid-overlay')).toBeTruthy();
  });

  it('toggleHiddenBorder()는 contentEl에 클래스를 토글한다', () => {
    expect(vm.toggleHiddenBorder()).toBe(true);
    expect(contentEl.classList.contains('poa-show-hidden-borders')).toBe(true);
    expect(vm.toggleHiddenBorder()).toBe(false);
    expect(contentEl.classList.contains('poa-show-hidden-borders')).toBe(false);
  });

  it('HTML 뷰 → design으로 전환 시 textarea 내용이 contentEl에 반영된다', async () => {
    contentEl.innerHTML = '<p>Original</p>';
    await vm.switchTo('html');

    // jsdom에서 CodeMirror 로드 실패 → textarea fallback 사용됨
    const ta = document.querySelector<HTMLTextAreaElement>('#poa-html-fallback-ta');
    if (ta) {
      ta.value = '<p>Modified</p>';
      await vm.switchTo('design');
      expect(contentEl.innerHTML).toBe('<p>Modified</p>');
    } else {
      // CodeMirror가 실제로 로드된 경우 — 스킵
      await vm.switchTo('design');
      expect(vm.getMode()).toBe('design');
    }
  });

  it('detach() 후 contentEl이 원래 부모로 복원된다', () => {
    vm.detach();
    expect(contentEl.parentElement).toBe(host);
    // wrapper가 제거됐는지 확인
    expect(host.querySelector('.poa-view-wrapper')).toBeNull();
  });

  it('미리보기 전환 시 input의 입력값이 보존된다', async () => {
    contentEl.innerHTML = '<input type="text" class="poa-field-input">';
    const input = contentEl.querySelector<HTMLInputElement>('input')!;
    input.value = '홍길동';

    await vm.switchTo('preview');

    const previewPanel = host.querySelector('.poa-preview-panel');
    expect(previewPanel?.innerHTML).toContain('홍길동');
  });

  it('미리보기 전환 시 textarea의 입력값이 보존된다', async () => {
    contentEl.innerHTML = '<textarea class="poa-field-input"></textarea>';
    const textarea = contentEl.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.value = '여러 줄 입력';

    await vm.switchTo('preview');

    const previewPanel = host.querySelector('.poa-preview-panel');
    expect(previewPanel?.innerHTML).toContain('여러 줄 입력');
  });
});

// ── PageView ───────────────────────────────────────────────────────────────

describe('PageView', () => {
  let container: HTMLDivElement;
  let pv: PageView;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    pv = new PageView();
  });

  afterEach(() => {
    pv.unmount();
    container.remove();
  });

  it('mount() 후 .poa-a4-page가 렌더링된다', () => {
    pv.mount(container, '<p>Hello</p>');
    expect(container.querySelector('.poa-a4-page')).toBeTruthy();
  });

  it('책갈피가 있으면 사이드바가 렌더링된다', () => {
    const bookmarks: BookmarkEntry[] = [
      {
        id: 'bm-001',
        label: '1장',
        element: document.createElement('a') as HTMLAnchorElement,
      },
    ];
    pv.mount(container, '<p>Content</p>', bookmarks);
    expect(container.querySelector('.poa-page-sidebar')).toBeTruthy();
  });

  it('책갈피가 없으면 사이드바가 렌더링되지 않는다', () => {
    pv.mount(container, '<p>Content</p>', []);
    expect(container.querySelector('.poa-page-sidebar')).toBeNull();
  });

  it('페이지 분할선으로 페이지가 여러 개가 된다', () => {
    const html = '<p>Page 1</p><hr class="poa-page-break"><p>Page 2</p>';
    pv.mount(container, html);
    expect(container.querySelectorAll('.poa-a4-page').length).toBe(2);
  });

  it('getPageCount()가 페이지 수를 반환한다', () => {
    const html = '<p>P1</p><hr class="poa-page-break"><p>P2</p><hr class="poa-page-break"><p>P3</p>';
    expect(pv.getPageCount(html)).toBe(3);
  });

  it('unmount() 후 container가 비워진다', () => {
    pv.mount(container, '<p>Content</p>');
    pv.unmount();
    expect(container.innerHTML).toBe('');
  });
});
