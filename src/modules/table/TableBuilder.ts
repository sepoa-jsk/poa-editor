export interface TableOptions {
  rows: number;
  cols: number;
  hasHeader?: boolean;
  caption?: string;
  /** 접근성용 테이블 요약 (aria-label 대안) */
  summary?: string;
  borderWidth?: number;
  width?: string;
}

const CELL_BASE = 'border:1px solid #ccc;padding:4px;min-width:40px;';

export class TableBuilder {
  /** TableOptions으로 HTMLTableElement를 생성하여 반환한다 */
  static build(options: TableOptions, ownerDoc: Document = document): HTMLTableElement {
    const {
      rows,
      cols,
      hasHeader = false,
      caption,
      summary,
      borderWidth = 1,
      width = '100%',
    } = options;

    const table = ownerDoc.createElement('table');
    table.style.cssText = `width:${width};border-collapse:collapse;`;
    table.setAttribute('border', String(borderWidth));
    table.setAttribute('cellpadding', '4');
    table.setAttribute('cellspacing', '0');
    if (summary) table.setAttribute('summary', summary);

    if (caption) {
      const cap = ownerDoc.createElement('caption');
      cap.textContent = caption;
      table.appendChild(cap);
    }

    if (hasHeader && rows > 0) {
      const thead = ownerDoc.createElement('thead');
      const tr = ownerDoc.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const th = ownerDoc.createElement('th');
        th.setAttribute('scope', 'col');
        th.style.cssText = `${CELL_BASE}background:#f5f5f5;font-weight:bold;`;
        th.innerHTML = '&nbsp;';
        tr.appendChild(th);
      }
      thead.appendChild(tr);
      table.appendChild(thead);
    }

    const tbody = ownerDoc.createElement('tbody');
    const bodyRows = hasHeader ? rows - 1 : rows;
    for (let r = 0; r < bodyRows; r++) {
      const tr = ownerDoc.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const td = ownerDoc.createElement('td');
        td.style.cssText = CELL_BASE;
        td.innerHTML = '&nbsp;';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
  }

  /**
   * table을 contentEl의 현재 커서 위치 다음 블록 뒤에 삽입한다.
   * 삽입 후 커서를 table 아래 빈 단락으로 이동한다.
   */
  static insert(table: HTMLTableElement, contentEl: HTMLElement): void {
    const ownerDoc = contentEl.ownerDocument;
    const sel = ownerDoc.getSelection();

    const after = ownerDoc.createElement('p');
    after.innerHTML = '&nbsp;';

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (contentEl.contains(range.startContainer)) {
        const block = TableBuilder.findBlockAncestor(range.startContainer, contentEl);

        if (block && block !== contentEl) {
          block.insertAdjacentElement('afterend', table);
        } else {
          range.deleteContents();
          range.insertNode(table);
        }

        table.insertAdjacentElement('afterend', after);

        try {
          const newRange = ownerDoc.createRange();
          newRange.setStart(after.firstChild!, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        } catch {
          // detached node — ignore
        }
        return;
      }
    }

    contentEl.appendChild(table);
    contentEl.appendChild(after);
  }

  private static findBlockAncestor(node: Node, root: HTMLElement): Element | null {
    const BLOCKS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre']);
    let cur: Node | null = node;
    while (cur && cur !== root) {
      if (cur.nodeType === Node.ELEMENT_NODE && BLOCKS.has((cur as Element).tagName.toLowerCase())) {
        return cur as Element;
      }
      cur = cur.parentNode;
    }
    return null;
  }
}
