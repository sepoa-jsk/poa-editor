import { MultiImageUploader } from '../../modules/insert/MultiImageUploader';
const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 1050; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 540px; max-width: 96vw; max-height: 88vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 20px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 9px 20px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666; border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.body { flex: 1; overflow-y: auto; padding: 16px 20px; }
.panel { display: none; }
.panel.active { display: block; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 4px; font-weight: 500; }
.field input, .field select {
  width: 100%; box-sizing: border-box;
  padding: 6px 9px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.preview-box {
  margin-top: 10px; text-align: center; background: #f5f5f5;
  border-radius: 4px; padding: 10px; min-height: 60px;
  display: none;
}
.preview-box.show { display: block; }
.preview-box img { max-width: 100%; max-height: 160px; object-fit: contain; }
.file-drop {
  border: 2px dashed #ccc; border-radius: 4px; padding: 20px;
  text-align: center; color: #888; font-size: 13px; cursor: pointer;
  margin-bottom: 12px; transition: border-color .15s;
}
.file-drop:hover { border-color: #1976d2; color: #1976d2; }
.upload-list { list-style: none; margin: 0; padding: 0; }
.upload-item {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px;
}
.upload-item:last-child { border-bottom: none; }
.upload-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.upload-status { font-size: 11px; padding: 2px 6px; border-radius: 2px; white-space: nowrap; }
.status-pending  { background: #eee; color: #666; }
.status-uploading{ background: #e3f2fd; color: #1565c0; }
.status-done     { background: #e8f5e9; color: #2e7d32; }
.status-error    { background: #fce4ec; color: #c62828; }
.upload-errors { color: #c62828; font-size: 12px; margin-top: 8px; }
.upload-errors li { margin: 2px 0; }
.summary { font-size: 12px; color: #666; margin-top: 8px; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 12px 20px; border-top: 1px solid #eee;
}
.btn { padding: 7px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer; font-size: 13px; }
.btn:hover { background: #f5f5f5; }
.btn.primary { border-color: #1976d2; background: #1976d2; color: #fff; }
.btn.primary:hover { background: #1565c0; }
.btn:disabled { opacity: .45; cursor: default; }
#single-attrs { display: none; }
#multi-attrs  { display: none; }
`;
function fmt(bytes) {
    return bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)}KB`
        : `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}
/**
 * <poa-image-dialog> — 이미지 삽입 다이얼로그 (URL · 파일 업로드 탭).
 *
 * 파일 탭 동작:
 *   - 1장 선택 → alt/title/크기 속성 입력 후 삽입 (단일 모드)
 *   - 여러 장 선택 → alt 일괄 입력 + 업로드 큐 UI (다중 모드)
 *
 * 발송 이벤트 (bubbles + composed):
 *   poa-image-insert  { attrs: ImageAttributes }
 */
export class PoaImageDialog extends HTMLElement {
    shadow;
    uploader = new MultiImageUploader();
    uploadConfig = null;
    selectedFiles = [];
    busy = false;
    onErrorFn = null;
    setOnError(fn) {
        this.onErrorFn = fn;
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="이미지 삽입">
    <div class="header">
      <span>이미지 삽입</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="url">URL 입력</button>
      <button class="tab-btn" data-tab="file">파일 업로드</button>
    </div>
    <div class="body">

      <!-- URL 탭 -->
      <div class="panel active" id="panel-url">
        <div class="field">
          <label>이미지 URL *</label>
          <input id="inp-src" type="url" placeholder="https://example.com/image.png">
        </div>
        <div class="field">
          <label>대체 텍스트 (alt) *</label>
          <input id="inp-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
          <div class="err" id="err-alt">alt 텍스트를 입력하세요.</div>
        </div>
        <div class="row2">
          <div class="field">
            <label>title</label>
            <input id="inp-title" type="text">
          </div>
          <div class="field">
            <label>정렬 (align)</label>
            <select id="sel-align">
              <option value="">기본</option>
              <option value="left">왼쪽 float</option>
              <option value="right">오른쪽 float</option>
            </select>
          </div>
        </div>
        <div class="row3">
          <div class="field">
            <label>가로 (width)</label>
            <input id="inp-width" type="text" placeholder="200px">
          </div>
          <div class="field">
            <label>세로 (height)</label>
            <input id="inp-height" type="text" placeholder="auto">
          </div>
          <div class="field">
            <label>테두리 (border)</label>
            <input id="inp-border" type="text" placeholder="1px solid #ccc">
          </div>
        </div>
        <div class="row2">
          <div class="field">
            <label>ID</label>
            <input id="inp-id" type="text">
          </div>
          <div class="field">
            <label>클래스 (class)</label>
            <input id="inp-class" type="text">
          </div>
        </div>
        <div class="preview-box" id="url-preview">
          <img id="preview-img" alt="미리보기" src="">
        </div>
      </div>

      <!-- 파일 업로드 탭 -->
      <div class="panel" id="panel-file">
        <div class="file-drop" id="file-drop" role="button" tabindex="0">
          클릭하거나 파일을 드래그하세요<br>
          <small>jpg · png · gif · webp · svg | 최대 20MB</small>
        </div>
        <input id="inp-file" type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.svg" multiple style="display:none">

        <!-- 단일 파일 속성 입력 (1장 선택 시 표시) -->
        <div id="single-attrs">
          <div class="field">
            <label>대체 텍스트 (alt) *</label>
            <input id="inp-single-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
            <div class="err" id="err-single-alt">alt 텍스트를 입력하세요.</div>
          </div>
          <div class="row2">
            <div class="field">
              <label>title</label>
              <input id="inp-single-title" type="text">
            </div>
            <div class="field">
              <label>정렬 (align)</label>
              <select id="sel-single-align">
                <option value="">기본</option>
                <option value="left">왼쪽 float</option>
                <option value="right">오른쪽 float</option>
              </select>
            </div>
          </div>
          <div class="row3">
            <div class="field">
              <label>가로 (width)</label>
              <input id="inp-single-width" type="text" placeholder="200px">
            </div>
            <div class="field">
              <label>세로 (height)</label>
              <input id="inp-single-height" type="text" placeholder="auto">
            </div>
            <div class="field">
              <label>테두리 (border)</label>
              <input id="inp-single-border" type="text" placeholder="1px solid #ccc">
            </div>
          </div>
          <div class="preview-box show" id="single-preview">
            <img id="single-preview-img" alt="미리보기" src="">
          </div>
        </div>

        <!-- 다중 파일 alt (여러 장 선택 시 표시) -->
        <div id="multi-attrs">
          <div class="field">
            <label>대체 텍스트 (alt) * — 모든 이미지에 일괄 적용</label>
            <input id="inp-file-alt" type="text" placeholder="이미지 설명">
            <div class="err" id="err-file-alt">alt 텍스트를 입력하세요.</div>
          </div>
        </div>

        <ul class="upload-list" id="upload-list"></ul>
        <div class="summary" id="upload-summary"></div>
        <ul class="upload-errors" id="upload-errors"></ul>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>`;
        this.bindEvents();
    }
    setUploadConfig(config) {
        this.uploadConfig = config;
    }
    open() {
        this.reset();
        this.setAttribute('open', '');
        this.shadow.getElementById('inp-src')?.focus();
    }
    close() { this.removeAttribute('open'); }
    reset() {
        const s = this.shadow;
        // URL 탭 필드
        s.getElementById('inp-src').value = '';
        s.getElementById('inp-alt').value = '';
        s.getElementById('inp-title').value = '';
        s.getElementById('inp-width').value = '';
        s.getElementById('inp-height').value = '';
        s.getElementById('inp-border').value = '';
        s.getElementById('inp-id').value = '';
        s.getElementById('inp-class').value = '';
        s.getElementById('sel-align').value = '';
        s.getElementById('err-alt')?.classList.remove('show');
        s.getElementById('url-preview')?.classList.remove('show');
        // 파일 탭 — 단일 모드 필드
        s.getElementById('inp-single-alt').value = '';
        s.getElementById('inp-single-title').value = '';
        s.getElementById('inp-single-width').value = '';
        s.getElementById('inp-single-height').value = '';
        s.getElementById('inp-single-border').value = '';
        s.getElementById('sel-single-align').value = '';
        s.getElementById('single-preview-img').src = '';
        s.getElementById('err-single-alt')?.classList.remove('show');
        // 파일 탭 — 다중 모드 필드
        s.getElementById('inp-file-alt').value = '';
        s.getElementById('err-file-alt')?.classList.remove('show');
        // 공통
        s.getElementById('upload-list').innerHTML = '';
        s.getElementById('upload-summary').textContent = '';
        s.getElementById('upload-errors').innerHTML = '';
        s.getElementById('single-attrs').style.display = 'none';
        s.getElementById('multi-attrs').style.display = 'none';
        this.selectedFiles = [];
        this.busy = false;
        this.switchTab('url');
    }
    bindEvents() {
        const s = this.shadow;
        s.getElementById('backdrop')?.addEventListener('click', (e) => {
            if (e.target === s.getElementById('backdrop'))
                this.close();
        });
        s.getElementById('btn-close')?.addEventListener('click', () => this.close());
        s.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
        s.getElementById('btn-confirm')?.addEventListener('click', () => void this.onConfirm());
        // 탭 전환
        s.querySelectorAll('.tab-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        // URL 탭: src / alt 입력 시 버튼 상태 실시간 갱신
        s.getElementById('inp-src')?.addEventListener('input', () => {
            this.updatePreview();
            this.syncConfirmBtn();
        });
        s.getElementById('inp-alt')?.addEventListener('input', () => this.syncConfirmBtn());
        // 파일 드롭 영역
        const drop = s.getElementById('file-drop');
        const fileInput = s.getElementById('inp-file');
        drop.addEventListener('click', () => fileInput.click());
        drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ')
            fileInput.click(); });
        drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.style.borderColor = '#1976d2'; });
        drop.addEventListener('dragleave', () => { drop.style.borderColor = ''; });
        drop.addEventListener('drop', (e) => {
            e.preventDefault();
            drop.style.borderColor = '';
            const files = Array.from(e.dataTransfer?.files ?? []);
            this.handleFiles(files);
        });
        fileInput.addEventListener('change', () => {
            this.handleFiles(Array.from(fileInput.files ?? []));
            fileInput.value = '';
        });
    }
    switchTab(tab) {
        const s = this.shadow;
        s.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
        s.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${tab}`));
        this.syncConfirmBtn();
    }
    syncConfirmBtn() {
        const s = this.shadow;
        const btn = s.getElementById('btn-confirm');
        const activePanel = s.querySelector('.panel.active');
        if (activePanel?.id === 'panel-url') {
            const src = s.getElementById('inp-src').value.trim();
            const alt = s.getElementById('inp-alt').value.trim();
            btn.disabled = !src || !alt;
            btn.textContent = '삽입';
            return;
        }
        // 파일 탭: 모드에 따라 텍스트 및 활성화 상태 설정
        const isSingleMode = s.getElementById('single-attrs').style.display !== 'none';
        btn.textContent = isSingleMode ? '삽입' : '업로드 · 삽입';
        btn.disabled = false;
    }
    updatePreview() {
        const src = this.shadow.getElementById('inp-src').value.trim();
        const box = this.shadow.getElementById('url-preview');
        const img = this.shadow.getElementById('preview-img');
        if (src) {
            img.src = src;
            box.classList.add('show');
        }
        else {
            box.classList.remove('show');
        }
    }
    handleFiles(files) {
        const { valid, errors } = this.uploader.validateFiles(files);
        this.selectedFiles.push(...valid);
        this.renderErrors(errors);
        const s = this.shadow;
        if (this.selectedFiles.length === 1) {
            // 단일 모드: 속성 입력 폼 표시 + 파일 미리보기
            s.getElementById('single-attrs').style.display = 'block';
            s.getElementById('multi-attrs').style.display = 'none';
            s.getElementById('upload-list').innerHTML = '';
            s.getElementById('upload-summary').textContent = '';
            const reader = new FileReader();
            reader.onload = (ev) => {
                s.getElementById('single-preview-img').src =
                    ev.target?.result;
            };
            reader.readAsDataURL(this.selectedFiles[0]);
        }
        else if (this.selectedFiles.length > 1) {
            // 다중 모드: alt 일괄 입력 + 업로드 큐
            s.getElementById('single-attrs').style.display = 'none';
            s.getElementById('multi-attrs').style.display = 'block';
            this.renderUploadList();
            const total = this.selectedFiles.reduce((acc, f) => acc + f.size, 0);
            s.getElementById('upload-summary').textContent =
                `${this.selectedFiles.length}개 파일 선택됨 (${fmt(total)} / 20MB)`;
        }
        this.syncConfirmBtn();
    }
    renderUploadList(items) {
        const ul = this.shadow.getElementById('upload-list');
        const source = items ?? this.selectedFiles.map((f) => ({
            file: f, status: 'pending', progress: 0,
        }));
        ul.innerHTML = source.map((item) => {
            const label = {
                pending: '대기', uploading: '업로드 중', done: '완료', error: '오류',
            };
            const cls = `status-${item.status}`;
            const detail = item.status === 'error' ? ` — ${item.error ?? ''}` : '';
            return `<li class="upload-item">
        <span class="upload-name">${item.file.name}</span>
        <span class="upload-status ${cls}">${label[item.status]}${detail}</span>
      </li>`;
        }).join('');
    }
    renderErrors(errors) {
        const el = this.shadow.getElementById('upload-errors');
        el.innerHTML = errors.map((e) => `<li>${e}</li>`).join('');
    }
    async onConfirm() {
        if (this.busy)
            return;
        const activePanel = this.shadow.querySelector('.panel.active');
        if (activePanel?.id === 'panel-url') {
            this.confirmUrl();
        }
        else {
            await this.confirmUpload();
        }
    }
    confirmUrl() {
        const s = this.shadow;
        const src = s.getElementById('inp-src').value.trim();
        const alt = s.getElementById('inp-alt').value.trim();
        if (!alt) {
            s.getElementById('err-alt').classList.add('show');
            s.getElementById('inp-alt').focus();
            return;
        }
        s.getElementById('err-alt').classList.remove('show');
        const attrs = {
            src,
            alt,
            title: s.getElementById('inp-title').value.trim() || undefined,
            width: s.getElementById('inp-width').value.trim() || undefined,
            height: s.getElementById('inp-height').value.trim() || undefined,
            border: s.getElementById('inp-border').value.trim() || undefined,
            align: s.getElementById('sel-align').value || undefined,
            id: s.getElementById('inp-id').value.trim() || undefined,
            className: s.getElementById('inp-class').value.trim() || undefined,
        };
        this.dispatch('poa-image-insert', { attrs });
        this.close();
    }
    async confirmUpload() {
        if (this.selectedFiles.length === 0)
            return;
        const s = this.shadow;
        const isSingleMode = s.getElementById('single-attrs').style.display !== 'none';
        // ── 단일 파일 모드 ──────────────────────────────────────────────
        if (isSingleMode) {
            const alt = s.getElementById('inp-single-alt').value.trim();
            if (!alt) {
                s.getElementById('err-single-alt').classList.add('show');
                s.getElementById('inp-single-alt').focus();
                return;
            }
            s.getElementById('err-single-alt').classList.remove('show');
            const attrs = {
                alt,
                title: s.getElementById('inp-single-title').value.trim() || undefined,
                width: s.getElementById('inp-single-width').value.trim() || undefined,
                height: s.getElementById('inp-single-height').value.trim() || undefined,
                border: s.getElementById('inp-single-border').value.trim() || undefined,
                align: s.getElementById('sel-single-align').value || undefined,
                src: '',
            };
            this.busy = true;
            s.getElementById('btn-confirm').disabled = true;
            try {
                const file = this.selectedFiles[0];
                if (this.uploadConfig) {
                    const results = await this.uploader.upload([file], {
                        ...this.uploadConfig,
                        onProgress: (items) => this.renderUploadList(items),
                    });
                    const done = results[0];
                    if (done?.status === 'done' && done.url) {
                        this.dispatch('poa-image-insert', { attrs: { ...attrs, src: done.url } });
                    }
                }
                else {
                    const src = await this.readAsDataUrl(file);
                    this.dispatch('poa-image-insert', { attrs: { ...attrs, src } });
                }
                this.busy = false;
                this.close();
            }
            catch (err) {
                (this.onErrorFn ?? ((m) => console.error(m)))(err instanceof Error ? err.message : '파일 읽기에 실패했습니다.');
                this.busy = false;
                this.syncConfirmBtn();
            }
            return;
        }
        // ── 다중 파일 모드 ─────────────────────────────────────────────
        const alt = s.getElementById('inp-file-alt').value.trim();
        if (!alt) {
            s.getElementById('err-file-alt').classList.add('show');
            s.getElementById('inp-file-alt').focus();
            return;
        }
        s.getElementById('err-file-alt').classList.remove('show');
        this.busy = true;
        s.getElementById('btn-confirm').disabled = true;
        if (!this.uploadConfig) {
            try {
                for (const file of this.selectedFiles) {
                    const dataUrl = await this.readAsDataUrl(file);
                    this.dispatch('poa-image-insert', {
                        attrs: { src: dataUrl, alt },
                    });
                }
                this.busy = false;
                this.close();
            }
            catch (err) {
                (this.onErrorFn ?? ((m) => console.error(m)))(err instanceof Error ? err.message : '파일 읽기에 실패했습니다.');
                this.busy = false;
                this.syncConfirmBtn();
            }
            return;
        }
        const results = await this.uploader.upload(this.selectedFiles, {
            ...this.uploadConfig,
            onProgress: (items) => this.renderUploadList(items),
        });
        results.forEach((item) => {
            if (item.status === 'done' && item.url) {
                this.dispatch('poa-image-insert', {
                    attrs: { src: item.url, alt },
                });
            }
        });
        const hasError = results.some((r) => r.status === 'error');
        if (!hasError) {
            this.busy = false;
            this.close();
        }
        else {
            this.busy = false;
            this.syncConfirmBtn();
        }
    }
    readAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error(`"${file.name}" 파일 읽기에 실패했습니다.`));
            reader.readAsDataURL(file);
        });
    }
    dispatch(type, detail) {
        this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
    }
}
