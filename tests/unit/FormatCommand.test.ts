import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormatCommand } from '../../src/core/commands/FormatCommand';
import { EditorCore } from '../../src/core/EditorCore';

// ───────────────────────────── 헬퍼 ──────────────────────────────

/**
 * container의 첫 번째 텍스트 노드에서 [start, end) 구간을 선택한 Range를 반환.
 * Selection은 설정하지 않음 — FormatCommand 내부에서 ownerDocument.getSelection() 처리.
 */
function makeRange(container: HTMLElement, start: number, end: number): Range {
  const textNode = container.firstChild as Text;
  const range = document.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, end);
  return range;
}

// ──────────────────────── FormatCommand 테스트 ───────────────────

describe('FormatCommand', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.contentEditable = 'true';
    container.textContent = 'Hello World';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('텍스트에 볼드(<strong>) 서식을 적용한다', () => {
    const range = makeRange(container, 0, 5); // "Hello"
    const cmd = new FormatCommand('strong', range, document);
    cmd.execute();

    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe('Hello');
    // 나머지 텍스트는 그대로
    expect(container.textContent).toBe('Hello World');
  });

  it('이탤릭(<em>) 서식을 적용한다', () => {
    const range = makeRange(container, 0, 5);
    const cmd = new FormatCommand('em', range, document);
    cmd.execute();

    expect(container.querySelector('em')).not.toBeNull();
    expect(container.querySelector('em')!.textContent).toBe('Hello');
  });

  it('밑줄(<u>) 서식을 적용한다', () => {
    const range = makeRange(container, 0, 5);
    const cmd = new FormatCommand('u', range, document);
    cmd.execute();

    expect(container.querySelector('u')).not.toBeNull();
  });

  it('취소선(<s>) 서식을 적용한다', () => {
    const range = makeRange(container, 0, 5);
    const cmd = new FormatCommand('s', range, document);
    cmd.execute();

    expect(container.querySelector('s')).not.toBeNull();
  });

  it('이미 볼드인 텍스트에 다시 볼드를 적용하면 서식을 제거한다 (토글)', () => {
    // 1차: bold 적용
    const range1 = makeRange(container, 0, 5);
    new FormatCommand('strong', range1, document).execute();
    expect(container.querySelector('strong')).not.toBeNull();

    // 2차: strong 내부 전체를 다시 선택하여 bold 적용 → 제거
    const strong = container.querySelector('strong')!;
    const range2 = document.createRange();
    range2.selectNodeContents(strong);
    new FormatCommand('strong', range2, document).execute();

    expect(container.querySelector('strong')).toBeNull();
    expect(container.textContent).toBe('Hello World');
  });

  it('볼드 적용 후 undo()하면 <strong>이 제거되고 원본 텍스트가 복원된다', () => {
    const range = makeRange(container, 0, 5);
    const cmd = new FormatCommand('strong', range, document);

    cmd.execute();
    expect(container.querySelector('strong')).not.toBeNull();

    cmd.undo();
    expect(container.querySelector('strong')).toBeNull();
    expect(container.textContent).toBe('Hello World');
  });

  it('볼드 제거 후 undo()하면 <strong>이 복원된다', () => {
    // 1차: bold 적용
    const range1 = makeRange(container, 0, 5);
    new FormatCommand('strong', range1, document).execute();

    // 2차: bold 제거
    const strong = container.querySelector('strong')!;
    const range2 = document.createRange();
    range2.selectNodeContents(strong);
    const removeCmd = new FormatCommand('strong', range2, document);
    removeCmd.execute();
    expect(container.querySelector('strong')).toBeNull();

    // undo → bold 복원
    removeCmd.undo();
    expect(container.querySelector('strong')).not.toBeNull();
    expect(container.querySelector('strong')!.textContent).toBe('Hello');
  });
});

// ──────────────────────── EditorCore 테스트 ──────────────────────

describe('EditorCore', () => {
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('mount() 후 contentEditable이 true로 설정된다', () => {
    const core = new EditorCore();
    core.mount(div);
    expect(div.contentEditable).toBe('true');
    expect(div.getAttribute('role')).toBe('textbox');
    expect(core.isMounted()).toBe(true);
  });

  it('readonly 옵션으로 mount() 시 contentEditable이 false로 설정된다', () => {
    const core = new EditorCore({ readonly: true });
    core.mount(div);
    expect(div.contentEditable).toBe('false');
  });

  it('unmount() 후 contentEditable과 role 속성이 제거된다', () => {
    const core = new EditorCore();
    core.mount(div);
    core.unmount();
    expect(div.contentEditable).toBe('inherit');
    expect(div.getAttribute('role')).toBeNull();
    expect(core.isMounted()).toBe(false);
  });

  it('placeholder 옵션이 data-placeholder 속성으로 설정된다', () => {
    const core = new EditorCore({ placeholder: '내용을 입력하세요' });
    core.mount(div);
    expect(div.dataset.placeholder).toBe('내용을 입력하세요');
  });
});
