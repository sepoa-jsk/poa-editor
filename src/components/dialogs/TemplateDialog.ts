import DOMPurify from 'dompurify';
import { TemplateManager } from '../../modules/template/TemplateManager.js';
import type { TemplateNode } from '../../modules/template/TemplateManager.js';
import type { PoaTemplateTree } from '../TemplateTree.js';

const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.5); backdrop-filter: blur(3px); }

.dlg {
  position: relative; background: #fff; border-radius: 16px;
  width: min(860px, 96vw); height: min(620px, 92vh);
  display: flex; flex-direction: column;
  box-shadow: 0 24px 64px rgba(0,0,0,.22), 0 4px 16px rgba(0,0,0,.1);
  overflow: hidden; animation: dlg-in .2s cubic-bezier(.22,1,.36,1);
}
@keyframes dlg-in { from { opacity:0; transform:scale(.96) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }

.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; border-bottom: 1px solid #f1f5f9; flex-shrink: 0;
}
.hdr-left { display: flex; align-items: center; gap: 10px; }
.hdr-icon { font-size: 18px; line-height: 1; }
.hdr h3 { margin: 0; font-size: 16px; font-weight: 700; color: #0f172a; }
.x-btn {
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  background: none; border: none; font-size: 16px; cursor: pointer;
  color: #94a3b8; border-radius: 8px; transition: all .15s; flex-shrink: 0;
}
.x-btn:hover { color: #334155; background: #f1f5f9; }

.body { display: flex; flex: 1; overflow: hidden; }

/* 좌측 트리 패널 */
.left {
  width: 240px; flex-shrink: 0; border-right: 1px solid #f1f5f9;
  display: flex; flex-direction: column; overflow: hidden; background: #f8fafc;
}
.left-header {
  padding: 12px 16px 10px; flex-shrink: 0;
  font-size: 11px; font-weight: 700; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .08em;
  border-bottom: 1px solid #f1f5f9;
}
.tree-wrap { flex: 1; overflow-y: auto; padding: 4px 0; }
.left-btns {
  padding: 10px 12px; border-top: 1px solid #f1f5f9;
  display: flex; flex-direction: column; gap: 6px; flex-shrink: 0;
}
.left-btn {
  width: 100%; padding: 7px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 12px; color: #475569;
  text-align: left; display: flex; align-items: center; gap: 8px;
  font-weight: 500; transition: all .12s; font-family: inherit;
}
.left-btn:hover { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
.left-btn.save-btn { background: #2563eb; border-color: #2563eb; color: #fff; }
.left-btn.save-btn:hover { background: #1d4ed8; border-color: #1d4ed8; }

/* 우측 미리보기 패널 */
.right {
  flex: 1; display: flex; flex-direction: column;
  padding: 20px; overflow: hidden; min-width: 0;
}
.right-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px; flex-shrink: 0;
}
.preview-label {
  font-size: 11px; font-weight: 700; color: #94a3b8;
  text-transform: uppercase; letter-spacing: .08em;
}
.selected-name {
  font-size: 12px; color: #334155; font-weight: 600;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;
  display: none;
}
.selected-name.visible { display: block; }
.preview-empty {
  flex: 1; border: 2px dashed #e2e8f0; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  font-size: 13px; color: #cbd5e1; text-align: center; background: #f8fafc;
}
.preview-empty-icon { font-size: 36px; line-height: 1; opacity: .6; }
.preview-frame {
  flex: 1; border: 1px solid #e2e8f0; border-radius: 12px;
  background: #fff; min-height: 0;
}
.apply-btns { display: flex; gap: 10px; margin-top: 14px; flex-shrink: 0; }
.btn-append {
  flex: 1; padding: 9px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px;
  background: #fff; cursor: pointer; font-size: 13px; color: #475569; font-weight: 500;
  transition: all .12s; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 6px;
}
.btn-append:hover { background: #f8fafc; border-color: #cbd5e1; color: #334155; }
.btn-replace {
  flex: 1; padding: 9px 16px; border: none; border-radius: 10px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
  transition: all .12s; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 6px;
  box-shadow: 0 1px 4px rgba(37,99,235,.3);
}
.btn-replace:hover { background: #1d4ed8; box-shadow: 0 3px 10px rgba(37,99,235,.4); }
.btn-append:disabled, .btn-replace:disabled { opacity: .35; cursor: default; pointer-events: none; }

/* 저장 오버레이 */
.save-overlay {
  position: absolute; inset: 0; background: rgba(15,23,42,.48);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; border-radius: 16px; backdrop-filter: blur(3px);
}
.save-box {
  background: #fff; border-radius: 16px; padding: 28px; width: min(380px, 90%);
  box-shadow: 0 24px 56px rgba(0,0,0,.24);
  animation: dlg-in .16s cubic-bezier(.22,1,.36,1);
}
.save-box h4 { margin: 0 0 20px; font-size: 16px; font-weight: 700; color: #0f172a; }
.save-field { margin-bottom: 14px; }
.save-field > label { display: block; font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 5px; }
.save-field > label .req { color: #ef4444; margin-left: 2px; }
.save-field input[type=text], .save-field select {
  width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-size: 14px; outline: none; font-family: inherit; color: #0f172a;
  transition: border-color .15s, box-shadow .15s;
}
.save-field input[type=text]:focus, .save-field select:focus {
  border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
.save-field input[type=text]::placeholder { color: #cbd5e1; }
.save-chk { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; cursor: pointer; }
.save-chk input { accent-color: #2563eb; width: 15px; height: 15px; }
.save-btns { display: flex; gap: 8px; margin-top: 20px; justify-content: flex-end; }
.save-cancel {
  padding: 8px 20px; border: 1.5px solid #e2e8f0; border-radius: 10px;
  background: #fff; cursor: pointer; font-size: 14px; color: #64748b; font-weight: 500;
  transition: all .12s; font-family: inherit;
}
.save-cancel:hover { background: #f8fafc; border-color: #cbd5e1; color: #334155; }
.save-ok {
  padding: 8px 20px; border: none; border-radius: 10px;
  background: #2563eb; cursor: pointer; font-size: 14px; color: #fff; font-weight: 600;
  transition: all .12s; font-family: inherit; box-shadow: 0 1px 4px rgba(37,99,235,.3);
}
.save-ok:hover { background: #1d4ed8; box-shadow: 0 3px 10px rgba(37,99,235,.4); }
.hidden { display: none !important; }

/* 토스트 알림 */
.tmpl-toast {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  background: #1e293b; color: #f8fafc; font-size: 13px; border-radius: 10px;
  padding: 9px 20px; white-space: nowrap; z-index: 200;
  animation: tmpl-fadein .2s cubic-bezier(.22,1,.36,1);
  box-shadow: 0 4px 16px rgba(0,0,0,.28);
}
@keyframes tmpl-fadein { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
`;

const TPL = `
<div class="dlg">
  <div class="hdr">
    <div class="hdr-left">
      <span class="hdr-icon">📋</span>
      <h3>템플릿</h3>
    </div>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="left">
      <div class="left-header">목록</div>
      <div class="tree-wrap"><poa-template-tree></poa-template-tree></div>
      <div class="left-btns">
        <button class="left-btn" id="btn-add-folder">
          <span>📁</span> 폴더 추가
        </button>
        <button class="left-btn save-btn" id="btn-save-tmpl">
          <span>💾</span> 현재 내용 저장
        </button>
      </div>
    </div>
    <div class="right">
      <div class="right-header">
        <div class="preview-label">미리보기</div>
        <div class="selected-name" id="selected-name"></div>
      </div>
      <div class="preview-empty" id="preview-empty">
        <div class="preview-empty-icon">📄</div>
        <span>템플릿을 선택하면<br>미리보기가 표시됩니다</span>
      </div>
      <iframe class="preview-frame hidden" id="preview-frame"
              sandbox="allow-same-origin" frameborder="0"></iframe>
      <div class="apply-btns">
        <button class="btn-append"  id="btn-append"  disabled>
          <span>➕</span> 현재 내용에 추가
        </button>
        <button class="btn-replace" id="btn-replace" disabled>
          <span>↩</span> 내용 교체하여 적용
        </button>
      </div>
    </div>
  </div>

  <!-- 저장 오버레이 -->
  <div class="save-overlay hidden" id="save-overlay">
    <div class="save-box">
      <h4>현재 내용을 템플릿으로 저장</h4>
      <div class="save-field">
        <label>템플릿 이름<span class="req">*</span></label>
        <input type="text" id="save-name" placeholder="이름을 입력하세요">
      </div>
      <div class="save-field">
        <label>저장 위치</label>
        <select id="save-folder"></select>
      </div>
      <div class="save-field">
        <label class="save-chk">
          <input type="checkbox" id="save-public"> 공용으로 공유
        </label>
      </div>
      <div class="save-btns">
        <button class="save-cancel" id="save-cancel">취소</button>
        <button class="save-ok"     id="save-ok">저장</button>
      </div>
    </div>
  </div>
</div>
`;

export class PoaTemplateDialog extends HTMLElement {
  private shadow!: ShadowRoot;
  private mgr!:    TemplateManager;
  private tree!:   PoaTemplateTree;
  private selected: TemplateNode | null = null;
  private _getEditorHTML: (() => string) | null = null;

  connectedCallback(): void {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `<style>${STYLE}</style>${TPL}`;
    this.mgr  = new TemplateManager();
    this.tree = this.shadow.querySelector('poa-template-tree') as PoaTemplateTree;
    this.tree.setManager(this.mgr);
    this._bind();
  }

  /** PoaEditor에서 현재 HTML getter를 주입 */
  setup(getHTML: () => string): void {
    this._getEditorHTML = getHTML;
  }

  open(): void {
    this.selected = null;
    this._refreshPreview();
    this._fillFolderSelect();
    this.tree.render();
    this.setAttribute('open', '');
  }

  close(): void { this.removeAttribute('open'); }

  // ── 이벤트 바인딩 ─────────────────────────────────────────────────────

  private _bind(): void {
    this.shadow.querySelector('.x-btn')!.addEventListener('click', () => this.close());
    this.addEventListener('click', e => { if (e.composedPath()[0] === this) this.close(); });
    this.addEventListener('keydown', e => { if ((e as KeyboardEvent).key === 'Escape') this.close(); });

    // 폴더 추가
    this.shadow.getElementById('btn-add-folder')!.addEventListener('click', () => {
      const sel = this.tree.getSelected();
      const parentId = sel?.type === 'folder' ? sel.id : null;
      this.tree.addFolder(parentId);
    });

    // 저장 오버레이 열기
    this.shadow.getElementById('btn-save-tmpl')!.addEventListener('click', () => {
      this._fillFolderSelect();
      (this.shadow.getElementById('save-name') as HTMLInputElement).value = '';
      this.shadow.getElementById('save-overlay')!.classList.remove('hidden');
      setTimeout(() => (this.shadow.getElementById('save-name') as HTMLInputElement).focus(), 50);
    });

    // 저장 오버레이 닫기
    this.shadow.getElementById('save-cancel')!.addEventListener('click', () => {
      this.shadow.getElementById('save-overlay')!.classList.add('hidden');
    });

    // 저장 실행
    this.shadow.getElementById('save-ok')!.addEventListener('click', () => this._doSave());
    this.shadow.getElementById('save-name')!.addEventListener('keydown', e => {
      if (e.key === 'Enter') this._doSave();
    });

    // 적용 버튼
    this.shadow.getElementById('btn-append')! .addEventListener('click', () => this._apply('append'));
    this.shadow.getElementById('btn-replace')!.addEventListener('click', () => this._apply('replace'));

    // 사용자 링크 복사 이벤트
    this.shadow.addEventListener('poa-tmpl-copy-link', () => {
      this._showToast('링크가 복사되었습니다.');
    });

    // TemplateTree 이벤트
    this.shadow.addEventListener('poa-tmpl-select', e => {
      const { node } = (e as CustomEvent).detail as { node: TemplateNode };
      this.selected = node.type === 'template' ? node : null;
      this._refreshPreview();
    });
    this.shadow.addEventListener('poa-tmpl-dblclick', e => {
      const { node } = (e as CustomEvent).detail as { node: TemplateNode };
      this.selected = node;
      this._apply('replace');
    });
  }

  // ── 미리보기 ──────────────────────────────────────────────────────────

  private _refreshPreview(): void {
    const frame     = this.shadow.getElementById('preview-frame') as HTMLIFrameElement;
    const empty     = this.shadow.getElementById('preview-empty')!;
    const appendBtn = this.shadow.getElementById('btn-append')  as HTMLButtonElement;
    const replBtn   = this.shadow.getElementById('btn-replace') as HTMLButtonElement;

    const nameEl = this.shadow.getElementById('selected-name')!;

    if (!this.selected || this.selected.type !== 'template') {
      frame.classList.add('hidden');
      empty.classList.remove('hidden');
      appendBtn.disabled = true;
      replBtn.disabled   = true;
      nameEl.textContent = '';
      nameEl.classList.remove('visible');
      return;
    }

    nameEl.textContent = this.selected.name;
    nameEl.classList.add('visible');

    const clean = String(DOMPurify.sanitize(this.selected.content ?? '', { USE_PROFILES: { html: true } }));
    frame.srcdoc =
      `<!doctype html><html><head><style>
       body{font-family:'맑은 고딕','Malgun Gothic',sans-serif;font-size:14px;
            padding:12px;margin:0;color:#222;line-height:1.6;}
       h1,h2,h3{margin:.5em 0;}p{margin:.4em 0;}
       ul,ol{margin:.4em 0;padding-left:1.5em;}hr{border:none;border-top:1px solid #e5e7eb;}
       </style></head><body>${clean}</body></html>`;

    frame.classList.remove('hidden');
    empty.classList.add('hidden');
    appendBtn.disabled = false;
    replBtn.disabled   = false;
  }

  // ── 적용 ──────────────────────────────────────────────────────────────

  private _apply(mode: 'append' | 'replace'): void {
    if (!this.selected?.content) return;
    const html = String(DOMPurify.sanitize(this.selected.content, { USE_PROFILES: { html: true } }));
    this.dispatchEvent(new CustomEvent('poa-tmpl-insert', {
      bubbles: true, composed: true,
      detail: { html, mode },
    }));
    this.close();
  }

  // ── 저장 ──────────────────────────────────────────────────────────────

  private _doSave(): void {
    const name = (this.shadow.getElementById('save-name') as HTMLInputElement).value.trim();
    if (!name) {
      (this.shadow.getElementById('save-name') as HTMLInputElement).focus();
      return;
    }
    const folderId = (this.shadow.getElementById('save-folder') as HTMLSelectElement).value || null;
    const isPublic = (this.shadow.getElementById('save-public') as HTMLInputElement).checked;
    const html     = this._getEditorHTML?.() ?? '';
    this.mgr.addTemplate(name, html, folderId, isPublic);
    this.tree.render();
    this.shadow.getElementById('save-overlay')!.classList.add('hidden');
  }

  private _showToast(msg: string): void {
    const t = document.createElement('div');
    t.className = 'tmpl-toast';
    t.textContent = msg;
    this.shadow.querySelector('.dlg')!.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  private _fillFolderSelect(): void {
    const sel = this.shadow.getElementById('save-folder') as HTMLSelectElement;
    sel.innerHTML = '';
    const myFolder = this.mgr.getFolders().find(f => !f.isPublic);
    for (const f of this.mgr.getFolders()) {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name;
      if (f === myFolder) opt.selected = true;
      sel.appendChild(opt);
    }
  }
}
