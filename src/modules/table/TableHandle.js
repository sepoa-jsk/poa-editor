/**
 * 표 좌상단 ⊕ 핸들 — 표에 마우스를 올리면 표시되며
 * 클릭 시 표의 모든 셀을 선택(poa-cell-selected)한다.
 * 드래그 이동은 현재 미구현(준비 중).
 */
export class TableHandle {
    contentEl = null;
    handle = null;
    currentTable = null;
    hideTimer = 0;
    onSelectAll = null;
    constructor(onSelectAll) {
        this.onSelectAll = onSelectAll ?? null;
    }
    attach(contentEl) {
        this.detach();
        this.contentEl = contentEl;
        contentEl.addEventListener('mouseover', this.overHandler);
        contentEl.addEventListener('mouseout', this.outHandler);
        this.createHandle(contentEl.ownerDocument);
    }
    detach() {
        if (this.contentEl) {
            this.contentEl.removeEventListener('mouseover', this.overHandler);
            this.contentEl.removeEventListener('mouseout', this.outHandler);
            this.contentEl = null;
        }
        this.handle?.remove();
        this.handle = null;
        this.currentTable = null;
        clearTimeout(this.hideTimer);
    }
    // ── 이벤트 핸들러 ────────────────────────────────────────────────
    overHandler = (e) => {
        const table = this.findTable(e.target);
        if (!table)
            return;
        clearTimeout(this.hideTimer);
        this.currentTable = table;
        this.positionHandle(table);
        this.showHandle();
    };
    outHandler = (e) => {
        const rel = e.relatedTarget;
        if (rel && (this.handle?.contains(rel) || this.currentTable?.contains(rel)))
            return;
        this.hideTimer = window.setTimeout(() => this.hideHandle(), 200);
    };
    // ── 핸들 생성/표시/숨김 ─────────────────────────────────────────
    createHandle(doc) {
        const h = doc.createElement('div');
        h.title = '표 전체 선택';
        h.style.cssText = [
            'position:fixed', 'width:20px', 'height:20px',
            'background:#1565c0', 'color:#fff',
            'border-radius:3px', 'cursor:pointer',
            'display:none', 'align-items:center', 'justify-content:center',
            'font-size:14px', 'line-height:1', 'z-index:8000',
            'box-shadow:0 1px 4px rgba(0,0,0,0.3)',
            'user-select:none', '-webkit-user-select:none',
        ].join(';');
        h.textContent = '⊕';
        h.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        h.addEventListener('click', () => {
            if (this.currentTable && this.onSelectAll) {
                this.onSelectAll(this.currentTable);
            }
        });
        h.addEventListener('mouseenter', () => { clearTimeout(this.hideTimer); });
        h.addEventListener('mouseleave', () => {
            this.hideTimer = window.setTimeout(() => this.hideHandle(), 200);
        });
        doc.body.appendChild(h);
        this.handle = h;
    }
    positionHandle(table) {
        if (!this.handle)
            return;
        const rect = table.getBoundingClientRect();
        this.handle.style.left = `${rect.left - 2}px`;
        this.handle.style.top = `${rect.top - 2}px`;
    }
    showHandle() {
        if (this.handle)
            this.handle.style.display = 'flex';
    }
    hideHandle() {
        if (this.handle)
            this.handle.style.display = 'none';
        this.currentTable = null;
    }
    // ── 헬퍼 ────────────────────────────────────────────────────────
    findTable(node) {
        let cur = node;
        while (cur) {
            if (cur.nodeType === Node.ELEMENT_NODE) {
                if (cur.tagName.toLowerCase() === 'table')
                    return cur;
            }
            cur = cur.parentNode;
        }
        return null;
    }
}
