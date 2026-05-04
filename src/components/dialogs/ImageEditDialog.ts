import { ImageEditor } from '../../modules/edit/ImageEditor';

const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 1100; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.3);
  width: 520px; max-width: 95vw; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.preview {
  flex: 1; overflow: auto; display: flex;
  align-items: center; justify-content: center;
  background: #f0f0f0; min-height: 200px; padding: 16px;
}
.preview img {
  max-width: 100%; max-height: 400px;
  object-fit: contain; display: block;
}
.loading { color: #888; font-size: 13px; }
.controls {
  display: flex; gap: 8px; padding: 12px 18px;
  border-top: 1px solid #eee; flex-wrap: wrap;
}
.controls button {
  padding: 6px 14px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.controls button:hover { background: #f5f5f5; }
.controls button:disabled { opacity: .4; cursor: default; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 10px 18px; border-top: 1px solid #eee;
}
.btn-apply {
  padding: 7px 18px; border: none; border-radius: 4px;
  background: #1976d2; color: #fff; cursor: pointer; font-size: 13px;
}
.btn-apply:hover { background: #1565c0; }
.btn-apply:disabled { opacity: .5; cursor: default; }
.btn-cancel {
  padding: 7px 18px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.btn-cancel:hover { background: #f5f5f5; }
`;

/**
 * <poa-image-edit-dialog> — Canvas 기반 이미지 편집 다이얼로그.
 *
 * 사용법: dialog.open(originalSrc)
 * 발송 이벤트:
 *   poa-image-edit-confirm  { original: string; edited: string }
 *   poa-image-edit-cancel   {}
 */
export class PoaImageEditDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private editor = new ImageEditor();
  private originalSrc = '';
  private currentDataUrl = '';
  private busy = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="이미지 편집">
    <div class="header">
      <span>이미지 편집</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="preview" id="preview">
      <span class="loading">이미지를 불러오는 중...</span>
    </div>
    <div class="controls">
      <button id="btn-rotate90">↻ 90° 회전</button>
      <button id="btn-flip-h">↔ 좌우 반전</button>
      <button id="btn-flip-v">↕ 상하 반전</button>
      <button id="btn-reset">원본으로</button>
    </div>
    <div class="footer">
      <button class="btn-cancel" id="btn-cancel">취소</button>
      <button class="btn-apply" id="btn-apply">적용</button>
    </div>
  </div>
</div>`;

    this.bindEvents();
  }

  async open(src: string): Promise<void> {
    this.originalSrc = src;
    this.currentDataUrl = src;
    this.setAttribute('open', '');
    await this.renderPreview(src);
    this.shadow.getElementById('btn-close')?.focus();
  }

  private close(): void {
    this.removeAttribute('open');
    this.originalSrc = '';
    this.currentDataUrl = '';
  }

  private bindEvents(): void {
    const s = this.shadow;
    s.getElementById('backdrop')?.addEventListener('click', (e) => {
      if (e.target === s.getElementById('backdrop')) this.onCancel();
    });
    s.getElementById('btn-close')?.addEventListener('click',  () => this.onCancel());
    s.getElementById('btn-cancel')?.addEventListener('click', () => this.onCancel());
    s.getElementById('btn-apply')?.addEventListener('click',  () => this.onApply());

    s.getElementById('btn-rotate90')?.addEventListener('click', () =>
      void this.applyOp(() => this.editor.rotate(this.currentDataUrl, 90)));

    s.getElementById('btn-flip-h')?.addEventListener('click', () =>
      void this.applyOp(() => this.editor.flip(this.currentDataUrl, 'horizontal')));

    s.getElementById('btn-flip-v')?.addEventListener('click', () =>
      void this.applyOp(() => this.editor.flip(this.currentDataUrl, 'vertical')));

    s.getElementById('btn-reset')?.addEventListener('click', async () => {
      this.currentDataUrl = this.originalSrc;
      await this.renderPreview(this.originalSrc);
    });
  }

  private async applyOp(op: () => Promise<string>): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    this.setControlsDisabled(true);
    try {
      this.currentDataUrl = await op();
      await this.renderPreview(this.currentDataUrl);
    } catch {
      // 조작 실패 시 현재 상태 유지
    } finally {
      this.busy = false;
      this.setControlsDisabled(false);
    }
  }

  private async renderPreview(src: string): Promise<void> {
    const preview = this.shadow.getElementById('preview');
    if (!preview) return;
    preview.innerHTML = '<span class="loading">처리 중...</span>';
    const img = document.createElement('img');
    img.alt = '미리보기';
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
    preview.innerHTML = '';
    preview.appendChild(img);
  }

  private setControlsDisabled(disabled: boolean): void {
    const btns = this.shadow.querySelectorAll<HTMLButtonElement>('.controls button, .btn-apply');
    btns.forEach((b) => { b.disabled = disabled; });
  }

  private onApply(): void {
    const original = this.originalSrc;
    const edited   = this.currentDataUrl;
    this.close();
    this.dispatchEvent(
      new CustomEvent('poa-image-edit-confirm', {
        bubbles: true, composed: true,
        detail: { original, edited },
      }),
    );
  }

  private onCancel(): void {
    this.close();
    this.dispatchEvent(
      new CustomEvent('poa-image-edit-cancel', { bubbles: true, composed: true }),
    );
  }
}
