import { describe, it, expect } from 'vitest';
import { TooltipManager } from '../../src/modules/insert/TooltipManager.js';

function makeContainer(): HTMLDivElement {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

function makeRange(container: HTMLDivElement): Range {
  const ownerDoc = container.ownerDocument;
  const range = ownerDoc.createRange();
  range.selectNodeContents(container.firstChild ?? container);
  return range;
}

describe('TooltipManager — insert', () => {
  it('wraps selected range with .poa-tooltip span', () => {
    const div = makeContainer();
    div.textContent = '안녕하세요';
    const mgr   = new TooltipManager(div);
    const range = makeRange(div);
    mgr.insert('제목', '내용', range);
    const span = div.querySelector('.poa-tooltip');
    expect(span).toBeTruthy();
    expect(span!.textContent).toBe('안녕하세요');
  });

  it('sets data-tooltip-id, data-tooltip-title, data-tooltip-content', () => {
    const div = makeContainer();
    div.textContent = '텍스트';
    const mgr   = new TooltipManager(div);
    const range = makeRange(div);
    mgr.insert('My Title', 'My Content', range);
    const span = div.querySelector<HTMLElement>('.poa-tooltip')!;
    expect(span.dataset.tooltipId).toBeTruthy();
    expect(span.dataset.tooltipTitle).toBe('My Title');
    expect(span.dataset.tooltipContent).toBe('My Content');
  });
});

describe('TooltipManager — getAll', () => {
  it('returns all tooltips in container', () => {
    const div = makeContainer();
    div.innerHTML = '<span class="poa-tooltip" data-tooltip-id="t1" data-tooltip-content="c1">A</span> and <span class="poa-tooltip" data-tooltip-id="t2" data-tooltip-content="c2">B</span>';
    const mgr = new TooltipManager(div);
    const all = mgr.getAll();
    expect(all).toHaveLength(2);
    expect(all[0].id).toBe('t1');
    expect(all[1].anchorText).toBe('B');
  });

  it('returns empty array when no tooltips', () => {
    const div = makeContainer();
    div.textContent = 'plain text';
    const mgr = new TooltipManager(div);
    expect(mgr.getAll()).toHaveLength(0);
  });
});

describe('TooltipManager — update', () => {
  it('updates title and content', () => {
    const div = makeContainer();
    div.innerHTML = '<span class="poa-tooltip" data-tooltip-id="u1" data-tooltip-title="Old" data-tooltip-content="Old content">text</span>';
    const mgr = new TooltipManager(div);
    mgr.update('u1', 'New Title', 'New Content');
    const el = div.querySelector<HTMLElement>('[data-tooltip-id="u1"]')!;
    expect(el.dataset.tooltipTitle).toBe('New Title');
    expect(el.dataset.tooltipContent).toBe('New Content');
  });

  it('returns false for unknown id', () => {
    const div = makeContainer();
    const mgr = new TooltipManager(div);
    expect(mgr.update('nonexistent', 'T', 'C')).toBe(false);
  });
});

describe('TooltipManager — remove', () => {
  it('removes span and preserves text content', () => {
    const div = makeContainer();
    div.innerHTML = 'Hello <span class="poa-tooltip" data-tooltip-id="r1" data-tooltip-content="tip">world</span>!';
    const mgr = new TooltipManager(div);
    mgr.remove('r1');
    expect(div.querySelector('.poa-tooltip')).toBeNull();
    expect(div.textContent).toBe('Hello world!');
  });

  it('returns false for unknown id', () => {
    const div = makeContainer();
    const mgr = new TooltipManager(div);
    expect(mgr.remove('nope')).toBe(false);
  });
});

describe('TooltipManager — removeAll', () => {
  it('removes all tooltips and preserves text', () => {
    const div = makeContainer();
    div.innerHTML = '<span class="poa-tooltip" data-tooltip-id="a1" data-tooltip-content="c">A</span> and <span class="poa-tooltip" data-tooltip-id="a2" data-tooltip-content="c">B</span>';
    const mgr = new TooltipManager(div);
    mgr.removeAll();
    expect(div.querySelectorAll('.poa-tooltip')).toHaveLength(0);
    expect(div.textContent).toContain('A');
    expect(div.textContent).toContain('B');
  });
});

describe('TooltipManager — injectStyles', () => {
  it('injects a style tag with id poa-tooltip-styles', () => {
    document.getElementById('poa-tooltip-styles')?.remove();
    TooltipManager.injectStyles();
    expect(document.getElementById('poa-tooltip-styles')).not.toBeNull();
  });

  it('does not inject duplicate style tags', () => {
    TooltipManager.injectStyles();
    TooltipManager.injectStyles();
    expect(document.querySelectorAll('#poa-tooltip-styles')).toHaveLength(1);
  });
});
