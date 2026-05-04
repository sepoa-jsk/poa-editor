import type { TableOptions } from './TableBuilder.js';

export interface TablePreset {
  id: string;
  label: string;
  icon: string;
  baseOptions: Partial<TableOptions>;
  apply: (table: HTMLTableElement) => void;
}

const PAD = 'padding:6px 8px;overflow:hidden;word-break:break-word;';

function allCells(table: HTMLTableElement): HTMLElement[] {
  return Array.from(table.querySelectorAll<HTMLElement>('td,th'));
}
function theadCells(table: HTMLTableElement): HTMLElement[] {
  return Array.from(table.querySelectorAll<HTMLElement>('thead td,thead th'));
}
function tbodyRows(table: HTMLTableElement): HTMLTableRowElement[] {
  return Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr'));
}

// ── SVG 헬퍼 ───────────────────────────────────────────────────────────
// 3×3 미니 표 아이콘: x=3~37, y=3~37 / 수직 x=14,25 / 수평 y=14,25

function svg(inner: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">${inner}</svg>`;
}

const ICONS: Record<string, string> = {
  'border-all': svg(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#bbb" stroke-width="1"/>`),

  'border-thick': svg(`
    <rect x="2" y="2" width="36" height="36" fill="#fff" stroke="#444" stroke-width="2"/>
    <line x1="14" y1="2" x2="14" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="26" y1="2" x2="26" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="13" x2="38" y2="13" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="25" x2="38" y2="25" stroke="#aaa" stroke-width="1"/>`),

  'header-light': svg(`
    <rect x="3" y="3"  width="34" height="11" fill="#f0f0f0" stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ccc" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ccc" stroke-width="1"/>`),

  'header-dark': svg(`
    <rect x="3" y="3"  width="34" height="11" fill="#333" stroke="#333" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#888" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#888" stroke-width="1"/>`),

  'stripe-light': svg(`
    <rect x="3" y="3"  width="34" height="11" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ddd" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ddd" stroke-width="1"/>`),

  'stripe-dark': svg(`
    <rect x="3" y="3"  width="34" height="11" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>`),

  'borderless': svg(`
    <rect x="3" y="3" width="34" height="34" fill="#fafafa" stroke="#e0e0e0"
          stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>`),

  'dashed': svg(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#999"
          stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>`),
};

export const TABLE_PRESETS: TablePreset[] = [
  {
    id: 'border-all',
    label: '전체 테두리',
    icon: ICONS['border-all']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#cccccc', headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #ccc;${PAD}`;
    },
  },
  {
    id: 'border-thick',
    label: '굵은 외부',
    icon: ICONS['border-thick']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#aaaaaa', headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #aaa;${PAD}`;
      table.style.boxShadow = '0 0 0 2px #333333';
    },
  },
  {
    id: 'header-light',
    label: '헤더 강조',
    icon: ICONS['header-light']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#cccccc', headerPosition: 'top' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #ccc;${PAD}`;
      for (const c of theadCells(table))
        c.style.cssText = `border:1px solid #ccc;${PAD}background:#f0f0f0;font-weight:bold;`;
    },
  },
  {
    id: 'header-dark',
    label: '헤더 진한',
    icon: ICONS['header-dark']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#aaaaaa', headerPosition: 'top' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #aaa;${PAD}`;
      for (const c of theadCells(table))
        c.style.cssText = `border:1px solid #555;${PAD}background:#333333;color:#ffffff;font-weight:bold;`;
    },
  },
  {
    id: 'stripe-light',
    label: '줄무늬',
    icon: ICONS['stripe-light']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#dddddd', headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #ddd;${PAD}`;
      tbodyRows(table).forEach((tr, i) => {
        const bg = i % 2 === 0 ? '#f9f9f9' : '';
        for (const c of Array.from(tr.querySelectorAll<HTMLElement>('td,th')))
          c.style.backgroundColor = bg;
      });
    },
  },
  {
    id: 'stripe-dark',
    label: '진한 줄무늬',
    icon: ICONS['stripe-dark']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#bbbbbb', headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px solid #bbb;${PAD}`;
      tbodyRows(table).forEach((tr, i) => {
        const bg = i % 2 === 0 ? '#e0e0e0' : '';
        for (const c of Array.from(tr.querySelectorAll<HTMLElement>('td,th')))
          c.style.backgroundColor = bg;
      });
    },
  },
  {
    id: 'borderless',
    label: '테두리 없음',
    icon: ICONS['borderless']!,
    baseOptions: { width: '100%', border: 0, headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:none;${PAD}`;
      table.removeAttribute('border');
    },
  },
  {
    id: 'dashed',
    label: '점선 테두리',
    icon: ICONS['dashed']!,
    baseOptions: { width: '100%', border: 1, borderColor: '#999999', headerPosition: 'none' },
    apply: (table) => {
      for (const c of allCells(table)) c.style.cssText = `border:1px dashed #999;${PAD}`;
    },
  },
];

export function applyPreset(presetId: string, table: HTMLTableElement): void {
  TABLE_PRESETS.find(p => p.id === presetId)?.apply(table);
}
