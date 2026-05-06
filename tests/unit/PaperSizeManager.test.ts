import { describe, it, expect, beforeEach } from 'vitest';
import { PaperSizeManager, PAPER_SIZES } from '../../src/modules/view/PaperSizeManager.js';

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
  let psm: PaperSizeManager;

  beforeEach(() => {
    localStorage.clear();
    ({ editableArea, psm } = makeSetup());
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
});
