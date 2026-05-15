// ── 내부 유틸 ──────────────────────────────────────────────────────────────────
let tableIdSeq = 0;
export function ensureTableId(table) {
    if (!table.dataset.formulaTableId) {
        table.dataset.formulaTableId = `ftbl-${++tableIdSeq}`;
    }
    return table.dataset.formulaTableId;
}
export function getCellAt(table, row, col) {
    const rows = Array.from(table.querySelectorAll('tr'));
    if (row < 1 || row > rows.length)
        return null;
    const cells = Array.from(rows[row - 1].querySelectorAll('td, th'));
    if (col < 1 || col > cells.length)
        return null;
    return cells[col - 1];
}
export function getCellPosition(table, cell) {
    const rows = Array.from(table.querySelectorAll('tr'));
    for (let r = 0; r < rows.length; r++) {
        const cells = Array.from(rows[r].querySelectorAll('td, th'));
        const c = cells.indexOf(cell);
        if (c !== -1)
            return { row: r + 1, col: c + 1 };
    }
    return null;
}
function parseCellNumber(cell) {
    const text = cell.textContent?.trim() ?? '';
    // 통화·퍼센트 기호, 쉼표 제거 후 파싱
    const n = parseFloat(text.replace(/[₩%,\s]/g, ''));
    return isNaN(n) ? 0 : n;
}
function extractRangeValues(table, startRow, startCol, endRow, endCol, skipCell) {
    const values = [];
    const r1 = Math.min(startRow, endRow), r2 = Math.max(startRow, endRow);
    const c1 = Math.min(startCol, endCol), c2 = Math.max(startCol, endCol);
    for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
            const cell = getCellAt(table, r, c);
            if (!cell || cell === skipCell)
                continue;
            values.push(parseCellNumber(cell));
        }
    }
    return values;
}
function isCircularRef(formula) {
    const [sr, sc, er, ec] = formula.range;
    const { targetRow: tr, targetCol: tc } = formula;
    return tr >= Math.min(sr, er) && tr <= Math.max(sr, er)
        && tc >= Math.min(sc, ec) && tc <= Math.max(sc, ec);
}
// ── 공개 계산/포맷 헬퍼 (테스트에서도 사용) ────────────────────────────────────
/** 주어진 값 배열에 함수를 적용해 숫자를 반환한다 */
export function calculate(fn, values) {
    if (values.length === 0)
        return 0;
    switch (fn) {
        case 'SUM':
            return values.reduce((a, b) => a + b, 0);
        case 'AVERAGE':
            return values.reduce((a, b) => a + b, 0) / values.length;
        case 'PRODUCT':
            return values.reduce((a, b) => a * b, 1);
        case 'SUBTRACT':
            return values.slice(1).reduce((a, b) => a - b, values[0]);
    }
}
/** 계산 결과를 지정된 포맷 문자열로 변환한다 */
export function formatResult(value, format, decimalPlaces = 2) {
    switch (format) {
        case 'integer':
            return String(Math.round(value));
        case 'decimal':
            return value.toFixed(decimalPlaces);
        case 'currency':
            return '₩' + Math.round(value).toLocaleString('ko-KR');
        case 'percent':
            return value.toFixed(1) + '%';
    }
}
// ── 메인 클래스 ────────────────────────────────────────────────────────────────
/**
 * 표 계산식 관리자.
 * - 계산식을 결과 셀의 data-formula 속성에 직렬화하여 저장
 * - MutationObserver로 셀 변경을 감지하고 자동 재계산
 * - 표당 Observer 1개만 등록 (중복 방지)
 * - DOM 쓰기 전 disconnect / 쓰기 후 reconnect 로 무한 루프 방지
 */
export class TableFormulaManager {
    observers = new Map();
    static OBS_CONFIG = {
        subtree: true,
        characterData: true,
        childList: true,
    };
    /** 표에 MutationObserver 등록 (이미 등록됐으면 무시) */
    attach(table) {
        const id = ensureTableId(table);
        if (this.observers.has(id))
            return;
        const obs = new MutationObserver(() => this.recalculateTable(table));
        obs.observe(table, TableFormulaManager.OBS_CONFIG);
        this.observers.set(id, obs);
    }
    /** 특정 표의 Observer 해제 */
    detach(table) {
        const id = table.dataset.formulaTableId;
        if (!id)
            return;
        this.observers.get(id)?.disconnect();
        this.observers.delete(id);
    }
    /** 등록된 모든 Observer 해제 */
    detachAll() {
        this.observers.forEach(o => o.disconnect());
        this.observers.clear();
    }
    /**
     * 계산식을 적용하고 결과를 대상 셀에 출력한다.
     * @returns 'ok' | 'circular' | 'invalid'
     */
    applyFormula(table, formula) {
        this.attach(table);
        const targetCell = getCellAt(table, formula.targetRow, formula.targetCol);
        if (!targetCell)
            return 'invalid';
        const obs = this.observers.get(ensureTableId(table));
        if (isCircularRef(formula)) {
            obs?.disconnect();
            targetCell.textContent = '#REF!';
            targetCell.style.color = '#DC2626';
            targetCell.dataset.formula = JSON.stringify(formula);
            obs?.observe(table, TableFormulaManager.OBS_CONFIG);
            return 'circular';
        }
        const [sr, sc, er, ec] = formula.range;
        // 범위 유효성 검사
        const rows = table.querySelectorAll('tr');
        if (sr < 1 || er > rows.length || sc < 1)
            return 'invalid';
        const values = extractRangeValues(table, sr, sc, er, ec, targetCell);
        const result = calculate(formula.fn, values);
        const formatted = formatResult(result, formula.format, formula.decimalPlaces);
        // Observer를 일시 해제한 상태에서 DOM 쓰기 → 콜백 미발생
        obs?.disconnect();
        try {
            targetCell.textContent = formatted;
            targetCell.dataset.formula = JSON.stringify(formula);
            if (formula.style?.backgroundColor)
                targetCell.style.backgroundColor = formula.style.backgroundColor;
            if (formula.style?.color)
                targetCell.style.color = formula.style.color;
        }
        finally {
            obs?.observe(table, TableFormulaManager.OBS_CONFIG);
        }
        return 'ok';
    }
    /** 표 내 data-formula 셀을 모두 재계산한다 */
    recalculateTable(table) {
        const id = ensureTableId(table);
        const obs = this.observers.get(id);
        // DOM 쓰기 전 감지 중단 → 재진입·무한 루프 원천 차단
        obs?.disconnect();
        try {
            table.querySelectorAll('[data-formula]').forEach(cell => {
                try {
                    const formula = JSON.parse(cell.dataset.formula);
                    const pos = getCellPosition(table, cell);
                    if (!pos)
                        return;
                    formula.targetRow = pos.row;
                    formula.targetCol = pos.col;
                    if (isCircularRef(formula)) {
                        cell.textContent = '#REF!';
                        cell.style.color = '#DC2626';
                        return;
                    }
                    const [sr, sc, er, ec] = formula.range;
                    cell.textContent = formatResult(calculate(formula.fn, extractRangeValues(table, sr, sc, er, ec, cell)), formula.format, formula.decimalPlaces);
                    if (cell.style.color === 'rgb(220, 38, 38)')
                        cell.style.color = '';
                }
                catch { /* data-formula JSON 파싱 실패 무시 */ }
            });
        }
        finally {
            obs?.observe(table, TableFormulaManager.OBS_CONFIG);
        }
    }
    /** 셀 목록의 행/열 경계 좌표 반환 (드래그 범위 선택용) */
    static getSelectionBounds(table, cells) {
        if (cells.length === 0)
            return null;
        let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
        for (const cell of cells) {
            const pos = getCellPosition(table, cell);
            if (!pos)
                continue;
            minR = Math.min(minR, pos.row);
            minC = Math.min(minC, pos.col);
            maxR = Math.max(maxR, pos.row);
            maxC = Math.max(maxC, pos.col);
        }
        return minR === Infinity ? null : [minR, minC, maxR, maxC];
    }
}
