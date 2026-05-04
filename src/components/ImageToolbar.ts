const CSS = `
:host { display: none; }
:host([open]) {
  display: flex; align-items: center; gap: 6px;
  position: fixed; z-index: 1040;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,.18);
  padding: 5px 10px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  pointer-events: all;
  user-select: none;
}
label { color: #555; }
.inp {
  width: 52px; padding: 2px 4px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 12px; text-align: right; outline: none;
}
.inp:focus { border-color: #1976d2; }
.unit { color: #888; margin-right: 4px; }
.sep { width: 1px; height: 18px; background: #e0e0e0; margin: 0 2px; }
.cb-wrap { display: flex; align-items: center; gap: 4px; cursor: pointer; }
.cb-wrap input { margin: 0; cursor: pointer; }
.btn {
  padding: 3px 8px; border: 1px solid #ccc; border-radius: 3px;
  background: #f5f5f5; font-size: 12px; cursor: pointer;
}
.btn:hover { background: #e8e8e8; }
`;

/**
 * <poa-image-toolbar> — 이미지 선택 시 표시되는 인라인 툴바.
 *
 * 발송 이벤트 (bubbles + composed):
 *   poa-img-size-change  { width: number; height: number }
 *   poa-img-reset-size   (detail 없음)
 *
 * 사용법:
 *   toolbar.show(img);   // 이미지 클릭 시
 *   toolbar.update(img); // 드래그 중 입력값 갱신
 *   toolbar.hide();      // 선택 해제 시
 */
export class PoaImageToolbar extends HTMLElement {
  private shadow: ShadowRoot;
  private img: HTMLImageElement | null = null;
  private aspectLocked = false;
  private naturalW = 0;
  private naturalH = 0;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<label>너비</label>
<input class="inp" id="inp-w" type="number" min="20" max="9999">
<span class="unit">px</span>
<label>높이</label>
<input class="inp" id="inp-h" type="number" min="20" max="9999">
<span class="unit">px</span>
<div class="sep"></div>
<label class="cb-wrap">
  <input type="checkbox" id="cb-ratio">비율고정
</label>
<div class="sep"></div>
<button class="btn" id="btn-reset">원본크기</button>`;

    this.bindEvents();
  }

  /** 이미지 선택 시 툴바를 표시한다 */
  show(img: HTMLImageElement): void {
    this.img = img;
    // naturalWidth는 이미지가 로드됐을 때만 유효 — 로드 중이면 현재 렌더 크기로 fallback
    this.naturalW = img.naturalWidth  || Math.round(img.getBoundingClientRect().width);
    this.naturalH = img.naturalHeight || Math.round(img.getBoundingClientRect().height);
    this.aspectLocked = false;
    (this.shadow.getElementById('cb-ratio') as HTMLInputElement).checked = false;
    this.setAttribute('open', '');
    this.updateInputsFromImg();
    this.positionNear(img);
  }

  /** 드래그 중 입력값과 위치를 갱신한다 */
  update(img: HTMLImageElement): void {
    if (this.img !== img) return;
    this.updateInputsFromImg();
    this.positionNear(img);
  }

  /** 툴바를 숨긴다 */
  hide(): void {
    this.img = null;
    this.removeAttribute('open');
  }

  // ── private ────────────────────────────────────────────────────────────────

  private bindEvents(): void {
    const s = this.shadow;
    const inpW = s.getElementById('inp-w') as HTMLInputElement;
    const inpH = s.getElementById('inp-h') as HTMLInputElement;
    const cbRatio = s.getElementById('cb-ratio') as HTMLInputElement;
    const btnReset = s.getElementById('btn-reset') as HTMLButtonElement;

    cbRatio.addEventListener('change', () => {
      this.aspectLocked = cbRatio.checked;
    });

    inpW.addEventListener('change', () => this.onWidthChange(inpW));
    inpH.addEventListener('change', () => this.onHeightChange(inpH));

    // Enter 키로도 즉시 적용
    inpW.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.onWidthChange(inpW); });
    inpH.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.onHeightChange(inpH); });

    // mousedown 시 selection 손실 방지
    this.shadow.addEventListener('mousedown', (e) => e.stopPropagation());

    btnReset.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('poa-img-reset-size', { bubbles: true, composed: true }));
    });
  }

  private onWidthChange(inpW: HTMLInputElement): void {
    if (!this.img) return;
    let w = parseInt(inpW.value, 10);
    if (isNaN(w) || w < 20) { w = 20; inpW.value = '20'; }

    let h: number;
    if (this.aspectLocked && this.naturalW > 0 && this.naturalH > 0) {
      const current = Math.round(parseFloat(this.img.style.height) || this.img.getBoundingClientRect().height);
      const currentW = Math.round(parseFloat(this.img.style.width)  || this.img.getBoundingClientRect().width);
      const ratio = currentW > 0 ? current / currentW : this.naturalH / this.naturalW;
      h = Math.max(20, Math.round(w * ratio));
      (this.shadow.getElementById('inp-h') as HTMLInputElement).value = String(h);
    } else {
      h = Math.round(parseFloat(this.img.style.height) || this.img.getBoundingClientRect().height);
    }

    this.dispatchEvent(new CustomEvent('poa-img-size-change', {
      bubbles: true, composed: true, detail: { width: w, height: h },
    }));
  }

  private onHeightChange(inpH: HTMLInputElement): void {
    if (!this.img) return;
    let h = parseInt(inpH.value, 10);
    if (isNaN(h) || h < 20) { h = 20; inpH.value = '20'; }

    let w: number;
    if (this.aspectLocked && this.naturalW > 0 && this.naturalH > 0) {
      const currentH = Math.round(parseFloat(this.img.style.height) || this.img.getBoundingClientRect().height);
      const currentW = Math.round(parseFloat(this.img.style.width)  || this.img.getBoundingClientRect().width);
      const ratio = currentH > 0 ? currentW / currentH : this.naturalW / this.naturalH;
      w = Math.max(20, Math.round(h * ratio));
      (this.shadow.getElementById('inp-w') as HTMLInputElement).value = String(w);
    } else {
      w = Math.round(parseFloat(this.img.style.width) || this.img.getBoundingClientRect().width);
    }

    this.dispatchEvent(new CustomEvent('poa-img-size-change', {
      bubbles: true, composed: true, detail: { width: w, height: h },
    }));
  }

  private updateInputsFromImg(): void {
    if (!this.img) return;
    const rect = this.img.getBoundingClientRect();
    const w = Math.round(parseFloat(this.img.style.width)  || rect.width);
    const h = Math.round(parseFloat(this.img.style.height) || rect.height);
    (this.shadow.getElementById('inp-w') as HTMLInputElement).value = String(w);
    (this.shadow.getElementById('inp-h') as HTMLInputElement).value = String(h);
  }

  private positionNear(img: HTMLImageElement): void {
    const rect = img.getBoundingClientRect();
    // 이미지 하단에 툴바 표시, 화면 하단 잘림 방지
    const toolbarH = 36;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > toolbarH + 10
      ? rect.bottom + 6
      : rect.top - toolbarH - 6;
    this.style.top  = `${Math.max(0, top)}px`;
    this.style.left = `${Math.max(0, rect.left)}px`;
  }
}
