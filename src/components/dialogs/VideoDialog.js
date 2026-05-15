import { parseEmbedUrl, buildVideoHtml, buildEmbedHtml, } from '../../modules/insert/VideoInserter.js';
const CSS = `
:host { display: none; }
:host([open]) { display: block; }
* { box-sizing: border-box; margin: 0; padding: 0; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.dialog {
  background: #fff; border-radius: 8px;
  width: 480px; max-width: 96vw; max-height: 90vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.25); overflow: hidden;
}
.header {
  background: #1F2937; color: #fff;
  padding: 13px 18px;
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.header h2 { font-size: 14px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; padding: 2px 6px; line-height: 1;
}
.header button:hover { color: #fff; }

.tabs {
  display: flex; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
}
.tab-btn {
  flex: 1; padding: 10px; border: none; background: #F9FAFB;
  font-size: 13px; cursor: pointer; color: #6B7280; border-bottom: 2px solid transparent;
  transition: background .15s;
}
.tab-btn:hover { background: #F3F4F6; }
.tab-btn.active { background: #fff; color: #1F2937; font-weight: 600; border-bottom-color: #3B82F6; }

.body { overflow-y: auto; flex: 1; padding: 16px 18px 8px; }
.body::-webkit-scrollbar { width: 5px; }
.body::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.tab-panel { display: none; }
.tab-panel.active { display: block; }

.section { margin-bottom: 14px; }
.label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 5px; }
input[type="text"], input[type="url"], input[type="number"], select {
  width: 100%; padding: 7px 10px;
  border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 13px; color: #111; background: #fff;
}
input:focus, select:focus { outline: none; border-color: #3B82F6; }

.radio-row { display: flex; gap: 16px; flex-wrap: wrap; }
.radio-row label { display: flex; align-items: center; gap: 5px; font-size: 13px; cursor: pointer; }
.checkbox-row { display: flex; flex-direction: column; gap: 6px; }
.checkbox-row label { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }

.size-row { display: flex; align-items: center; gap: 8px; }
.size-row input { width: 72px; }
.size-row span { font-size: 12px; color: #6B7280; }

.a11y-hint {
  font-size: 11px; color: #F59E0B; margin-top: 4px;
  display: flex; align-items: center; gap: 4px;
}

.preview-box {
  width: 100%; aspect-ratio: 16/9; background: #F3F4F6;
  border: 1px dashed #D1D5DB; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; margin-top: 6px;
}
.preview-box img { width: 100%; height: 100%; object-fit: cover; }
.preview-box .empty-msg { font-size: 12px; color: #9CA3AF; }

.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.footer {
  padding: 12px 18px; border-top: 1px solid #E5E7EB;
  display: flex; justify-content: flex-end; gap: 8px; flex-shrink: 0;
}
.btn {
  padding: 6px 16px; border-radius: 4px; font-size: 13px; cursor: pointer;
  border: 1px solid #D1D5DB; background: #fff; color: #374151;
}
.btn:hover { background: #F3F4F6; }
.btn.primary { background: #1F2937; color: #fff; border-color: #1F2937; }
.btn.primary:hover { background: #374151; }
.err-msg { color: #d32f2f; font-size: 12px; margin-top: 4px; display: none; }
.err-msg.show { display: block; }
`;
export class PoaVideoDialog extends HTMLElement {
    shadow;
    activeTab = 'video';
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${CSS}</style>`;
    }
    open(tab = 'video') {
        this.activeTab = tab;
        this.setAttribute('open', '');
        this.render();
    }
    close() {
        this.removeAttribute('open');
    }
    // ── 렌더 ───────────────────────────────────────────────────────────────────
    render() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>미디어 삽입</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="tabs">
      <button class="tab-btn${this.activeTab === 'video' ? ' active' : ''}" data-tab="video">비디오 태그</button>
      <button class="tab-btn${this.activeTab === 'embed' ? ' active' : ''}" data-tab="embed">외부 동영상</button>
    </div>

    <div class="body">
      <!-- ── 비디오 태그 탭 ── -->
      <div class="tab-panel${this.activeTab === 'video' ? ' active' : ''}" id="panel-video">
        <div class="section">
          <div class="label">소스 URL</div>
          <input id="v-src" type="url" placeholder="https://example.com/video.mp4">
          <div class="err-msg" id="v-err"></div>
        </div>
        <div class="section">
          <div class="label">파일 형식</div>
          <div class="radio-row">
            <label><input type="radio" name="v-type" value="video/mp4" checked> mp4</label>
            <label><input type="radio" name="v-type" value="video/webm"> webm</label>
            <label><input type="radio" name="v-type" value="video/ogg"> ogg</label>
          </div>
        </div>
        <div class="section">
          <div class="label">포스터 URL <span style="font-weight:400;color:#9CA3AF">(선택)</span></div>
          <input id="v-poster" type="url" placeholder="https://example.com/poster.jpg">
        </div>
        <div class="section">
          <div class="label">옵션</div>
          <div class="checkbox-row">
            <label><input type="checkbox" id="v-controls" checked> controls (재생 컨트롤 표시)</label>
            <label><input type="checkbox" id="v-autoplay"> autoplay (자동 재생 — muted 강제)</label>
            <label><input type="checkbox" id="v-loop"> loop (반복 재생)</label>
            <label><input type="checkbox" id="v-muted"> muted (음소거)</label>
          </div>
        </div>
        <div class="section">
          <div class="label">크기</div>
          <div class="size-row">
            너비 <input id="v-width" type="number" min="100" max="1920" value="640">
            <span>px</span>
            높이 <input id="v-height" type="number" min="50" max="1080" value="360">
            <span>px</span>
          </div>
        </div>
        <div class="section">
          <div class="label">접근성 — 자막</div>
          <input id="v-track-src" type="url" placeholder="https://example.com/captions.vtt">
          <div class="a11y-hint" id="a11y-hint">⚠ 접근성을 위해 자막을 추가하세요.</div>
          <div style="margin-top:6px">
            <select id="v-track-lang">
              <option value="ko">ko — 한국어</option>
              <option value="en">en — English</option>
              <option value="ja">ja — 日本語</option>
              <option value="zh">zh — 中文</option>
              <option value="fr">fr — Français</option>
              <option value="de">de — Deutsch</option>
              <option value="es">es — Español</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ── 외부 동영상 탭 ── -->
      <div class="tab-panel${this.activeTab === 'embed' ? ' active' : ''}" id="panel-embed">
        <div class="section">
          <div class="label">공유 URL</div>
          <input id="e-url" type="url" placeholder="https://youtube.com/watch?v=...">
          <div class="err-msg" id="e-err"></div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:4px">
            지원: YouTube, Vimeo, Dailymotion
          </div>
        </div>
        <div class="section">
          <div class="label">미리보기</div>
          <div class="preview-box" id="preview-box">
            <span class="empty-msg">URL을 입력하면 미리보기가 표시됩니다.</span>
          </div>
        </div>
        <div class="section">
          <div class="label">크기</div>
          <div class="size-row">
            너비 <input id="e-width" type="number" min="100" max="1920" value="640">
            <span>px</span>
            높이 <input id="e-height" type="number" min="50" max="1080" value="360">
            <span>px</span>
          </div>
        </div>
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
    // ── 이벤트 바인딩 ──────────────────────────────────────────────────────────
    bindEvents() {
        const sd = this.shadow;
        sd.getElementById('btn-close')?.addEventListener('click', () => this.close());
        sd.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
        sd.getElementById('overlay')?.addEventListener('click', () => this.close());
        sd.getElementById('dialog')?.addEventListener('click', e => e.stopPropagation());
        // 탭 전환
        sd.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeTab = btn.dataset.tab;
                sd.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                sd.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                sd.getElementById(`panel-${this.activeTab}`)?.classList.add('active');
            });
        });
        // autoplay 체크 → muted 강제
        sd.getElementById('v-autoplay')?.addEventListener('change', (e) => {
            const autoplay = e.target.checked;
            const mutedEl = sd.getElementById('v-muted');
            if (mutedEl && autoplay)
                mutedEl.checked = true;
        });
        // 자막 입력 → a11y 힌트 숨김
        sd.getElementById('v-track-src')?.addEventListener('input', (e) => {
            const hint = sd.getElementById('a11y-hint');
            if (hint)
                hint.style.display = e.target.value ? 'none' : 'flex';
        });
        // 외부 URL 입력 → 실시간 미리보기
        sd.getElementById('e-url')?.addEventListener('input', (e) => {
            this.updatePreview(e.target.value);
        });
        sd.getElementById('btn-confirm')?.addEventListener('click', () => this.confirm());
    }
    // ── 미리보기 ───────────────────────────────────────────────────────────────
    updatePreview(url) {
        const box = this.shadow.getElementById('preview-box');
        if (!box)
            return;
        const parsed = parseEmbedUrl(url);
        if (parsed?.thumbnailUrl) {
            box.innerHTML = `<img src="${parsed.thumbnailUrl}" alt="미리보기">`;
        }
        else if (parsed) {
            box.innerHTML = `<span class="empty-msg">${parsed.provider} 동영상 (미리보기 없음)</span>`;
        }
        else {
            box.innerHTML = `<span class="empty-msg">URL을 입력하면 미리보기가 표시됩니다.</span>`;
        }
    }
    // ── 확인 ───────────────────────────────────────────────────────────────────
    confirm() {
        const html = this.activeTab === 'video'
            ? this.buildVideoHtml()
            : this.buildEmbedHtml();
        if (!html)
            return;
        this.dispatchEvent(new CustomEvent('poa-video-insert', {
            bubbles: true, composed: false,
            detail: { html },
        }));
        this.close();
    }
    buildVideoHtml() {
        const sd = this.shadow;
        const src = sd.getElementById('v-src')?.value.trim() ?? '';
        if (!src) {
            this._showError('v-err', '소스 URL을 입력하세요.');
            return null;
        }
        const type = (sd.querySelector('input[name="v-type"]:checked')?.value ?? 'video/mp4');
        const poster = sd.getElementById('v-poster')?.value.trim();
        const w = parseInt(sd.getElementById('v-width')?.value ?? '640', 10);
        const h = parseInt(sd.getElementById('v-height')?.value ?? '360', 10);
        const controls = sd.getElementById('v-controls')?.checked ?? true;
        const autoplay = sd.getElementById('v-autoplay')?.checked ?? false;
        const loop = sd.getElementById('v-loop')?.checked ?? false;
        const muted = sd.getElementById('v-muted')?.checked ?? false;
        const trackSrc = sd.getElementById('v-track-src')?.value.trim();
        const trackSrclang = sd.getElementById('v-track-lang')?.value ?? 'ko';
        return buildVideoHtml({
            src, type, poster: poster || undefined,
            width: w, height: h,
            controls, autoplay, loop, muted,
            trackSrc: trackSrc || undefined, trackSrclang,
        });
    }
    _showError(id, msg) {
        const el = this.shadow.getElementById(id);
        if (!el)
            return;
        el.textContent = msg;
        el.classList.add('show');
    }
    buildEmbedHtml() {
        const sd = this.shadow;
        const url = sd.getElementById('e-url')?.value.trim() ?? '';
        const parsed = parseEmbedUrl(url);
        if (!parsed) {
            this._showError('e-err', '지원하지 않는 URL입니다. YouTube, Vimeo, Dailymotion URL을 입력하세요.');
            return null;
        }
        const w = parseInt(sd.getElementById('e-width')?.value ?? '640', 10);
        const h = parseInt(sd.getElementById('e-height')?.value ?? '360', 10);
        return buildEmbedHtml({ embedUrl: parsed.embedUrl, width: w, height: h });
    }
}
