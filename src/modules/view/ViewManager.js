import DOMPurify from 'dompurify';
import { PageView } from './PageView.js';
import { syncInputValuesToAttributes } from '../../utils/dom.js';
/**
 * 5가지 뷰 모드(design/html/preview/text/page)와
 * 눈금자·그리드·전체화면·숨김 테두리를 관리한다.
 *
 * attach() 호출 시 contentEl을 슬롯 래퍼 안으로 이동하고
 * 각 뷰 패널을 DOM에 삽입한다.
 */
export class ViewManager {
    contentEl;
    callbacks;
    mode = 'design';
    rulerVisible = false;
    gridVisible = false;
    hiddenBorderVisible = false;
    wrapper = null;
    contentRow = null;
    rulerH = null;
    rulerV = null;
    rulerCorner = null;
    gridOverlay = null;
    htmlPanel = null;
    previewPanel = null;
    textPanel = null;
    pagePanel = null;
    pageViewInstance = null;
    cmGetContent = null;
    cmDestroy = null;
    _htmlTheme = 'dark';
    _htmlRawContent = '';
    constructor(contentEl, callbacks = {}) {
        this.contentEl = contentEl;
        this.callbacks = callbacks;
    }
    attach() {
        const parent = this.contentEl.parentElement;
        if (!parent)
            return;
        const wrapper = document.createElement('div');
        wrapper.className = 'poa-view-wrapper';
        const slotAttr = this.contentEl.getAttribute('slot') ?? '';
        if (slotAttr) {
            wrapper.setAttribute('slot', slotAttr);
            this.contentEl.removeAttribute('slot');
        }
        // Grid: 눈금자 없을 때는 content 셀 하나. 눈금자 표시 시 applyRuler()에서 2×2로 전환.
        wrapper.style.cssText =
            'display:grid;grid-template-areas:"content";grid-template-columns:1fr;grid-template-rows:1fr;' +
                'flex:1;overflow:hidden;position:relative;min-height:0;';
        parent.insertBefore(wrapper, this.contentEl);
        // 스크롤 컨테이너 — grid-area: content. PaperSizeManager가 내부 스타일을 덮어씀.
        const contentRow = document.createElement('div');
        contentRow.className = 'poa-view-content-row';
        contentRow.style.cssText =
            'grid-area:content;display:flex;flex-direction:column;overflow:hidden;min-height:0;';
        wrapper.appendChild(contentRow);
        // contentEl을 스크롤 컨테이너 안으로 이동
        contentRow.appendChild(this.contentEl);
        this.contentEl.style.flex = '1';
        this.contentEl.style.minHeight = '0';
        // Create hidden view panels
        this.htmlPanel = this.createPanel('poa-html-panel');
        this.previewPanel = this.createPanel('poa-preview-panel');
        this.textPanel = this.createPanel('poa-text-panel');
        this.pagePanel = this.createPanel('poa-page-panel');
        contentRow.appendChild(this.htmlPanel);
        contentRow.appendChild(this.previewPanel);
        contentRow.appendChild(this.textPanel);
        contentRow.appendChild(this.pagePanel);
        this.wrapper = wrapper;
        this.contentRow = contentRow;
    }
    detach() {
        this.cmDestroy?.();
        this.cmDestroy = null;
        this.cmGetContent = null;
        this.pageViewInstance?.unmount();
        this.pageViewInstance = null;
        if (this.wrapper && this.contentEl) {
            const parent = this.wrapper.parentElement;
            if (parent) {
                const slotAttr = this.wrapper.getAttribute('slot') ?? '';
                if (slotAttr)
                    this.contentEl.setAttribute('slot', slotAttr);
                parent.insertBefore(this.contentEl, this.wrapper);
                this.wrapper.remove();
            }
        }
        this.contentEl.style.display = '';
        this.wrapper = null;
        this.contentRow = null;
        this.rulerH = null;
        this.rulerV = null;
        this.rulerCorner = null;
        this.gridOverlay = null;
        this.htmlPanel = null;
        this.previewPanel = null;
        this.textPanel = null;
        this.pagePanel = null;
    }
    getMode() { return this.mode; }
    isRulerVisible() { return this.rulerVisible; }
    isGridVisible() { return this.gridVisible; }
    /** 디자인 뷰 스크롤 컨테이너 (.poa-view-content-row) — PaperSizeManager 에서 래퍼로 사용 */
    getScrollContainer() { return this.contentRow; }
    async switchTo(mode) {
        if (this.mode === mode)
            return;
        // Leave html view: sync content back before switching
        if (this.mode === 'html') {
            this.syncFromHtml();
            this.cmDestroy?.();
            this.cmDestroy = null;
            this.cmGetContent = null;
            if (this.htmlPanel)
                this.htmlPanel.innerHTML = '';
        }
        // Leave page view: unmount
        if (this.mode === 'page') {
            this.pageViewInstance?.unmount();
            this.pageViewInstance = null;
        }
        this.mode = mode;
        if (this.wrapper)
            this.wrapper.dataset.viewMode = mode;
        this.contentEl.style.display = mode === 'design' ? '' : 'none';
        if (this.htmlPanel)
            this.htmlPanel.style.display = mode === 'html' ? 'flex' : 'none';
        if (this.previewPanel)
            this.previewPanel.style.display = mode === 'preview' ? 'block' : 'none';
        if (this.textPanel)
            this.textPanel.style.display = mode === 'text' ? 'block' : 'none';
        if (this.pagePanel)
            this.pagePanel.style.display = mode === 'page' ? 'flex' : 'none';
        switch (mode) {
            case 'html':
                this.initHtmlView();
                break;
            case 'preview':
                this.initPreviewView();
                break;
            case 'text':
                this.initTextView();
                break;
            case 'page':
                this.initPageView();
                break;
            case 'design':
                this.contentEl.focus();
                break;
        }
        this.callbacks.onViewChange?.(mode);
    }
    toggleRuler() {
        this.rulerVisible = !this.rulerVisible;
        this.applyRuler();
        return this.rulerVisible;
    }
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        this.applyGrid();
        return this.gridVisible;
    }
    toggleHiddenBorder() {
        this.hiddenBorderVisible = !this.hiddenBorderVisible;
        this.contentEl.classList.toggle('poa-show-hidden-borders', this.hiddenBorderVisible);
        return this.hiddenBorderVisible;
    }
    toggleFullscreen(target) {
        if (!document.fullscreenElement) {
            void target.requestFullscreen?.();
        }
        else {
            void document.exitFullscreen?.();
        }
    }
    // ── private ──────────────────────────────────────────────────────────────
    createPanel(className) {
        const el = document.createElement('div');
        el.className = className;
        el.style.cssText = 'display:none;flex:1;overflow-y:auto;box-sizing:border-box;min-height:0;';
        return el;
    }
    initHtmlView() {
        if (!this.htmlPanel)
            return;
        try {
            const saved = localStorage.getItem('poa-html-theme');
            if (saved === 'light' || saved === 'dark')
                this._htmlTheme = saved;
        }
        catch { /* ignore */ }
        this._htmlRawContent = this.prettyHtml(this.contentEl.innerHTML);
        this._renderHtmlView();
    }
    syncFromHtml() {
        const raw = this.cmGetContent?.() ?? '';
        if (raw.trim()) {
            this.contentEl.innerHTML = DOMPurify.sanitize(raw);
        }
    }
    initPreviewView() {
        if (!this.previewPanel)
            return;
        syncInputValuesToAttributes(this.contentEl);
        const html = DOMPurify.sanitize(this.contentEl.innerHTML);
        this.previewPanel.style.cssText =
            'display:block;flex:1;overflow-y:auto;padding:20px;font-size:14px;' +
                'line-height:1.6;box-sizing:border-box;background:#FFFFFF;';
        this.previewPanel.innerHTML = html;
    }
    initTextView() {
        if (!this.textPanel)
            return;
        const text = this._extractFormattedText(this.contentEl);
        this.textPanel.innerHTML = '';
        this.textPanel.style.cssText =
            'display:block;flex:1;overflow-y:auto;background:#F3F4F6;padding:32px;box-sizing:border-box;';
        const paper = document.createElement('div');
        paper.style.cssText =
            'background:#FFFFFF;max-width:860px;margin:0 auto;padding:48px 64px;' +
                "font-family:'Noto Sans KR','맑은 고딕',sans-serif;font-size:11pt;color:#1F2937;" +
                'line-height:1.8;white-space:pre-wrap;word-break:break-word;box-sizing:border-box;' +
                'box-shadow:0 1px 4px rgba(0,0,0,.08);';
        paper.textContent = text;
        this.textPanel.appendChild(paper);
    }
    _extractFormattedText(root) {
        const olCounters = new WeakMap();
        const walk = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent ?? '';
            }
            if (node.nodeType !== Node.ELEMENT_NODE)
                return '';
            const el = node;
            const tag = el.tagName.toLowerCase();
            if (tag === 'br')
                return '\n';
            if (tag === 'li') {
                const parent = el.parentElement;
                const isOl = parent?.tagName.toLowerCase() === 'ol';
                let prefix;
                if (isOl && parent) {
                    const idx = (olCounters.get(parent) ?? 0) + 1;
                    olCounters.set(parent, idx);
                    prefix = `${idx}. `;
                }
                else {
                    prefix = '• ';
                }
                const inner = Array.from(el.childNodes).map(walk).join('');
                return prefix + inner.trimStart() + '\n';
            }
            const blockTags = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'address', 'figure', 'figcaption', 'article', 'section', 'header', 'footer', 'main', 'nav', 'aside', 'ul', 'ol', 'dl', 'dt', 'dd', 'table', 'tr', 'td', 'th']);
            const inner = Array.from(el.childNodes).map(walk).join('');
            if (blockTags.has(tag)) {
                return '\n' + inner + '\n';
            }
            return inner;
        };
        const raw = walk(root);
        return raw.replace(/\n{3,}/g, '\n\n').trim();
    }
    initPageView() {
        if (!this.pagePanel)
            return;
        syncInputValuesToAttributes(this.contentEl);
        const html = DOMPurify.sanitize(this.contentEl.innerHTML);
        const bookmarks = this.callbacks.getBookmarks?.() ?? [];
        this.pagePanel.innerHTML = '';
        this.pagePanel.style.cssText =
            'display:flex;flex:1;overflow:hidden;box-sizing:border-box;';
        this.pageViewInstance = new PageView();
        this.pageViewInstance.mount(this.pagePanel, html, bookmarks);
    }
    applyRuler() {
        if (!this.wrapper)
            return;
        if (this.rulerVisible) {
            // 눈금자 및 코너 박스 생성 (최초 1회)
            if (!this.rulerCorner) {
                this.rulerCorner = document.createElement('div');
                this.rulerCorner.className = 'poa-ruler-corner';
                this.rulerCorner.style.cssText =
                    'grid-area:corner;background:#E5E7EB;width:20px;height:20px;flex-shrink:0;';
                this.wrapper.appendChild(this.rulerCorner);
            }
            if (!this.rulerH) {
                this.rulerH = this.buildHRuler();
                this.wrapper.appendChild(this.rulerH);
            }
            if (!this.rulerV) {
                this.rulerV = this.buildVRuler();
                this.wrapper.appendChild(this.rulerV);
            }
            this.rulerCorner.style.display = '';
            this.rulerH.style.display = '';
            this.rulerV.style.display = '';
            // wrapper를 2×2 grid로 전환
            this.wrapper.style.gridTemplateAreas = '"corner ruler-h" "ruler-v content"';
            this.wrapper.style.gridTemplateColumns = '20px 1fr';
            this.wrapper.style.gridTemplateRows = '20px 1fr';
        }
        else {
            if (this.rulerCorner)
                this.rulerCorner.style.display = 'none';
            if (this.rulerH)
                this.rulerH.style.display = 'none';
            if (this.rulerV)
                this.rulerV.style.display = 'none';
            // wrapper를 content 전체 사용으로 복귀
            this.wrapper.style.gridTemplateAreas = '"content"';
            this.wrapper.style.gridTemplateColumns = '1fr';
            this.wrapper.style.gridTemplateRows = '1fr';
        }
    }
    applyGrid() {
        if (!this.wrapper)
            return;
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
        }
        else {
            if (this.gridOverlay)
                this.gridOverlay.style.display = 'none';
        }
    }
    buildHRuler() {
        const div = document.createElement('div');
        div.className = 'poa-ruler-h';
        div.style.cssText =
            'grid-area:ruler-h;height:20px;background:#F3F4F6;border-bottom:1px solid #E5E7EB;overflow:hidden;';
        const canvas = document.createElement('canvas');
        canvas.height = 20;
        div.appendChild(canvas);
        requestAnimationFrame(() => {
            try {
                this.drawHRuler(canvas);
            }
            catch { /* jsdom에서 canvas 미구현 */ }
        });
        return div;
    }
    buildVRuler() {
        const div = document.createElement('div');
        div.className = 'poa-ruler-v';
        div.style.cssText =
            'grid-area:ruler-v;width:20px;background:#F3F4F6;border-right:1px solid #E5E7EB;overflow:hidden;';
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        div.appendChild(canvas);
        requestAnimationFrame(() => {
            try {
                this.drawVRuler(canvas);
            }
            catch { /* jsdom에서 canvas 미구현 */ }
        });
        return div;
    }
    drawHRuler(canvas) {
        const w = (this.rulerH?.clientWidth ?? this.wrapper?.clientWidth ?? 0) || 800;
        canvas.width = w;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, w, 20);
        ctx.strokeStyle = '#bbb';
        ctx.fillStyle = '#777';
        ctx.font = '8px sans-serif';
        ctx.lineWidth = 1;
        for (let x = 0; x <= w; x += 10) {
            const major = x % 100 === 0;
            const h = major ? 12 : (x % 50 === 0 ? 8 : 4);
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
    drawVRuler(canvas) {
        const h = (this.rulerV?.clientHeight ?? this.wrapper?.clientHeight ?? 0) || 600;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, 20, h);
        ctx.strokeStyle = '#bbb';
        ctx.fillStyle = '#777';
        ctx.font = '8px sans-serif';
        ctx.lineWidth = 1;
        for (let y = 0; y <= h; y += 10) {
            const major = y % 100 === 0;
            const w = major ? 12 : (y % 50 === 0 ? 8 : 4);
            ctx.beginPath();
            ctx.moveTo(20 - w, y + 0.5);
            ctx.lineTo(20, y + 0.5);
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
    _renderHtmlView() {
        if (!this.htmlPanel)
            return;
        const isDark = this._htmlTheme === 'dark';
        const content = this._htmlRawContent;
        const FONT = "Consolas,Monaco,'Courier New',monospace";
        const bg = isDark ? '#1E1E1E' : '#FFFFFF';
        const toolbarBg = isDark ? '#2D2D2D' : '#F0F0F0';
        const lnColor = isDark ? '#858585' : '#999999';
        const lnBg = isDark ? '#1E1E1E' : '#F5F5F5';
        const lnBorder = isDark ? '#333333' : '#DDDDDD';
        const codeFg = isDark ? '#D4D4D4' : '#000000';
        this.htmlPanel.innerHTML = '';
        this.htmlPanel.style.cssText =
            `display:flex;flex-direction:column;flex:1;overflow:hidden;` +
                `box-sizing:border-box;background:${bg};`;
        // ── 상단 툴바 (절대 위치 없이 flex 항목으로) ─────────────────────────────
        const toolbar = document.createElement('div');
        toolbar.style.cssText =
            `height:36px;flex-shrink:0;background:${toolbarBg};` +
                `border-bottom:1px solid ${isDark ? '#444' : '#DDD'};` +
                `display:flex;align-items:center;padding:0 12px;justify-content:flex-end;`;
        const toggleBtn = document.createElement('button');
        toggleBtn.style.cssText =
            `background:${isDark ? '#444' : '#E0E0E0'};color:${isDark ? '#CCC' : '#333'};` +
                `border:none;border-radius:4px;padding:4px 10px;font-size:12px;cursor:pointer;font-family:inherit;`;
        toggleBtn.textContent = isDark ? '☀️ 라이트' : '🌙 다크';
        toggleBtn.addEventListener('click', () => {
            this._htmlRawContent = this.cmGetContent?.() ?? this._htmlRawContent;
            this._htmlTheme = isDark ? 'light' : 'dark';
            try {
                localStorage.setItem('poa-html-theme', this._htmlTheme);
            }
            catch { /* ignore */ }
            this._renderHtmlView();
        });
        toolbar.appendChild(toggleBtn);
        this.htmlPanel.appendChild(toolbar);
        // ── 코드 영역 (줄번호 + contenteditable 코드) ────────────────────────────
        // overflow:auto를 이 컨테이너에 두면 줄번호+코드가 함께 스크롤됨
        const codeArea = document.createElement('div');
        codeArea.style.cssText = 'flex:1;display:flex;overflow:auto;min-height:0;align-items:flex-start;';
        this.htmlPanel.appendChild(codeArea);
        const lines = content.split('\n');
        // 줄번호 영역 — 코드 영역 높이에 맞춰 align-self:stretch
        const lineNumEl = document.createElement('div');
        lineNumEl.style.cssText =
            `min-width:48px;padding:12px 8px;text-align:right;flex-shrink:0;align-self:stretch;` +
                `color:${lnColor};background:${lnBg};` +
                `border-right:1px solid ${lnBorder};user-select:none;` +
                `font-family:${FONT};font-size:13px;line-height:1.6;box-sizing:border-box;`;
        lineNumEl.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
        codeArea.appendChild(lineNumEl);
        // contenteditable 코드 영역 — position:static 으로 높이가 내용에 따라 결정됨
        const codeEl = document.createElement('div');
        codeEl.contentEditable = 'true';
        codeEl.setAttribute('spellcheck', 'false');
        codeEl.style.cssText =
            `flex:1;padding:12px 16px;` +
                `color:${codeFg};` +
                `font-family:${FONT};font-size:13px;line-height:1.6;` +
                `white-space:pre-wrap;word-break:break-all;outline:none;` +
                `min-height:100%;box-sizing:border-box;`;
        codeEl.innerHTML = this._highlightHtml(content, isDark);
        codeArea.appendChild(codeEl);
        codeEl.addEventListener('input', () => {
            const count = (codeEl.innerText.match(/\n/g)?.length ?? 0) + 1;
            lineNumEl.innerHTML = Array.from({ length: count }, (_, i) => `<div>${i + 1}</div>`).join('');
        });
        this.cmGetContent = () => codeEl.innerText;
        this.cmDestroy = () => { };
    }
    _highlightHtml(code, isDark) {
        const C = isDark
            ? { tag: '#569CD6', attr: '#9CDCFE', val: '#CE9178', cmt: '#6A9955' }
            : { tag: '#0000FF', attr: '#FF0000', val: '#0000FF', cmt: '#008000' };
        const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const sp = (c, s) => `<span style="color:${c}">${s}</span>`;
        let result = '';
        let i = 0;
        while (i < code.length) {
            // 주석
            if (code.startsWith('<!--', i)) {
                const end = code.indexOf('-->', i + 4);
                const to = end !== -1 ? end + 3 : code.length;
                result += sp(C.cmt, esc(code.slice(i, to)));
                i = to;
                continue;
            }
            // DOCTYPE / 처리 지시문
            if (code.startsWith('<!', i) || code.startsWith('<?', i)) {
                const end = code.indexOf('>', i);
                const to = end !== -1 ? end + 1 : code.length;
                result += sp(C.cmt, esc(code.slice(i, to)));
                i = to;
                continue;
            }
            // 태그
            if (code[i] === '<') {
                let j = i + 1;
                let inQ = null;
                while (j < code.length) {
                    const ch = code[j];
                    if (inQ) {
                        if (ch === inQ)
                            inQ = null;
                    }
                    else if (ch === '"' || ch === "'") {
                        inQ = ch;
                    }
                    else if (ch === '>')
                        break;
                    j++;
                }
                if (j >= code.length) {
                    result += esc(code.slice(i));
                    i = code.length;
                    continue;
                }
                const inner = code.slice(i + 1, j);
                const isClose = inner.startsWith('/');
                const body = isClose ? inner.slice(1) : inner;
                const m = body.match(/^([\w:-]+)([\s\S]*)$/);
                if (m) {
                    const [, tagName, attrPart] = m;
                    const isSelf = attrPart.trimEnd().endsWith('/');
                    const attrStr = isSelf ? attrPart.slice(0, attrPart.lastIndexOf('/')) : attrPart;
                    const hAttrs = attrStr.replace(/([\w:-]+)(\s*=\s*)((?:"[^"]*"|'[^']*'|[^\s>"'=`]+))/g, (_, a, eq, v) => sp(C.attr, esc(a)) + esc(eq) + sp(C.val, esc(v)));
                    result +=
                        esc('<') + (isClose ? esc('/') : '') +
                            sp(C.tag, esc(tagName)) + hAttrs +
                            (isSelf ? esc('/') : '') + esc('>');
                }
                else {
                    result += esc(code.slice(i, j + 1));
                }
                i = j + 1;
                continue;
            }
            // 텍스트 노드
            const next = code.indexOf('<', i);
            const to = next !== -1 ? next : code.length;
            result += esc(code.slice(i, to));
            i = to;
        }
        return result;
    }
    prettyHtml(html) {
        return html
            .replace(/(<\/(?:div|p|br|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)>)/gi, '$1\n')
            .replace(/(<(?:div|p|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)[^>]*>)/gi, '\n$1')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }
}
