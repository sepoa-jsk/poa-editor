import DOMPurify from 'dompurify';
const VERSION = '1.0.0';
/**
 * iframe/postMessage 기반 임베딩 통신 브릿지.
 * 부모 페이지와 양방향 메시지를 처리한다.
 */
export class EmbedBridge {
    opts;
    msgHandler = (e) => this.handleMessage(e);
    constructor(opts) {
        this.opts = opts;
    }
    attach() {
        window.addEventListener('message', this.msgHandler);
        setTimeout(() => {
            window.parent.postMessage({ type: 'POA_READY', version: VERSION }, '*');
        }, 0);
    }
    detach() {
        window.removeEventListener('message', this.msgHandler);
    }
    notifyContentChanged(html, charCount, wordCount) {
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'POA_CONTENT_CHANGED', html, charCount, wordCount }, '*');
        }
    }
    notifySaved(docKey, title) {
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'POA_SAVED', docKey, title }, '*');
        }
    }
    applySize(width, height) {
        const { editorEl } = this.opts;
        if (width)
            editorEl.style.width = width;
        if (height) {
            editorEl.style.height = height;
            editorEl.style.flex = 'none';
        }
    }
    handleMessage(e) {
        if (!e.data || typeof e.data.type !== 'string')
            return;
        const data = e.data;
        switch (data.type) {
            case 'POA_RESIZE':
                this.applySize(typeof data.width === 'string' ? data.width : undefined, typeof data.height === 'string' ? data.height : undefined);
                break;
            case 'POA_FULLSCREEN':
                if (data.enabled) {
                    void document.documentElement.requestFullscreen?.();
                }
                else {
                    void document.exitFullscreen?.();
                }
                break;
            case 'POA_GET_CONTENT':
                e.source?.postMessage({ type: 'POA_CONTENT', html: this.opts.getHTML() }, '*');
                break;
            case 'POA_SET_CONTENT':
                if (typeof data.html === 'string') {
                    this.opts.setHTML(DOMPurify.sanitize(data.html));
                }
                break;
        }
    }
}
