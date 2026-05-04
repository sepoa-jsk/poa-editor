export type HeaderPosition = 'none' | 'top' | 'left';

export interface TableOptions {
  rows: number;
  cols: number;
  /** CSS 너비 값 (예: '100%', '500px') */
  width?: string;
  /** CSS 높이 값 (예: '120px') — 빈 문자열이면 auto */
  height?: string;
  /** 테두리 두께 px (0 = 테두리 없음) */
  border?: number;
  /** 왼쪽 여백 px */
  marginLeft?: number;
  align?: 'left' | 'center' | 'right';
  headerPosition?: HeaderPosition;
  /** 테두리 색 hex (예: '#000000') */
  borderColor?: string;
  /** 배경색 hex */
  bgColor?: string;
  id?: string;
  className?: string;
  caption?: string;
  /** true(기본)=화면 표시, false=HTML 소스에만(display:none) */
  captionVisible?: boolean;
  /** HTML summary 속성 — 화면 미표시, 스크린 리더용 */
  summary?: string;
}

const BLOCK_TAGS = new Set([
  'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'li', 'blockquote', 'pre',
]);

export class TableBuilder {
  /** TableOptions 으로 HTMLTableElement 를 생성하여 반환한다 */
  static build(options: TableOptions, ownerDoc: Document = document): HTMLTableElement {
    const {
      rows, cols,
      width, height,
      border = 1,
      marginLeft = 0,
      align = 'left',
      headerPosition = 'none',
      borderColor = '#000000',
      bgColor,
      id, className,
      caption, captionVisible = true,
      summary,
    } = options;

    const table = ownerDoc.createElement('table');

    // ── 테이블 인라인 스타일 ────────────────────────────────────────
    const styleMap: Record<string, string> = {
      'border-collapse': 'collapse',
      'table-layout':    'fixed',      // 셀 내용에 의한 자동 늘어남 방지
      'word-break':      'break-word', // 긴 단어 줄바꿈
    };
    if (width)  styleMap['width']  = width;
    if (height) styleMap['height'] = height;
    if (bgColor) styleMap['background-color'] = bgColor;

    if (align === 'center') {
      styleMap['margin-left']  = 'auto';
      styleMap['margin-right'] = 'auto';
    } else if (align === 'right') {
      styleMap['margin-left']  = 'auto';
      styleMap['margin-right'] = '0';
    } else if (marginLeft > 0) {
      styleMap['margin-left'] = `${marginLeft}px`;
    }

    table.style.cssText = Object.entries(styleMap).map(([k, v]) => `${k}:${v}`).join(';');

    // ── colgroup: table-layout:fixed 에서 열 너비를 균등 배분 ───────
    const colgroup = ownerDoc.createElement('colgroup');
    const colWidthPct = (100 / cols).toFixed(4);
    for (let c = 0; c < cols; c++) {
      const col = ownerDoc.createElement('col');
      col.style.width = `${colWidthPct}%`;
      colgroup.appendChild(col);
    }
    table.appendChild(colgroup);

    // ── HTML 속성 ──────────────────────────────────────────────────
    if (border > 0) table.setAttribute('border', String(border));
    table.setAttribute('cellpadding', '4');
    table.setAttribute('cellspacing', '0');
    if (summary?.trim()) table.setAttribute('summary', summary.trim());
    if (id)        table.id        = id;
    if (className) table.className = className;

    // ── 캡션 ───────────────────────────────────────────────────────
    if (caption?.trim()) {
      const cap = ownerDoc.createElement('caption');
      cap.textContent = caption.trim();
      if (!captionVisible) cap.style.display = 'none';
      table.appendChild(cap);
    }

    // ── 셀 공통 스타일 ─────────────────────────────────────────────
    const cellBase = border > 0
      ? `border:${border}px solid ${borderColor};padding:4px;overflow:hidden;word-break:break-word;`
      : `border:none;padding:4px;overflow:hidden;word-break:break-word;`;
    const headerStyle = cellBase + 'background:#f5f5f5;font-weight:bold;';

    // ── THEAD (상단 헤더) ──────────────────────────────────────────
    if (headerPosition === 'top' && rows > 0) {
      const thead = ownerDoc.createElement('thead');
      const tr    = ownerDoc.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const th = ownerDoc.createElement('th');
        th.setAttribute('scope', 'col');
        th.style.cssText = headerStyle;
        th.innerHTML = '&nbsp;';
        tr.appendChild(th);
      }
      thead.appendChild(tr);
      table.appendChild(thead);
    }

    // ── TBODY ─────────────────────────────────────────────────────
    const tbody    = ownerDoc.createElement('tbody');
    const bodyRows = (headerPosition === 'top' && rows > 0) ? rows - 1 : rows;

    for (let r = 0; r < bodyRows; r++) {
      const tr = ownerDoc.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const isLeftHeader = (headerPosition === 'left' && c === 0);
        if (isLeftHeader) {
          const th = ownerDoc.createElement('th');
          th.setAttribute('scope', 'row');
          th.style.cssText = headerStyle;
          th.innerHTML = '&nbsp;';
          tr.appendChild(th);
        } else {
          const td = ownerDoc.createElement('td');
          td.style.cssText = cellBase;
          td.innerHTML = '&nbsp;';
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
  }

  /**
   * 기존 table 에 변경된 options 을 적용한다 (표 속성 편집).
   * 셀 구조(행/열 수)는 변경하지 않는다.
   */
  static applyOptions(table: HTMLTableElement, options: Partial<TableOptions>): void {
    const {
      width, height, border, marginLeft, align,
      borderColor, bgColor, id, className,
      caption, captionVisible, summary,
    } = options;

    table.style.tableLayout = 'fixed';
    table.style.wordBreak   = 'break-word';
    if (width !== undefined)  table.style.width  = width;
    if (height !== undefined) table.style.height = height || '';
    if (bgColor !== undefined) table.style.backgroundColor = bgColor || '';
    if (id !== undefined)        table.id        = id || '';
    if (className !== undefined) table.className = className || '';

    // ── 정렬 / 왼쪽 여백 ──────────────────────────────────────────
    if (align !== undefined) {
      table.style.marginLeft  = '';
      table.style.marginRight = '';
      if (align === 'center') {
        table.style.marginLeft  = 'auto';
        table.style.marginRight = 'auto';
      } else if (align === 'right') {
        table.style.marginLeft  = 'auto';
        table.style.marginRight = '0';
      } else if ((marginLeft ?? 0) > 0) {
        table.style.marginLeft = `${marginLeft}px`;
      }
    } else if (marginLeft !== undefined) {
      table.style.marginLeft = marginLeft > 0 ? `${marginLeft}px` : '';
    }

    // ── 테두리 ────────────────────────────────────────────────────
    if (border !== undefined) {
      if (border > 0) table.setAttribute('border', String(border));
      else table.removeAttribute('border');
    }
    if (borderColor !== undefined) {
      const bw = border ?? (parseInt(table.getAttribute('border') || '1', 10) || 1);
      const bStyle = bw > 0 ? `${bw}px solid ${borderColor}` : 'none';
      for (const cell of Array.from(table.querySelectorAll<HTMLElement>('td, th'))) {
        cell.style.border = bStyle;
      }
    }

    // ── Summary ───────────────────────────────────────────────────
    if (summary !== undefined) {
      if (summary.trim()) table.setAttribute('summary', summary.trim());
      else table.removeAttribute('summary');
    }

    // ── 캡션 ──────────────────────────────────────────────────────
    if (caption !== undefined || captionVisible !== undefined) {
      let capEl = table.querySelector('caption');
      const newText    = caption ?? capEl?.textContent ?? '';
      const wasHidden  = capEl ? capEl.style.display === 'none' : false;
      const nowVisible = captionVisible ?? !wasHidden;

      if (newText.trim()) {
        if (!capEl) {
          capEl = table.ownerDocument.createElement('caption');
          table.insertBefore(capEl, table.firstChild);
        }
        capEl.textContent   = newText.trim();
        capEl.style.display = nowVisible ? '' : 'none';
      } else if (capEl) {
        capEl.remove();
      }
    }
  }

  /** 기존 table 의 현재 속성값을 TableOptions 형태로 읽어 반환한다 */
  static readOptions(table: HTMLTableElement): Partial<TableOptions> {
    const borderAttr = parseInt(table.getAttribute('border') ?? '1', 10);

    let align: 'left' | 'center' | 'right' = 'left';
    if (table.style.marginLeft === 'auto' && table.style.marginRight === 'auto') align = 'center';
    else if (table.style.marginLeft === 'auto') align = 'right';

    const capEl = table.querySelector('caption');

    const firstCell = table.querySelector<HTMLElement>('td, th');
    let borderColor = '#000000';
    if (firstCell) {
      const m = firstCell.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i);
      if (m) borderColor = m[1];
    }

    let headerPosition: HeaderPosition = 'none';
    if (table.querySelector('thead')) headerPosition = 'top';
    else if (table.querySelector('tbody tr:first-child th')) headerPosition = 'left';

    const mlPx = parseFloat(table.style.marginLeft) || 0;

    return {
      width:          table.style.width       || table.getAttribute('width') || '',
      height:         table.style.height      || '',
      border:         isNaN(borderAttr) ? 1 : borderAttr,
      marginLeft:     align === 'left' ? mlPx : 0,
      align,
      headerPosition,
      borderColor,
      bgColor:        table.style.backgroundColor || '',
      id:             table.id        || '',
      className:      table.className || '',
      caption:        capEl?.textContent?.trim() || '',
      captionVisible: capEl ? capEl.style.display !== 'none' : true,
      summary:        table.getAttribute('summary') || '',
    };
  }

  /**
   * table 을 현재 커서 위치 블록 뒤에 삽입하고, table 아래 빈 단락으로 커서를 이동한다.
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
          const r = ownerDoc.createRange();
          r.setStart(after.firstChild!, 0);
          r.collapse(true);
          sel.removeAllRanges();
          sel.addRange(r);
        } catch { /* detached */ }
        return;
      }
    }
    contentEl.appendChild(table);
    contentEl.appendChild(after);
  }

  private static findBlockAncestor(node: Node, root: HTMLElement): Element | null {
    let cur: Node | null = node;
    while (cur && cur !== root) {
      if (cur.nodeType === Node.ELEMENT_NODE && BLOCK_TAGS.has((cur as Element).tagName.toLowerCase())) {
        return cur as Element;
      }
      cur = cur.parentNode;
    }
    return null;
  }
}
