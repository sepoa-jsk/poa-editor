import DOMPurify from 'dompurify';
import { sanitize } from '../../utils/dom';
const ALLOWED_IMAGE_TYPES = new Set([
    'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp',
]);
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function plainToHtml(text) {
    return text
        .split('\n')
        .map((line) => {
        const t = line.trim();
        return t === '' ? '<br>' : `<p>${escapeHtml(t)}</p>`;
    })
        .join('');
}
/** 표 관련 속성을 허용하는 DOMPurify 설정으로 정제 */
function sanitizeWithTable(html) {
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['style', 'border', 'width', 'height', 'colspan', 'rowspan', 'cellpadding', 'cellspacing'],
        ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'colgroup', 'col'],
    });
}
/**
 * 표의 셀 px 너비를 비율(%)로 변환해 페이지 너비에 맞게 자동 축소되도록 한다.
 * 워드/엑셀 표는 보통 고정 px 너비를 가져 부모 컨테이너보다 넓으면 페이지를
 * 넘어가는데, 비율로 바꾸면 부모 width 100% + tableLayout:fixed 로 자동 축소.
 */
function fitTableToPage(table) {
    const firstRow = table.querySelector('tr');
    if (!firstRow)
        return;
    const cells = Array.from(firstRow.querySelectorAll('td, th'));
    if (cells.length === 0)
        return;
    const widths = cells.map((c) => {
        const sw = c.style.width || c.getAttribute('width') || '';
        const px = parseFloat(sw);
        return Number.isFinite(px) && px > 0 ? px : 0;
    });
    const total = widths.reduce((a, b) => a + b, 0);
    if (total <= 0)
        return;
    cells.forEach((c, i) => {
        if (widths[i] > 0) {
            const pct = (widths[i] / total * 100).toFixed(2);
            c.style.width = `${pct}%`;
        }
        c.removeAttribute('width');
    });
    table.style.width = '100%';
    table.style.tableLayout = 'fixed';
    table.style.maxWidth = '100%';
}
/** 워드/일반 HTML의 표에 기본 선·패딩 스타일 적용 + 페이지 너비 자동 맞춤 */
function fixTableStyles(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('table').forEach((table) => {
        table.style.borderCollapse = 'collapse';
        if (!table.style.width)
            table.style.width = '100%';
        if (!table.style.border && !table.getAttribute('border')) {
            table.style.border = '1px solid #000000';
        }
        table.removeAttribute('width');
        table.removeAttribute('height');
        // 워드/엑셀의 고정 px 셀 너비를 % 로 변환 → 페이지 폭 안에서 자동 축소
        fitTableToPage(table);
    });
    doc.querySelectorAll('td, th').forEach((cell) => {
        if (!cell.style.border && !cell.style.borderTop) {
            cell.style.border = '1px solid #000000';
        }
        if (!cell.style.padding) {
            cell.style.padding = '4px 8px';
        }
        // overflow-wrap 없으면 긴 영문자열로 셀이 강제로 늘어남
        if (!cell.style.wordBreak)
            cell.style.wordBreak = 'break-word';
    });
    return doc.body.innerHTML;
}
/** 클립보드 HTML이 엑셀 출처인지 확인 */
function isExcelHTML(html) {
    return html.includes('xmlns:x="urn:schemas-microsoft-com:office:excel"')
        || html.includes('mso-number-format')
        || html.includes('x:str');
}
/**
 * 엑셀 HTML에서 xl* 클래스, mso- 스타일 제거 후 표 구조만 추출
 * 기본 테두리·패딩 스타일 적용
 */
function sanitizeExcelHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('[class^="xl"]').forEach((el) => {
        el.removeAttribute('class');
    });
    doc.querySelectorAll('td, th').forEach((el) => {
        const raw = el.getAttribute('style') ?? '';
        const cleaned = raw
            .split(';')
            .filter((s) => !s.trim().startsWith('mso-'))
            .join(';');
        el.setAttribute('style', cleaned);
        if (!el.style.border && !el.style.borderTop)
            el.style.border = '1px solid #000000';
        if (!el.style.padding)
            el.style.padding = '4px 8px';
    });
    doc.querySelectorAll('table').forEach((table) => {
        table.setAttribute('border', '1');
        table.style.borderCollapse = 'collapse';
        if (!table.style.width)
            table.style.width = '100%';
        table.removeAttribute('width');
        // 엑셀 표도 페이지 폭에 맞도록 셀 너비를 비율로 변환
        fitTableToPage(table);
    });
    const table = doc.querySelector('table');
    return table ? sanitizeWithTable(table.outerHTML) : '';
}
/**
 * contenteditable 요소의 붙여넣기 이벤트를 가로채
 * 포맷 우선순위:
 *   1. text/html  — 엑셀 표 / 워드 표 / 일반 HTML 삽입
 *   2. text/plain — 줄바꿈 단락으로 변환 후 삽입
 *   3. image/*    — 순수 이미지 붙여넣기일 때만 Base64 <img> 삽입
 * execCommand 미사용.
 */
export class ClipboardHandler {
    root;
    options;
    pasteHandler = (e) => {
        const cd = e.clipboardData;
        if (!cd)
            return;
        // ── 1. HTML 우선 처리 (엑셀·워드·일반) ────────────────────────
        const rawHtml = cd.getData('text/html');
        if (rawHtml) {
            e.preventDefault();
            let html;
            if (isExcelHTML(rawHtml)) {
                html = sanitizeExcelHTML(rawHtml);
            }
            else if (rawHtml.includes('<table')) {
                html = sanitizeWithTable(fixTableStyles(rawHtml));
            }
            else {
                html = sanitize(rawHtml);
            }
            if (!html)
                return;
            this.insertAtCursor(html);
            this.options.onPaste?.(html);
            return;
        }
        // ── 2. 평문 처리 ───────────────────────────────────────────────
        const rawText = cd.getData('text/plain');
        if (rawText) {
            e.preventDefault();
            const html = plainToHtml(rawText);
            if (!html)
                return;
            this.insertAtCursor(html);
            this.options.onPaste?.(html);
            return;
        }
        // ── 3. 이미지 처리 (text/html, text/plain 모두 없을 때) ────────
        const items = Array.from(cd.items);
        const imageItem = items.find((item) => ALLOWED_IMAGE_TYPES.has(item.type));
        if (imageItem) {
            e.preventDefault();
            const file = imageItem.getAsFile();
            if (!file)
                return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const base64 = ev.target?.result;
                if (!base64)
                    return;
                const ownerDoc = this.root.ownerDocument;
                const img = ownerDoc.createElement('img');
                img.src = base64;
                img.style.maxWidth = '100%';
                img.alt = '붙여넣기 이미지';
                const sel = ownerDoc.getSelection();
                if (sel && sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(img);
                    range.setStartAfter(img);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                else {
                    this.root.appendChild(img);
                }
                this.options.onPasteImage?.();
            };
            reader.readAsDataURL(file);
        }
    };
    constructor(root, options = {}) {
        this.root = root;
        this.options = options;
    }
    register() {
        this.root.addEventListener('paste', this.pasteHandler);
    }
    unregister() {
        this.root.removeEventListener('paste', this.pasteHandler);
    }
    insertAtCursor(html) {
        const ownerDoc = this.root.ownerDocument;
        const sel = ownerDoc.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const fragment = range.createContextualFragment(html);
        const lastNode = fragment.lastChild;
        range.insertNode(fragment);
        if (lastNode) {
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
