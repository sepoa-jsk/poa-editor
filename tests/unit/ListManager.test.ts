import { describe, it, expect } from 'vitest';
// @ts-ignore — jsdom types not installed
import { JSDOM } from 'jsdom';
import { ListManager } from '../../src/modules/format/ListManager.js';

function setup() {
  const dom = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' });
  const document = dom.window.document;
  const contentEl = document.createElement('div');
  contentEl.setAttribute('contenteditable', 'true');
  document.body.appendChild(contentEl);

  const manager = new ListManager(contentEl);

  function selectAll(): Range {
    const range = document.createRange();
    range.selectNodeContents(contentEl);
    const sel = dom.window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    return range;
  }

  function selectNode(node: Node): Range {
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = dom.window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    return range;
  }

  function collapseInto(node: Node, offset = 0): Range {
    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);
    const sel = dom.window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
    return range;
  }

  return { document, contentEl, manager, selectAll, selectNode, collapseInto };
}

describe('ListManager', () => {
  describe('toggleList("ul")', () => {
    it('단락을 ul/li로 변환한다', () => {
      const { document, contentEl, manager, selectNode } = setup();
      const p = document.createElement('p');
      p.textContent = 'hello';
      contentEl.appendChild(p);
      selectNode(p);

      manager.toggleList('ul');

      expect(contentEl.querySelector('ul')).toBeTruthy();
      expect(contentEl.querySelector('ul li')).toBeTruthy();
      expect(contentEl.querySelector('ul li')?.textContent).toBe('hello');
      expect(contentEl.querySelector('p')).toBeNull();
    });

    it('여러 단락을 하나의 ul로 묶는다', () => {
      const { document, contentEl, manager, selectAll } = setup();
      const p1 = document.createElement('p');
      p1.textContent = 'item 1';
      const p2 = document.createElement('p');
      p2.textContent = 'item 2';
      contentEl.append(p1, p2);
      selectAll();

      manager.toggleList('ul');

      const ul = contentEl.querySelector('ul');
      expect(ul).toBeTruthy();
      expect(ul?.querySelectorAll('li').length).toBe(2);
    });

    it('이미 ul인 경우 목록을 해제하여 p로 변환한다', () => {
      const { contentEl, manager, selectAll } = setup();
      contentEl.innerHTML = '<ul><li>item</li></ul>';
      selectAll();

      manager.toggleList('ul');

      expect(contentEl.querySelector('ul')).toBeNull();
      expect(contentEl.querySelector('p')).toBeTruthy();
      expect(contentEl.textContent).toContain('item');
    });

    it('ol을 선택했을 때 ul로 전환한다', () => {
      const { contentEl, manager, selectAll } = setup();
      contentEl.innerHTML = '<ol><li>item</li></ol>';
      selectAll();

      manager.toggleList('ul');

      expect(contentEl.querySelector('ul')).toBeTruthy();
      expect(contentEl.querySelector('ol')).toBeNull();
    });
  });

  describe('toggleList("ol")', () => {
    it('단락을 ol/li로 변환한다', () => {
      const { document, contentEl, manager, selectNode } = setup();
      const p = document.createElement('p');
      p.textContent = 'step one';
      contentEl.appendChild(p);
      selectNode(p);

      manager.toggleList('ol');

      expect(contentEl.querySelector('ol')).toBeTruthy();
      expect(contentEl.querySelector('ol li')?.textContent).toBe('step one');
    });

    it('이미 ol인 경우 목록을 해제한다', () => {
      const { contentEl, manager, selectAll } = setup();
      contentEl.innerHTML = '<ol><li>step</li></ol>';
      selectAll();

      manager.toggleList('ol');

      expect(contentEl.querySelector('ol')).toBeNull();
      expect(contentEl.textContent).toContain('step');
    });
  });

  describe('toggleSuperSub("sup")', () => {
    it('선택 텍스트를 sup으로 감싼다', () => {
      const { document, contentEl, manager, selectNode } = setup();
      const p = document.createElement('p');
      p.textContent = 'x2';
      contentEl.appendChild(p);
      selectNode(p);

      manager.toggleSuperSub('sup');

      expect(contentEl.querySelector('sup')).toBeTruthy();
    });

    it('이미 sup이면 sup을 제거한다', () => {
      const { document, contentEl, manager } = setup();
      contentEl.innerHTML = '<p><sup>x2</sup></p>';
      const sup = contentEl.querySelector('sup')!;

      const range = document.createRange();
      range.selectNodeContents(sup);
      document.defaultView!.getSelection()!.removeAllRanges();
      document.defaultView!.getSelection()!.addRange(range);

      manager.toggleSuperSub('sup');

      expect(contentEl.querySelector('sup')).toBeNull();
      expect(contentEl.textContent).toContain('x2');
    });

    it('collapsed 선택에서는 아무 동작도 하지 않는다', () => {
      const { document, contentEl, manager, collapseInto } = setup();
      const p = document.createElement('p');
      p.textContent = 'test';
      contentEl.appendChild(p);
      collapseInto(p.firstChild!, 2);

      const before = contentEl.innerHTML;
      manager.toggleSuperSub('sup');
      expect(contentEl.innerHTML).toBe(before);
    });

    it('sup을 적용할 때 기존 sub 태그를 제거한다', () => {
      const { document, contentEl, manager } = setup();
      contentEl.innerHTML = '<p><sub>text</sub></p>';
      const sub = contentEl.querySelector('sub')!;

      const range = document.createRange();
      range.selectNodeContents(sub);
      document.defaultView!.getSelection()!.removeAllRanges();
      document.defaultView!.getSelection()!.addRange(range);

      manager.toggleSuperSub('sup');

      expect(contentEl.querySelector('sub')).toBeNull();
      expect(contentEl.querySelector('sup')).toBeTruthy();
    });
  });

  describe('toggleSuperSub("sub")', () => {
    it('선택 텍스트를 sub으로 감싼다', () => {
      const { document, contentEl, manager, selectNode } = setup();
      const p = document.createElement('p');
      p.textContent = 'H2O';
      contentEl.appendChild(p);
      selectNode(p);

      manager.toggleSuperSub('sub');

      expect(contentEl.querySelector('sub')).toBeTruthy();
    });

    it('이미 sub이면 sub을 제거한다', () => {
      const { document, contentEl, manager } = setup();
      contentEl.innerHTML = '<p><sub>2</sub></p>';
      const sub = contentEl.querySelector('sub')!;

      const range = document.createRange();
      range.selectNodeContents(sub);
      document.defaultView!.getSelection()!.removeAllRanges();
      document.defaultView!.getSelection()!.addRange(range);

      manager.toggleSuperSub('sub');

      expect(contentEl.querySelector('sub')).toBeNull();
    });
  });

  describe('handleTab()', () => {
    it('커서가 li 안에 없으면 false를 반환하고 아무 동작도 하지 않는다', () => {
      const { document, contentEl, manager, collapseInto } = setup();
      const p = document.createElement('p');
      p.textContent = 'plain text';
      contentEl.appendChild(p);
      collapseInto(p.firstChild!, 0);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      const result = manager.handleTab(tabEvent);
      expect(result).toBe(false);
    });

    it('li 안에서 Tab → 하위 목록으로 들여쓰기한다', () => {
      const { contentEl, manager, collapseInto } = setup();
      contentEl.innerHTML = '<ul><li>item1</li><li id="tgt">item2</li></ul>';
      const li2 = contentEl.querySelector('#tgt') as HTMLLIElement;
      collapseInto(li2.firstChild!, 0);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      const result = manager.handleTab(tabEvent);

      expect(result).toBe(true);
      // item2가 item1 아래 중첩 목록으로 이동해야 한다
      const li1 = contentEl.querySelector('ul > li')!;
      expect(li1.querySelector('ul') !== null || li1.querySelector('li') !== null).toBe(true);
    });

    it('li 안에서 Shift+Tab → 상위 목록으로 내어쓰기한다', () => {
      const { contentEl, manager, collapseInto } = setup();
      contentEl.innerHTML = '<ul><li>item1<ul><li id="nested">nested</li></ul></li></ul>';
      const nestedLi = contentEl.querySelector('#nested') as HTMLLIElement;
      collapseInto(nestedLi.firstChild!, 0);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
      const result = manager.handleTab(tabEvent);

      expect(result).toBe(true);
      // nested가 최상위 ul의 직접 li가 되어야 한다
      const topLevelLis = contentEl.querySelectorAll('ul > li');
      expect(topLevelLis.length).toBeGreaterThanOrEqual(2);
    });
  });
});
