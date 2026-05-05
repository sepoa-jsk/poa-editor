import DOMPurify from 'dompurify';
import { TemplateManager } from '../../modules/template/TemplateManager.js';
import type { TemplateNode } from '../../modules/template/TemplateManager.js';
import type { PoaTemplateTree } from '../TemplateTree.js';

const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  position: relative; background: #fff; border-radius: 12px;
  width: min(820px, 95vw); height: min(600px, 90vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 22px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { display: flex; flex: 1; overflow: hidden; }

/* 좌측 트리 패널 */
.left {
  width: 220px; flex-shrink: 0; border-right: 1px solid #f3f4f6;
  display: flex; flex-direction: column; overflow: hidden;
}
.tree-wrap { flex: 1; overflow-y: auto; }
.left-btns {
  padding: 8px; border-top: 1px solid #f3f4f6;
  display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;
}
.left-btn {
  width: 100%; padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151; text-align: left;
}
.left-btn:hover { background: #f9fafb; }

/* 우측 미리보기 패널 */
.right {
  flex: 1; display: flex; flex-direction: column;
  padding: 16px; overflow: hidden; min-width: 0;
}
.preview-label {
  font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase;
  letter-spacing: .06em; margin-bottom: 8px; flex-shrink: 0;
}
.preview-empty {
  flex: 1; border: 1.5px dashed #e5e7eb; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #d1d5db; text-align: center;
}
.preview-frame {
  flex: 1; border: 1px solid #e5e7eb; border-radius: 8px;
  background: #fff; min-height: 0;
}
.apply-btns { display: flex; gap: 8px; margin-top: 12px; flex-shrink: 0; }
.btn-append {
  flex: 1; padding: 8px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151; font-weight: 500;
}
.btn-append:hover { background: #f9fafb; }
.btn-replace {
  flex: 1; padding: 8px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-replace:hover { background: #1d4ed8; }
.btn-append:disabled, .btn-replace:disabled { opacity: .4; cursor: default; pointer-events: none; }

/* 저장 오버레이 */
.save-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; border-radius: 12px;
}
.save-box {
  background: #fff; border-radius: 12px; padding: 24px; width: min(360px, 90%);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}
.save-box h4 { margin: 0 0 16px; font-size: 15px; font-weight: 700; color: #111827; }
.save-field { margin-bottom: 12px; }
.save-field > label { display: block; font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 4px; }
.save-field input[type=text], .save-field select {
  width: 100%; padding: 8px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 14px; outline: none; font-family: inherit;
}
.save-field input[type=text]:focus, .save-field select:focus { border-color: #2563eb; }
.save-chk { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; cursor: pointer; }
.save-chk input { accent-color: #2563eb; }
.save-btns { display: flex; gap: 8px; margin-top: 16px; justify-content: flex-end; }
.save-cancel {
  padding: 7px 18px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 14px; color: #374151;
}
.save-ok {
  padding: 7px 18px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 14px; color: #fff; font-weight: 600;
}
.save-ok:hover { background: #1d4ed8; }
.hidden { display: none !important; }
`;

const TPL = `
<div class="dlg">
  <div class="hdr">
    <h3>템플릿</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="left">
      <div class="tree-wrap"><poa-template-tree></poa-template-tree></div>
      <div class="left-btns">
        <button class="left-btn" id="btn-add-folder">📁 폴더 추가</button>
        <button class="left-btn" id="btn-save-tmpl">💾 템플릿 저장</button>
      </div>
    </div>
    <div class="right">
      <div class="preview-label">미리보기</div>
      <div class="preview-empty" id="preview-empty">템플릿을 선택하면<br>미리보기가 표시됩니다</div>
      <iframe class="preview-frame hidden" id="preview-frame"
              sandbox="allow-same-origin" frameborder="0"></iframe>
      <div class="apply-btns">
        <button class="btn-append"  id="btn-append"  disabled>현재 내용에 추가</button>
        <button class="btn-replace" id="btn-replace" disabled>내용 교체하여 적용</button>
      </div>
    </div>
  </div>

  <!-- 저장 오버레이 -->
  <div class="save-overlay hidden" id="save-overlay">
    <div class="save-box">
      <h4>현재 내용을 템플릿으로 저장</h4>
      <div class="save-field">
        <label>템플릿 이름</label>
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

    if (!this.selected || this.selected.type !== 'template') {
      frame.classList.add('hidden');
      empty.classList.remove('hidden');
      appendBtn.disabled = true;
      replBtn.disabled   = true;
      return;
    }

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
    if (mode === 'append') this.close();
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
