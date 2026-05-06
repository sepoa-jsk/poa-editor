import DOMPurify from 'dompurify';
import { PageView } from './PageView.js';
import type { BookmarkEntry } from '../insert/BookmarkManager.js';

export type ViewMode = 'design' | 'html' | 'preview' | 'text' | 'page';

export interface ViewManagerCallbacks {
  onViewChange?: (mode: ViewMode) => void;
  getBookmarks?: () => BookmarkEntry[];
}

/**
 * 5가지 뷰 모드(design/html/preview/text/page)와
 * 눈금자·그리드·전체화면·숨김 테두리를 관리한다.
 *
 * attach() 호출 시 contentEl을 슬롯 래퍼 안으로 이동하고
 * 각 뷰 패널을 DOM에 삽입한다.
 */
export class ViewManager {
  private mode: ViewMode = 'design';
  private rulerVisible = false;
  private gridVisible = false;
  private hiddenBorderVisible = false;

  private wrapper: HTMLDivElement | null = null;
  private contentRow: HTMLDivElement | null = null;
  private rulerH: HTMLDivElement | null = null;
  private rulerV: HTMLDivElement | null = null;
  private gridOverlay: HTMLDivElement | null = null;
  private htmlPanel: HTMLDivElement | null = null;
  private previewPanel: HTMLDivElement | null = null;
  private textPanel: HTMLDivElement | null = null;
  private pagePanel: HTMLDivElement | null = null;
  private pageViewInstance: PageView | null = null;

  private cmGetContent: (() => string) | null = null;
  private cmDestroy: (() => void) | null = null;

  constructor(
    private readonly contentEl: HTMLDivElement,
    private readonly callbacks: ViewManagerCallbacks = {},
  ) {}

  attach(): void {
    const parent = this.contentEl.parentElement;
    if (!parent) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'poa-view-wrapper';
    const slotAttr = this.contentEl.getAttribute('slot') ?? '';
    if (slotAttr) {
      wrapper.setAttribute('slot', slotAttr);
      this.contentEl.removeAttribute('slot');
    }
    wrapper.style.cssText =
      'display:flex;flex-direction:column;flex:1;overflow:hidden;position:relative;min-height:0;';

    parent.insertBefore(wrapper, this.contentEl);

    // Content row: ruler-v + all panels side-by-side
    const contentRow = document.createElement('div');
    contentRow.className = 'poa-view-content-row';
    contentRow.style.cssText = 'display:flex;flex:1;overflow:hidden;min-height:0;';
    wrapper.appendChild(contentRow);

    // Move contentEl into contentRow
    contentRow.appendChild(this.contentEl);
    this.contentEl.style.flex = '1';
    this.contentEl.style.minHeight = '0';

    // Create hidden view panels
    this.htmlPanel    = this.createPanel('poa-html-panel');
    this.previewPanel = this.createPanel('poa-preview-panel');
    this.textPanel    = this.createPanel('poa-text-panel');
    this.pagePanel    = this.createPanel('poa-page-panel');

    contentRow.appendChild(this.htmlPanel);
    contentRow.appendChild(this.previewPanel);
    contentRow.appendChild(this.textPanel);
    contentRow.appendChild(this.pagePanel);

    this.wrapper    = wrapper;
    this.contentRow = contentRow;
  }

  detach(): void {
    this.cmDestroy?.();
    this.cmDestroy    = null;
    this.cmGetContent = null;
    this.pageViewInstance?.unmount();
    this.pageViewInstance = null;

    if (this.wrapper && this.contentEl) {
      const parent = this.wrapper.parentElement;
      if (parent) {
        const slotAttr = this.wrapper.getAttribute('slot') ?? '';
        if (slotAttr) this.contentEl.setAttribute('slot', slotAttr);
        parent.insertBefore(this.contentEl, this.wrapper);
        this.wrapper.remove();
      }
    }

    this.contentEl.style.display = '';
    this.wrapper      = null;
    this.contentRow   = null;
    this.rulerH       = null;
    this.rulerV       = null;
    this.gridOverlay  = null;
    this.htmlPanel    = null;
    this.previewPanel = null;
    this.textPanel    = null;
    this.pagePanel    = null;
  }

  getMode(): ViewMode { return this.mode; }
  isRulerVisible(): boolean { return this.rulerVisible; }
  isGridVisible(): boolean { return this.gridVisible; }

  /** 디자인 뷰 스크롤 컨테이너 (.poa-view-content-row) — PaperSizeManager 에서 래퍼로 사용 */
  getScrollContainer(): HTMLDivElement | null { return this.contentRow; }

  async switchTo(mode: ViewMode): Promise<void> {
    if (this.mode === mode) return;

    // Leave html view: sync content back before switching
    if (this.mode === 'html') {
      this.syncFromHtml();
      this.cmDestroy?.();
      this.cmDestroy    = null;
      this.cmGetContent = null;
      if (this.htmlPanel) this.htmlPanel.innerHTML = '';
    }

    // Leave page view: unmount
    if (this.mode === 'page') {
      this.pageViewInstance?.unmount();
      this.pageViewInstance = null;
    }

    this.mode = mode;

    this.contentEl.style.display   = mode === 'design' ? '' : 'none';
    if (this.htmlPanel)    this.htmlPanel.style.display    = mode === 'html'    ? 'flex' : 'none';
    if (this.previewPanel) this.previewPanel.style.display = mode === 'preview' ? 'block': 'none';
    if (this.textPanel)    this.textPanel.style.display    = mode === 'text'    ? 'block': 'none';
    if (this.pagePanel)    this.pagePanel.style.display    = mode === 'page'    ? 'flex' : 'none';

    switch (mode) {
      case 'html':    await this.initHtmlView(); break;
      case 'preview': this.initPreviewView();   break;
      case 'text':    this.initTextView();      break;
      case 'page':    this.initPageView();      break;
      case 'design':  this.contentEl.focus();   break;
    }

    this.callbacks.onViewChange?.(mode);
  }

  toggleRuler(): boolean {
    this.rulerVisible = !this.rulerVisible;
    this.applyRuler();
    return this.rulerVisible;
  }

  toggleGrid(): boolean {
    this.gridVisible = !this.gridVisible;
    this.applyGrid();
    return this.gridVisible;
  }

  toggleHiddenBorder(): boolean {
    this.hiddenBorderVisible = !this.hiddenBorderVisible;
    this.contentEl.classList.toggle('poa-show-hidden-borders', this.hiddenBorderVisible);
    return this.hiddenBorderVisible;
  }

  toggleFullscreen(target: Element): void {
    if (!document.fullscreenElement) {
      void target.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }

  // ── private ──────────────────────────────────────────────────────────────

  private createPanel(className: string): HTMLDivElement {
    const el = document.createElement('div');
    el.className = className;
    el.style.cssText = 'display:none;flex:1;overflow-y:auto;box-sizing:border-box;min-height:0;';
    return el;
  }

  private async initHtmlView(): Promise<void> {
    if (!this.htmlPanel) return;
    const html = this.prettyHtml(this.contentEl.innerHTML);

    try {
      const [{ EditorView, basicSetup }, { html: htmlLang }] = await Promise.all([
        import('codemirror'),
        import('@codemirror/lang-html'),
      ]);

      this.htmlPanel.innerHTML = '';
      this.htmlPanel.style.cssText =
        'display:flex;flex:1;overflow:hidden;box-sizing:border-box;';

      const cmHost = document.createElement('div');
      cmHost.style.cssText = 'flex:1;overflow:auto;';
      this.htmlPanel.appendChild(cmHost);

      const view = new EditorView({
        doc: html,
        extensions: [basicSetup, htmlLang()],
        parent: cmHost,
      });

      this.cmGetContent = () => view.state.doc.toString();
      this.cmDestroy    = () => view.destroy();
    } catch {
      // CodeMirror 로드 실패 → textarea fallback
      this.htmlPanel.innerHTML = '';
      this.htmlPanel.style.cssText =
        'display:flex;flex:1;overflow:hidden;box-sizing:border-box;';
      const ta = document.createElement('textarea');
      ta.value = html;
      ta.id    = 'poa-html-fallback-ta';
      ta.style.cssText =
        'flex:1;font-family:monospace;font-size:13px;border:none;outline:none;' +
        'padding:12px;resize:none;box-sizing:border-box;';
      this.htmlPanel.appendChild(ta);

      this.cmGetContent = () => ta.value;
      this.cmDestroy    = (): void => { /* textarea는 destroy 불필요 */ };
    }
  }

  private syncFromHtml(): void {
    const raw = this.cmGetContent?.() ?? '';
    if (raw.trim()) {
      this.contentEl.innerHTML = DOMPurify.sanitize(raw);
    }
  }

  private initPreviewView(): void {
    if (!this.previewPanel) return;
    const html = DOMPurify.sanitize(this.contentEl.innerHTML);
    this.previewPanel.style.cssText =
      'display:block;flex:1;overflow-y:auto;padding:20px;font-size:14px;' +
      'line-height:1.6;box-sizing:border-box;';
    this.previewPanel.innerHTML = html;
  }

  private initTextView(): void {
    if (!this.textPanel) return;
    const text = this.contentEl.innerText ?? this.contentEl.textContent ?? '';
    this.textPanel.innerHTML = '';
    this.textPanel.style.cssText =
      'display:block;flex:1;overflow-y:auto;box-sizing:border-box;';
    const pre = document.createElement('pre');
    pre.style.cssText =
      'padding:20px;white-space:pre-wrap;font-size:14px;line-height:1.6;' +
      'margin:0;font-family:inherit;';
    pre.textContent = text;
    this.textPanel.appendChild(pre);
  }

  private initPageView(): void {
    if (!this.pagePanel) return;
    const html      = DOMPurify.sanitize(this.contentEl.innerHTML);
    const bookmarks = this.callbacks.getBookmarks?.() ?? [];
    this.pagePanel.innerHTML  = '';
    this.pagePanel.style.cssText =
      'display:flex;flex:1;overflow:hidden;box-sizing:border-box;';
    this.pageViewInstance = new PageView();
    this.pageViewInstance.mount(this.pagePanel, html, bookmarks);
  }

  private applyRuler(): void {
    if (!this.wrapper || !this.contentRow) return;

    if (this.rulerVisible) {
      if (!this.rulerH) {
        this.rulerH = this.buildHRuler();
        this.wrapper.insertBefore(this.rulerH, this.contentRow);
      }
      this.rulerH.style.display = 'block';

      if (!this.rulerV) {
        this.rulerV = this.buildVRuler();
        this.contentRow.insertBefore(this.rulerV, this.contentRow.firstChild);
      }
      this.rulerV.style.display = 'block';
    } else {
      if (this.rulerH) this.rulerH.style.display = 'none';
      if (this.rulerV) this.rulerV.style.display = 'none';
    }
  }

  private applyGrid(): void {
    if (!this.wrapper) return;

    if (this.gridVisible) {
      if (!this.gridOverlay) {
        const ov = document.createElement('div');
        ov.className = 'poa-grid-overlay';
        ov.style.cssText =
          'position:absolute;inset:0;pointer-events:none;z-index:5;' +
          'background-image:' +
          'repeating-linear-gradient(transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px),' +
          'repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px);';
        this.wrapper.appendChild(ov);
        this.gridOverlay = ov;
      }
      this.gridOverlay.style.display = '';
    } else {
      if (this.gridOverlay) this.gridOverlay.style.display = 'none';
    }
  }

  private buildHRuler(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'poa-ruler-h';
    div.style.cssText =
      'height:20px;flex-shrink:0;background:#f0f0f0;border-bottom:1px solid #ddd;overflow:hidden;';
    const canvas = document.createElement('canvas');
    canvas.height = 20;
    div.appendChild(canvas);
    requestAnimationFrame(() => {
      try { this.drawHRuler(canvas); } catch { /* jsdom에서 canvas 미구현 */ }
    });
    return div;
  }

  private buildVRuler(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'poa-ruler-v';
    div.style.cssText =
      'width:20px;flex-shrink:0;background:#f0f0f0;border-right:1px solid #ddd;overflow:hidden;';
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    div.appendChild(canvas);
    requestAnimationFrame(() => {
      try { this.drawVRuler(canvas); } catch { /* jsdom에서 canvas 미구현 */ }
    });
    return div;
  }

  private drawHRuler(canvas: HTMLCanvasElement): void {
    const w = (this.wrapper?.clientWidth ?? 0) || 800;
    canvas.width = w;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, 20);
    ctx.strokeStyle = '#bbb';
    ctx.fillStyle   = '#777';
    ctx.font        = '8px sans-serif';
    ctx.lineWidth   = 1;
    for (let x = 0; x <= w; x += 10) {
      const major = x % 100 === 0;
      const h     = major ? 12 : (x % 50 === 0 ? 8 : 4);
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 20 - h);
      ctx.lineTo(x + 0.5, 20);
      ctx.stroke();
      if (major && x > 0) {
        ctx.textAlign = 'center';
        ctx.fillText(String(x), x, 20 - 13);
      }
    }
  }

  private drawVRuler(canvas: HTMLCanvasElement): void {
    const h = (this.wrapper?.clientHeight ?? 0) || 600;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 20, h);
    ctx.strokeStyle = '#bbb';
    ctx.fillStyle   = '#777';
    ctx.font        = '8px sans-serif';
    ctx.lineWidth   = 1;
    for (let y = 0; y <= h; y += 10) {
      const major = y % 100 === 0;
      const w     = major ? 12 : (y % 50 === 0 ? 8 : 4);
      ctx.beginPath();
      ctx.moveTo(20 - w, y + 0.5);
      ctx.lineTo(20,     y + 0.5);
      ctx.stroke();
      if (major && y > 0) {
        ctx.save();
        ctx.translate(20 - 14, y);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(String(y), 0, 0);
        ctx.restore();
      }
    }
  }

  private prettyHtml(html: string): string {
    return html
      .replace(/(<\/(?:div|p|br|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)>)/gi, '$1\n')
      .replace(/(<(?:div|p|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)[^>]*>)/gi, '\n$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}
