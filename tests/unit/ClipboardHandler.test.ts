import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ClipboardHandler } from '../../src/modules/edit/ClipboardHandler';

function makePasteEvent(html?: string, text?: string): ClipboardEvent {
  const e = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
  const clipboardData = {
    getData: (type: string): string => {
      if (type === 'text/html')  return html  ?? '';
      if (type === 'text/plain') return text  ?? '';
      return '';
    },
  };
  Object.defineProperty(e, 'clipboardData', { value: clipboardData });
  return e;
}

describe('ClipboardHandler', () => {
  let root: HTMLDivElement;
  let handler: ClipboardHandler;

  beforeEach(() => {
    root = document.createElement('div');
    root.contentEditable = 'true';
    document.body.appendChild(root);
  });

  afterEach(() => {
    handler?.unregister();
    root.remove();
  });

  it('register / unregister 없이는 paste 이벤트를 처리하지 않음', () => {
    const cb = vi.fn();
    handler = new ClipboardHandler(root, { onPaste: cb });
    root.dispatchEvent(makePasteEvent('<p>hi</p>'));
    expect(cb).not.toHaveBeenCalled();
  });

  it('register 후 onPaste 콜백이 호출됨', () => {
    const cb = vi.fn();
    handler = new ClipboardHandler(root, { onPaste: cb });
    handler.register();
    root.dispatchEvent(makePasteEvent('<p>hello</p>'));
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('unregister 후 onPaste가 다시 호출되지 않음', () => {
    const cb = vi.fn();
    handler = new ClipboardHandler(root, { onPaste: cb });
    handler.register();
    handler.unregister();
    root.dispatchEvent(makePasteEvent('<p>test</p>'));
    expect(cb).not.toHaveBeenCalled();
  });

  it('XSS 스크립트 태그가 sanitize로 제거됨', () => {
    let pasted = '';
    handler = new ClipboardHandler(root, { onPaste: (h) => { pasted = h; } });
    handler.register();
    root.dispatchEvent(makePasteEvent('<p>safe</p><script>alert(1)</script>'));
    expect(pasted).not.toContain('<script>');
    expect(pasted).toContain('safe');
  });

  it('text/plain 입력이 <p> 단락으로 변환됨', () => {
    let pasted = '';
    handler = new ClipboardHandler(root, { onPaste: (h) => { pasted = h; } });
    handler.register();
    root.dispatchEvent(makePasteEvent(undefined, 'first\nsecond'));
    expect(pasted).toContain('<p>first</p>');
    expect(pasted).toContain('<p>second</p>');
  });

  it('빈 줄(plain text)은 <br>로 변환됨', () => {
    let pasted = '';
    handler = new ClipboardHandler(root, { onPaste: (h) => { pasted = h; } });
    handler.register();
    root.dispatchEvent(makePasteEvent(undefined, 'a\n\nb'));
    expect(pasted).toContain('<br>');
  });

  it('html과 text 모두 없으면 onPaste가 호출되지 않음', () => {
    const cb = vi.fn();
    handler = new ClipboardHandler(root, { onPaste: cb });
    handler.register();
    root.dispatchEvent(makePasteEvent('', ''));
    expect(cb).not.toHaveBeenCalled();
  });

  it('paste 이벤트의 기본 동작이 preventDefault로 차단됨', () => {
    handler = new ClipboardHandler(root);
    handler.register();
    const e = makePasteEvent('<p>x</p>');
    const spy = vi.spyOn(e, 'preventDefault');
    root.dispatchEvent(e);
    expect(spy).toHaveBeenCalled();
  });
});
