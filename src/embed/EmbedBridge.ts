import DOMPurify from 'dompurify';

const VERSION = '1.0.0';

export interface EmbedBridgeOptions {
  editorEl: HTMLElement;
  getHTML: () => string;
  setHTML: (html: string) => void;
}

/**
 * iframe/postMessage 기반 임베딩 통신 브릿지.
 * 부모 페이지와 양방향 메시지를 처리한다.
 */
export class EmbedBridge {
  private readonly msgHandler = (e: MessageEvent): void => this.handleMessage(e);

  constructor(private readonly opts: EmbedBridgeOptions) {}

  attach(): void {
    window.addEventListener('message', this.msgHandler);
    setTimeout(() => {
      window.parent.postMessage({ type: 'POA_READY', version: VERSION }, '*');
    }, 0);
  }

  detach(): void {
    window.removeEventListener('message', this.msgHandler);
  }

  notifyContentChanged(html: string, charCount: number, wordCount: number): void {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'POA_CONTENT_CHANGED', html, charCount, wordCount }, '*');
    }
  }

  notifySaved(docKey: string, title: string): void {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'POA_SAVED', docKey, title }, '*');
    }
  }

  private applySize(width?: string, height?: string): void {
    const { editorEl } = this.opts;
    if (width)  editorEl.style.width = width;
    if (height) { editorEl.style.height = height; editorEl.style.flex = 'none'; }
  }

  private handleMessage(e: MessageEvent): void {
    if (!e.data || typeof e.data.type !== 'string') return;
    const data = e.data as Record<string, unknown>;
    switch (data.type) {
      case 'POA_RESIZE':
        this.applySize(
          typeof data.width  === 'string' ? data.width  : undefined,
          typeof data.height === 'string' ? data.height : undefined,
        );
        break;
      case 'POA_FULLSCREEN':
        if (data.enabled) {
          void document.documentElement.requestFullscreen?.();
        } else {
          void document.exitFullscreen?.();
        }
        break;
      case 'POA_GET_CONTENT':
        (e.source as WindowProxy | null)?.postMessage(
          { type: 'POA_CONTENT', html: this.opts.getHTML() }, '*',
        );
        break;
      case 'POA_SET_CONTENT':
        if (typeof data.html === 'string') {
          this.opts.setHTML(DOMPurify.sanitize(data.html));
        }
        break;
    }
  }
}
