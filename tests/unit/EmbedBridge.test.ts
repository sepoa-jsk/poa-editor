import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EmbedBridge } from '../../src/embed/EmbedBridge.js';

function makeEditorEl(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'editor';
  return el;
}

describe('EmbedBridge', () => {
  let editorEl: HTMLElement;
  let getHTML: ReturnType<typeof vi.fn<() => string>>;
  let setHTML: ReturnType<typeof vi.fn<(html: string) => void>>;
  let bridge: EmbedBridge;

  beforeEach(() => {
    editorEl = makeEditorEl();
    getHTML  = vi.fn<() => string>().mockReturnValue('<p>hello</p>');
    setHTML  = vi.fn<(html: string) => void>();
    bridge   = new EmbedBridge({ editorEl, getHTML, setHTML });
    vi.useFakeTimers();
  });

  afterEach(() => {
    bridge.detach();
    vi.useRealTimers();
  });

  // ── attach / detach ────────────────────────────────────────────────────────

  it('attach: POA_READY 메시지를 setTimeout 후 parent 로 발송', () => {
    const spy = vi.spyOn(window.parent, 'postMessage');
    bridge.attach();
    vi.runAllTimers();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'POA_READY', version: expect.any(String) }),
      '*',
    );
  });

  it('detach: 메시지 리스너를 제거해 더 이상 핸들링하지 않음', () => {
    bridge.attach();
    bridge.detach();
    // POA_SET_CONTENT 발송해도 setHTML이 호출되지 않아야 함
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_SET_CONTENT', html: '<p>x</p>' },
    }));
    expect(setHTML).not.toHaveBeenCalled();
  });

  // ── POA_RESIZE ─────────────────────────────────────────────────────────────

  it('POA_RESIZE: width/height 모두 지정 시 editorEl 스타일 적용', () => {
    bridge.attach();
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_RESIZE', width: '800px', height: '600px' },
    }));
    expect(editorEl.style.width).toBe('800px');
    expect(editorEl.style.height).toBe('600px');
    // jsdom 은 flex:none 을 0 0 auto 로 정규화함
    expect(['none', '0 0 auto']).toContain(editorEl.style.flex);
  });

  it('POA_RESIZE: height 만 지정 시 width 는 변경 안 함', () => {
    bridge.attach();
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_RESIZE', height: '500px' },
    }));
    expect(editorEl.style.width).toBe('');
    expect(editorEl.style.height).toBe('500px');
  });

  it('POA_RESIZE: 숫자 타입 width 는 무시함', () => {
    bridge.attach();
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_RESIZE', width: 800 },
    }));
    expect(editorEl.style.width).toBe('');
  });

  // ── POA_GET_CONTENT / POA_SET_CONTENT ──────────────────────────────────────

  it('POA_GET_CONTENT: source 에 POA_CONTENT 응답 발송', () => {
    bridge.attach();
    const sourceMock = { postMessage: vi.fn() };
    window.dispatchEvent(new MessageEvent('message', {
      data:   { type: 'POA_GET_CONTENT' },
      source: sourceMock as unknown as MessageEventSource,
    }));
    expect(getHTML).toHaveBeenCalledOnce();
    expect(sourceMock.postMessage).toHaveBeenCalledWith(
      { type: 'POA_CONTENT', html: '<p>hello</p>' }, '*',
    );
  });

  it('POA_SET_CONTENT: DOMPurify 정제 후 setHTML 호출', () => {
    bridge.attach();
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_SET_CONTENT', html: '<p>안녕</p><script>alert(1)<\/script>' },
    }));
    expect(setHTML).toHaveBeenCalledOnce();
    const arg: string = setHTML.mock.calls[0][0] as string;
    expect(arg).toContain('<p>안녕</p>');
    expect(arg).not.toContain('<script>');
  });

  it('POA_SET_CONTENT: html 이 문자열이 아닌 경우 무시', () => {
    bridge.attach();
    window.dispatchEvent(new MessageEvent('message', {
      data: { type: 'POA_SET_CONTENT', html: 123 },
    }));
    expect(setHTML).not.toHaveBeenCalled();
  });

  // ── notify 메서드 ──────────────────────────────────────────────────────────

  it('notifyContentChanged: window === parent 이면 postMessage 미발송', () => {
    const spy = vi.spyOn(window.parent, 'postMessage');
    bridge.notifyContentChanged('<p>x</p>', 1, 1);
    // jsdom 에서 window.parent === window 이므로 호출되지 않아야 함
    const calls = spy.mock.calls.filter(c => c[0]?.type === 'POA_CONTENT_CHANGED');
    expect(calls).toHaveLength(0);
  });

  it('notifySaved: window === parent 이면 postMessage 미발송', () => {
    const spy = vi.spyOn(window.parent, 'postMessage');
    bridge.notifySaved('doc-1', '제목');
    const calls = spy.mock.calls.filter(c => c[0]?.type === 'POA_SAVED');
    expect(calls).toHaveLength(0);
  });

  // ── 알 수 없는 타입 / 잘못된 메시지 무시 ──────────────────────────────────

  it('알 수 없는 type 의 메시지는 에러 없이 무시', () => {
    bridge.attach();
    expect(() => {
      window.dispatchEvent(new MessageEvent('message', {
        data: { type: 'UNKNOWN_TYPE' },
      }));
    }).not.toThrow();
  });

  it('data 가 null 인 메시지는 에러 없이 무시', () => {
    bridge.attach();
    expect(() => {
      window.dispatchEvent(new MessageEvent('message', { data: null }));
    }).not.toThrow();
  });

  it('data.type 이 문자열이 아닌 메시지는 에러 없이 무시', () => {
    bridge.attach();
    expect(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: 42 } }));
    }).not.toThrow();
  });
});
