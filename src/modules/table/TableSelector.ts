import { buildGridMap } from './CellMerger.js';
import type { CellMerger } from './CellMerger.js';

type SelState = 'drag' | 'ok' | 'bad';

/**
 * 표 셀 드래그 다중 선택.
 * - mousedown → mousemove → mouseup 체인으로 범위 선택
 * - 직사각형(병합 가능): 녹색(poa-cell-sel-ok)
 * - 비직사각형: 빨간색(poa-cell-sel-bad)
 * - 드래그 중: 파란색(poa-cell-selected)
 * CellMerger 인스턴스와 연동하여 앵커·범위를 공유한다.
 */
export class TableSelector {
  private contentEl: HTMLElement | null = null;
  private merger: CellMerger;

  private anchor: HTMLTableCellElement | null = null;
  private isDragging = false;

  constructor(merger: CellMerger) {
    this.merger = merger;
  }

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('mousedown', this.mdownHandler);
    document.addEventListener('mousemove',  this.mmoveHandler);
    document.addEventListener('mouseup',    this.mupHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('mousedown', this.mdownHandler);
      this.contentEl = null;
    }
    document.removeEventListener('mousemove', this.mmoveHandler);
    document.removeEventListener('mouseup',   this.mupHandler);
    this.anchor = null;
    this.isDragging = false;
  }

  // ── 이벤트 핸들러 ────────────────────────────────────────────────

  private readonly mdownHandler = (e: MouseEvent): void => {
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    // 우클릭 · resize 커서 시 무시
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).style?.cursor?.includes('resize')) return;

    this.anchor     = cell;
    this.isDragging = false;
    // CellMerger 앵커도 동기화
    this.merger.setAnchor(cell);
    this.applyFeedback('drag');
  };

  private readonly mmoveHandler = (e: MouseEvent): void => {
    if (!this.anchor || e.buttons !== 1) return;
    const target = this.findCellAt(e.clientX, e.clientY);
    if (!target) return;

    const table = this.anchor.closest('table') as HTMLTableElement | null;
    if (!table || target.closest('table') !== table) return;

    if (!this.isDragging && target !== this.anchor) {
      this.isDragging = true;
    }
    if (!this.isDragging) return;

    this.merger.selectTo(target);
    const state = this.isRectangular() ? 'ok' : 'bad';
    this.applyFeedback(state);
  };

  private readonly mupHandler = (): void => {
    if (!this.isDragging) { this.anchor = null; return; }
    this.isDragging = false;
    // 최종 상태 색상 유지
    const state = this.isRectangular() ? 'ok' : 'bad';
    this.applyFeedback(state);
    this.anchor = null;
  };

  // ── 직사각형 검증 ────────────────────────────────────────────────

  private isRectangular(): boolean {
    const cells = this.merger.getSelectedCells();
    const table = this.merger.getSelectedTable();
    if (!table || cells.length < 2) return true;

    const grid    = buildGridMap(table);
    const cellSet = new Set(cells);
    let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && cellSet.has(gc.cell)) {
          if (r < minR) minR = r;
          if (r > maxR) maxR = r;
          if (c < minC) minC = c;
          if (c > maxC) maxC = c;
        }
      }
    }
    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const gc = grid[r]?.[c];
        if (!gc || !cellSet.has(gc.cell)) return false;
      }
    }
    return true;
  }

  // ── 시각적 피드백 ────────────────────────────────────────────────

  private applyFeedback(state: SelState): void {
    const cells = this.merger.getSelectedCells();
    for (const cell of cells) {
      cell.classList.remove('poa-cell-selected', 'poa-cell-sel-ok', 'poa-cell-sel-bad');
      if (state === 'drag')  cell.classList.add('poa-cell-selected');
      if (state === 'ok')    cell.classList.add('poa-cell-sel-ok');
      if (state === 'bad')   cell.classList.add('poa-cell-sel-bad');
    }
  }

  // ── 외부 API ────────────────────────────────────────────────────

  /** 현재 선택 유효(직사각형)한지 여부 */
  get canMerge(): boolean {
    return this.merger.getSelectedCells().length >= 2 && this.isRectangular();
  }

  /** 현재 선택된 셀 목록을 반환한다 */
  getCellSelection(): HTMLTableCellElement[] {
    return this.merger.getSelectedCells();
  }

  // ── 헬퍼 ────────────────────────────────────────────────────────

  private findCell(node: Node): HTMLTableCellElement | null {
    let cur: Node | null = node;
    while (cur) {
      if (cur.nodeType === Node.ELEMENT_NODE) {
        const tag = (cur as Element).tagName.toLowerCase();
        if (tag === 'td' || tag === 'th') return cur as HTMLTableCellElement;
        if (tag === 'table') break;
      }
      cur = cur.parentNode;
    }
    return null;
  }

  private findCellAt(x: number, y: number): HTMLTableCellElement | null {
    const el = document.elementFromPoint(x, y);
    return el ? this.findCell(el) : null;
  }
}
