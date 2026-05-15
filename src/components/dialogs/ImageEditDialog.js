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
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 8px 18px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666;
  border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.tab-content { display: none; flex: 1; flex-direction: column; overflow: hidden; }
.tab-content.active { display: flex; }
.preview {
  flex: 1; overflow: auto; display: flex;
  align-items: center; justify-content: center;
  background: #f0f0f0; min-height: 180px; padding: 12px;
}
.preview img { max-width: 100%; max-height: 360px; object-fit: contain; display: block; }
.loading { color: #888; font-size: 13px; }
.controls {
  display: flex; gap: 8px; padding: 10px 18px;
  border-top: 1px solid #eee; flex-wrap: wrap;
}
.controls button {
  padding: 5px 12px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 12px;
}
.controls button:hover { background: #f5f5f5; }
.controls button:disabled { opacity: .4; cursor: default; }
.props { padding: 14px 18px; overflow-y: auto; flex: 1; }
.field { margin-bottom: 11px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 3px; font-weight: 500; }
.field input, .field select {
  width: 100%; box-sizing: border-box;
  padding: 5px 8px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 10px 18px; border-top: 1px solid #eee;
}
.btn-cancel {
  padding: 7px 18px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.btn-cancel:hover { background: #f5f5f5; }
.btn-apply {
  padding: 7px 18px; border: none; border-radius: 4px;
  background: #1976d2; color: #fff; cursor: pointer; font-size: 13px;
}
.btn-apply:hover { background: #1565c0; }
.btn-apply:disabled { opacity: .5; cursor: default; }
`;
/**
 * <poa-image-edit-dialog> — Canvas 기반 이미지 편집 + 속성 편집 다이얼로그.
 *
 * 탭 1 — 이미지 편집: 90° 회전, 좌우/상하 반전, 원본 복원
 * 탭 2 — 속성: alt/title/width/height/border/align/ID/Class
 *
 * 발송 이벤트 (bubbles + composed):
 *   poa-image-edit-confirm  { original: string; edited: string; attrs: Partial<ImageAttributes> }
 *   poa-image-edit-cancel   {}
 */
export class PoaImageEditDialog extends HTMLElement {
    shadow;
    editor = new ImageEditor();
    originalSrc = '';
    currentDataUrl = '';
    busy = false;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="이미지 편집">
    <div class="header">
      <span>이미지 편집</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="canvas">이미지 편집</button>
      <button class="tab-btn" data-tab="props">속성</button>
    </div>

    <!-- 이미지 편집 탭 -->
    <div class="tab-content active" id="tc-canvas">
      <div class="preview" id="preview">
        <span class="loading">이미지를 불러오는 중...</span>
      </div>
      <div class="controls">
        <button id="btn-rotate90">↻ 90° 회전</button>
        <button id="btn-flip-h">↔ 좌우 반전</button>
        <button id="btn-flip-v">↕ 상하 반전</button>
        <button id="btn-reset">원본으로</button>
      </div>
    </div>

    <!-- 속성 탭 -->
    <div class="tab-content" id="tc-props">
      <div class="props">
        <div class="field">
          <label>대체 텍스트 (alt) *</label>
          <input id="p-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
          <div class="err" id="err-p-alt">alt 텍스트를 입력하세요.</div>
        </div>
        <div class="field">
          <label>title</label>
          <input id="p-title" type="text">
        </div>
        <div class="row3">
          <div class="field">
            <label>가로 (width)</label>
            <input id="p-width" type="text" placeholder="200px">
          </div>
          <div class="field">
            <label>세로 (height)</label>
            <input id="p-height" type="text" placeholder="auto">
          </div>
          <div class="field">
            <label>테두리 (border)</label>
            <input id="p-border" type="text" placeholder="1px solid">
          </div>
        </div>
        <div class="row3">
          <div class="field">
            <label>정렬 (align)</label>
            <select id="p-align">
              <option value="">기본</option>
              <option value="left">왼쪽</option>
              <option value="right">오른쪽</option>
            </select>
          </div>
          <div class="field">
            <label>ID</label>
            <input id="p-id" type="text">
          </div>
          <div class="field">
            <label>클래스 (class)</label>
            <input id="p-class" type="text">
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn-cancel" id="btn-cancel">취소</button>
      <button class="btn-apply" id="btn-apply">적용</button>
    </div>
  </div>
</div>`;
        this.bindEvents();
    }
    async open(src, existingAttrs) {
        this.originalSrc = src;
        this.currentDataUrl = src;
        this.busy = false;
        this.switchTab('canvas');
        if (existingAttrs)
            this.fillProps(existingAttrs);
        this.setAttribute('open', '');
        await this.renderPreview(src);
        this.shadow.getElementById('btn-close')?.focus();
    }
    close() {
        this.removeAttribute('open');
        this.originalSrc = '';
        this.currentDataUrl = '';
    }
    switchTab(tab) {
        const s = this.shadow;
        s.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
        s.getElementById('tc-canvas')?.classList.toggle('active', tab === 'canvas');
        s.getElementById('tc-props')?.classList.toggle('active', tab === 'props');
    }
    fillProps(attrs) {
        const val = (id, v) => {
            this.shadow.getElementById(id).value = v ?? '';
        };
        val('p-alt', attrs.alt);
        val('p-title', attrs.title);
        val('p-width', attrs.width);
        val('p-height', attrs.height);
        val('p-border', attrs.border);
        val('p-id', attrs.id);
        val('p-class', attrs.className);
        this.shadow.getElementById('p-align').value = attrs.align ?? '';
        this.shadow.getElementById('err-p-alt')?.classList.remove('show');
    }
    bindEvents() {
        const s = this.shadow;
        s.getElementById('backdrop')?.addEventListener('click', (e) => {
            if (e.target === s.getElementById('backdrop'))
                this.onCancel();
        });
        s.getElementById('btn-close')?.addEventListener('click', () => this.onCancel());
        s.getElementById('btn-cancel')?.addEventListener('click', () => this.onCancel());
        s.getElementById('btn-apply')?.addEventListener('click', () => this.onApply());
        s.querySelectorAll('.tab-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        s.getElementById('btn-rotate90')?.addEventListener('click', () => void this.applyOp(() => this.editor.rotate(this.currentDataUrl, 90)));
        s.getElementById('btn-flip-h')?.addEventListener('click', () => void this.applyOp(() => this.editor.flip(this.currentDataUrl, 'horizontal')));
        s.getElementById('btn-flip-v')?.addEventListener('click', () => void this.applyOp(() => this.editor.flip(this.currentDataUrl, 'vertical')));
        s.getElementById('btn-reset')?.addEventListener('click', async () => {
            this.currentDataUrl = this.originalSrc;
            await this.renderPreview(this.originalSrc);
        });
    }
    async applyOp(op) {
        if (this.busy)
            return;
        this.busy = true;
        this.setControlsDisabled(true);
        try {
            this.currentDataUrl = await op();
            await this.renderPreview(this.currentDataUrl);
        }
        catch {
            // 조작 실패 시 현재 상태 유지
        }
        finally {
            this.busy = false;
            this.setControlsDisabled(false);
        }
    }
    async renderPreview(src) {
        const preview = this.shadow.getElementById('preview');
        if (!preview)
            return;
        preview.innerHTML = '<span class="loading">처리 중...</span>';
        const img = document.createElement('img');
        img.alt = '미리보기';
        await new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
        });
        preview.innerHTML = '';
        preview.appendChild(img);
    }
    setControlsDisabled(disabled) {
        this.shadow.querySelectorAll('.controls button, .btn-apply')
            .forEach((b) => { b.disabled = disabled; });
    }
    readProps() {
        const v = (id) => this.shadow.getElementById(id).value.trim();
        return {
            alt: v('p-alt') || undefined,
            title: v('p-title') || undefined,
            width: v('p-width') || undefined,
            height: v('p-height') || undefined,
            border: v('p-border') || undefined,
            align: this.shadow.getElementById('p-align').value || undefined,
            id: v('p-id') || undefined,
            className: v('p-class') || undefined,
        };
    }
    onApply() {
        const props = this.readProps();
        // 속성 탭이 활성화된 경우 alt 필수 검증
        const isPropsActive = this.shadow.getElementById('tc-props')?.classList.contains('active');
        if (isPropsActive && !props.alt) {
            this.shadow.getElementById('err-p-alt').classList.add('show');
            this.shadow.getElementById('p-alt').focus();
            return;
        }
        const original = this.originalSrc;
        const edited = this.currentDataUrl;
        this.close();
        this.dispatchEvent(new CustomEvent('poa-image-edit-confirm', {
            bubbles: true, composed: true,
            detail: { original, edited, attrs: props },
        }));
    }
    onCancel() {
        this.close();
        this.dispatchEvent(new CustomEvent('poa-image-edit-cancel', { bubbles: true, composed: true }));
    }
}
