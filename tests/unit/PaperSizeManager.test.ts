import { describe, it, expect, beforeEach } from 'vitest';
import { PaperSizeManager, PAPER_SIZES, DEFAULT_MARGIN } from '../../src/modules/view/PaperSizeManager.js';

// ── 헬퍼 ──────────────────────────────────────────────────────────────────

function makeSetup(): { editableArea: HTMLDivElement; wrapperEl: HTMLDivElement; psm: PaperSizeManager } {
  const editableArea = document.createElement('div');
  const wrapperEl    = document.createElement('div');
  document.body.appendChild(wrapperEl);
  wrapperEl.appendChild(editableArea);
  const psm = new PaperSizeManager(editableArea, wrapperEl);
  return { editableArea, wrapperEl, psm };
}

// ── PAPER_SIZES 상수 ─────────────────────────────────────────────────────

describe('PAPER_SIZES', () => {
  it('7가지 용지 크기를 포함한다', () => {
    expect(PAPER_SIZES).toHaveLength(7);
  });

  it('A4가 기본값으로 포함된다', () => {
    const a4 = PAPER_SIZES.find(p => p.id === 'A4');
    expect(a4).toBeDefined();
    expect(a4?.widthPx).toBe(794);
    expect(a4?.heightPx).toBe(1123);
  });
});

// ── PaperSizeManager ─────────────────────────────────────────────────────

describe('PaperSizeManager', () => {
  let editableArea: HTMLDivElement;
  let wrapperEl:    HTMLDivElement;
  let psm: PaperSizeManager;

  beforeEach(() => {
    localStorage.clear();
    ({ editableArea, wrapperEl, psm } = makeSetup());
  });

  it('기본 용지는 A4, 기본 줌은 100이다', () => {
    expect(psm.getSize().id).toBe('A4');
    expect(psm.getZoom()).toBe(100);
  });

  it('init() 호출 후 A4 스타일이 editableArea에 적용된다', () => {
    psm.init();
    expect(editableArea.style.width).toBe('794px');
    expect(editableArea.style.minHeight).toBe('1123px');
    expect(editableArea.style.transform).toBe('scale(1)');
  });

  it('setPaperSize("A3")으로 A3 크기가 적용된다', () => {
    psm.setPaperSize('A3');
    expect(psm.getSize().id).toBe('A3');
    expect(editableArea.style.width).toBe('1123px');
    expect(editableArea.style.minHeight).toBe('1587px');
  });

  it('setZoom(80)으로 80% 줌이 적용된다', () => {
    psm.init();
    psm.setZoom(80);
    expect(psm.getZoom()).toBe(80);
    expect(editableArea.style.transform).toBe('scale(0.8)');
  });

  it('setZoom이 MIN(50) 미만 값을 50으로 클램프한다', () => {
    psm.setZoom(10);
    expect(psm.getZoom()).toBe(50);
  });

  it('setZoom이 MAX(200) 초과 값을 200으로 클램프한다', () => {
    psm.setZoom(300);
    expect(psm.getZoom()).toBe(200);
  });

  it('zoomIn()이 ZOOM_STEP(10) 단위로 확대한다', () => {
    psm.init();
    psm.zoomIn();
    expect(psm.getZoom()).toBe(110);
  });

  it('zoomOut()이 ZOOM_STEP(10) 단위로 축소한다', () => {
    psm.init();
    psm.zoomOut();
    expect(psm.getZoom()).toBe(90);
  });

  it('resetZoom()이 100%로 초기화한다', () => {
    psm.init();
    psm.setZoom(150);
    psm.resetZoom();
    expect(psm.getZoom()).toBe(100);
    expect(editableArea.style.transform).toBe('scale(1)');
  });

  // ── 여백 ─────────────────────────────────────────────────────────
  it('기본 여백은 DEFAULT_MARGIN이다', () => {
    expect(psm.getMargin()).toEqual(DEFAULT_MARGIN);
  });

  it('setMargin()으로 여백이 변경된다', () => {
    psm.setMargin({ top: 10, bottom: 10, left: 15, right: 15 });
    expect(psm.getMargin()).toEqual({ top: 10, bottom: 10, left: 15, right: 15 });
  });

  it('setMargin()은 지정한 필드만 변경하고 나머지는 유지한다', () => {
    psm.setMargin({ top: 40 });
    const m = psm.getMargin();
    expect(m.top).toBe(40);
    expect(m.bottom).toBe(DEFAULT_MARGIN.bottom);
    expect(m.left).toBe(DEFAULT_MARGIN.left);
    expect(m.right).toBe(DEFAULT_MARGIN.right);
  });

  it('setMargin() 후 editableArea padding이 mm→px 변환값을 포함한다', () => {
    psm.setMargin({ top: 25, right: 30, bottom: 25, left: 30 });
    const tPx = Math.round(25 * 3.7795);
    const rPx = Math.round(30 * 3.7795);
    // jsdom이 대칭 shorthand로 압축할 수 있으므로 각 값 포함 여부로 검증
    const padding = editableArea.style.padding;
    expect(padding).toContain(`${tPx}px`);
    expect(padding).toContain(`${rPx}px`);
  });

  it('init() 후 여백이 localStorage에서 복원된다', () => {
    localStorage.setItem('poa-paper-margin', JSON.stringify({ top: 15, right: 20, bottom: 15, left: 20 }));
    const { editableArea: ea2, psm: psm2 } = makeSetup();
    psm2.init();
    expect(psm2.getMargin()).toEqual({ top: 15, right: 20, bottom: 15, left: 20 });
    ea2.remove();
  });

  it('paper-change 이벤트 detail에 margin이 포함된다', () => {
    let detail: Record<string, unknown> | null = null;
    wrapperEl.addEventListener('paper-change', (e) => {
      detail = (e as CustomEvent).detail as Record<string, unknown>;
    });
    psm.setMargin({ top: 20 });
    expect(detail).not.toBeNull();
    expect((detail as Record<string, unknown>)['margin']).toMatchObject({ top: 20 });
  });
});
