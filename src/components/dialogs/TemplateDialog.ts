import DOMPurify from 'dompurify';
import { TemplateManager } from '../../modules/template/TemplateManager.js';
import type { TemplateNode } from '../../modules/template/TemplateManager.js';
import type { PoaTemplateTree } from '../TemplateTree.js';
import { isAdmin } from '../../core/UserSession.js';
import { Icons } from '../../utils/icons.js';
import { TemplateApiClient, toServerId } from '../../modules/template/TemplateApiClient.js';

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

/* ── 헤더 ── */
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

/* ── 바디 ── */
.body { display: flex; flex: 1; overflow: hidden; min-height: 0; }

/* ── 좌측 패널 ── */
.left {
  width: 240px; flex-shrink: 0; border-right: 1px solid #f3f4f6;
  display: flex; flex-direction: column; overflow: hidden; background: #f8fafc;
}
.search-wrap {
  padding: 10px 12px 6px; flex-shrink: 0; position: relative;
}
.search-icon {
  position: absolute; left: 21px; top: 50%; transform: translateY(-50%);
  color: #94a3b8; pointer-events: none; display: flex; align-items: center;
}
.search-input {
  width: 100%; padding: 7px 10px 7px 30px;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit; background: #fff;
  transition: border-color .15s;
}
.search-input:focus { border-color: #2563eb; }
.search-input::placeholder { color: #cbd5e1; }

.tree-wrap { flex: 1; overflow-y: auto; padding: 0 8px 4px; }

/* ── 인라인 저장 폼 ── */
.save-form {
  overflow: hidden; transition: max-height .22s ease, opacity .22s ease;
  max-height: 0; opacity: 0; flex-shrink: 0;
}
.save-form.visible { max-height: 260px; opacity: 1; }
.save-form-body {
  padding: 10px 12px 6px; border-top: 1px solid #e2e8f0; background: #fff;
}
.sf-title { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 8px; }
.sf-field { margin-bottom: 8px; }
.sf-field > label { display: block; font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 3px; }
.sf-field input[type=text], .sf-field select {
  width: 100%; padding: 6px 9px; border: 1.5px solid #e2e8f0; border-radius: 7px;
  font-size: 13px; outline: none; font-family: inherit; color: #0f172a; background: #fff;
  transition: border-color .15s;
}
.sf-field input[type=text]:focus, .sf-field select:focus { border-color: #2563eb; }
.sf-field input[type=text]::placeholder { color: #cbd5e1; }
.sf-radio { display: flex; gap: 16px; font-size: 12px; color: #374151; }
.sf-radio label { display: flex; align-items: center; gap: 4px; cursor: pointer; }
.sf-radio input { accent-color: #2563eb; }
.sf-radio label.disabled { opacity: .4; cursor: not-allowed; pointer-events: none; }
.sf-btns { display: flex; gap: 6px; justify-content: flex-end; margin-top: 8px; }
.sf-cancel {
  padding: 5px 14px; border: 1.5px solid #e2e8f0; border-radius: 7px;
  background: #fff; cursor: pointer; font-size: 12px; color: #64748b; font-family: inherit;
  transition: all .12s;
}
.sf-cancel:hover { background: #f8fafc; }
.sf-ok {
  padding: 5px 14px; border: none; border-radius: 7px;
  background: #2563eb; cursor: pointer; font-size: 12px; color: #fff;
  font-weight: 600; font-family: inherit; transition: all .12s;
}
.sf-ok:hover { background: #1d4ed8; }

/* ── 좌측 하단 버튼 ── */
.left-btns {
  padding: 8px 12px; border-top: 1px solid #f3f4f6;
  display: flex; gap: 6px; flex-shrink: 0;
}
.left-action-btn {
  flex: 1; padding: 6px 8px; border: 1px solid #e2e8f0; border-radius: 7px;
  background: #fff; cursor: pointer; font-size: 12px; color: #475569;
  display: flex; align-items: center; justify-content: center; gap: 5px;
  font-weight: 500; transition: all .12s; font-family: inherit;
}
.left-action-btn:hover { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
.left-action-btn.active { background: #eff6ff; border-color: #2563eb; color: #2563eb; }
.left-action-btn.danger:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

/* ── 우측 패널 ── */
.right {
  flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0;
}
.preview-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; color: #94a3b8; font-size: 13px; text-align: center; padding: 20px;
}
.preview-content { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.info-bar {
  display: flex; align-items: center; gap: 10px; padding: 0 16px;
  height: 44px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.info-name { font-size: 13px; font-weight: 600; color: #111827; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.info-date { font-size: 12px; color: #94a3b8; white-space: nowrap; }
.btn-apply-quick {
  padding: 5px 12px; border: none; border-radius: 6px;
  background: #2563eb; color: #fff; font-size: 12px; font-weight: 600;
  cursor: pointer; white-space: nowrap; font-family: inherit; transition: all .12s;
}
.btn-apply-quick:hover { background: #1d4ed8; }
.preview-frame { flex: 1; border: none; min-height: 0; }

/* ── 하단 푸터 ── */
.footer {
  display: flex; gap: 8px; padding: 12px 20px;
  border-top: 1px solid #f3f4f6; flex-shrink: 0; justify-content: flex-end;
}
.btn-append {
  padding: 8px 20px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151; font-weight: 500;
  transition: all .12s; font-family: inherit;
}
.btn-append:hover { background: #f9fafb; }
.btn-replace {
  padding: 8px 20px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
  transition: all .12s; font-family: inherit;
}
.btn-replace:hover { background: #1d4ed8; }
.btn-append:disabled, .btn-replace:disabled { opacity: .4; cursor: default; pointer-events: none; }

/* ── 토스트 ── */
.tmpl-toast {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: #1F2937; color: #fff; font-size: 13px; border-radius: 8px;
  padding: 8px 18px; white-space: nowrap; z-index: 200;
  animation: tmpl-fadein .2s ease;
}
@keyframes tmpl-fadein { from { opacity: 0; transform: translateX(-50%) translateY(6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
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
      <div class="search-wrap">
        <span class="search-icon">${Icons.search}</span>
        <input class="search-input" id="search-input" placeholder="템플릿 검색...">
      </div>
      <div class="tree-wrap"><poa-template-tree></poa-template-tree></div>
      <div class="save-form" id="save-form">
        <div class="save-form-body">
          <div class="sf-title">현재 내용을 템플릿으로 저장</div>
          <div class="sf-field">
            <label>템플릿 이름</label>
            <input type="text" id="sf-name" placeholder="이름을 입력하세요">
          </div>
          <div class="sf-field">
            <label>저장 위치</label>
            <select id="sf-folder"></select>
          </div>
          <div class="sf-field">
            <label>공개 여부</label>
            <div class="sf-radio">
              <label><input type="radio" name="sf-vis" id="sf-private" value="private" checked> 개인용</label>
              <label id="sf-public-label"><input type="radio" name="sf-vis" id="sf-public" value="public"> 공용(관리자)</label>
            </div>
          </div>
          <div class="sf-btns">
            <button class="sf-cancel" id="sf-cancel">취소</button>
            <button class="sf-ok"     id="sf-ok">저장</button>
          </div>
        </div>
      </div>
      <div class="left-btns">
        <button class="left-action-btn" id="btn-add-folder">
          ${Icons.plus} 폴더
        </button>
        <button class="left-action-btn" id="btn-save-tmpl">
          ${Icons.plus} 저장
        </button>
      </div>
    </div>
    <div class="right">
      <div class="preview-empty" id="preview-empty">
        <span>왼쪽에서 템플릿을 선택하세요</span>
      </div>
      <div class="preview-content hidden" id="preview-content">
        <div class="info-bar">
          <div class="info-name"  id="info-name"></div>
          <div class="info-date"  id="info-date"></div>
          <button class="btn-apply-quick" id="btn-apply-quick">적용</button>
        </div>
        <iframe class="preview-frame" id="preview-frame"
                sandbox="allow-same-origin" frameborder="0"></iframe>
      </div>
    </div>
  </div>
  <div class="footer">
    <button class="btn-append"  id="btn-append"  disabled>현재 내용에 추가</button>
    <button class="btn-replace" id="btn-replace" disabled>교체하여 적용</button>
  </div>
</div>
`;

export class PoaTemplateDialog extends HTMLElement {
  private shadow!: ShadowRoot;
  private mgr!:    TemplateManager;
  private tree!:   PoaTemplateTree;
  private selected: TemplateNode | null = null;
  private _getEditorHTML: (() => string) | null = null;
  private _saveFormOpen = false;

  connectedCallback(): void {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `<style>${STYLE}</style>${TPL}`;
    this.mgr  = new TemplateManager();
    this.tree = this.shadow.querySelector('poa-template-tree') as PoaTemplateTree;
    this.tree.setManager(this.mgr);
    this._bind();
  }

  setup(getHTML: () => string): void {
    this._getEditorHTML = getHTML;
  }

  open(): void {
    this.selected = null;
    this._refreshPreview();
    this._fillFolderSelect();
    this.tree.render();
    this._closeSaveForm();
    this.setAttribute('open', '');
    setTimeout(() => this.tree.render(), 300);
  }

  close(): void { this.removeAttribute('open'); }

  // ── 이벤트 바인딩 ─────────────────────────────────────────────────────────

  private _bind(): void {
    this.shadow.querySelector('.x-btn')!.addEventListener('click', () => this.close());
    this.addEventListener('click', e => { if (e.composedPath()[0] === this) this.close(); });
    this.addEventListener('keydown', e => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Escape') {
        if (this._saveFormOpen) this._closeSaveForm();
        else this.close();
      }
    });

    // 검색
    (this.shadow.getElementById('search-input') as HTMLInputElement)
      .addEventListener('input', e => {
        this.tree.setFilter((e.target as HTMLInputElement).value);
      });

    // 폴더 추가
    this.shadow.getElementById('btn-add-folder')!.addEventListener('click', () => {
      const sel = this.tree.getSelected();
      const parentId = sel?.type === 'folder' ? sel.id : null;
      const pub = sel?.isPublic ?? false;
      this.tree.addFolder(parentId, isAdmin() ? pub : false);
    });

    // 저장 폼 토글
    this.shadow.getElementById('btn-save-tmpl')!.addEventListener('click', () => {
      this._saveFormOpen ? this._closeSaveForm() : this._openSaveForm();
    });

    // 저장 폼 취소
    this.shadow.getElementById('sf-cancel')!.addEventListener('click', () => this._closeSaveForm());

    // 저장 실행
    this.shadow.getElementById('sf-ok')!.addEventListener('click', () => this._doSave());
    (this.shadow.getElementById('sf-name') as HTMLInputElement)
      .addEventListener('keydown', e => { if (e.key === 'Enter') this._doSave(); });

    // 공용 라디오 비활성화 (비관리자)
    if (!isAdmin()) {
      const pubLabel = this.shadow.getElementById('sf-public-label')!;
      pubLabel.classList.add('disabled');
    }

    // 적용 버튼
    this.shadow.getElementById('btn-append')!    .addEventListener('click', () => this._apply('append'));
    this.shadow.getElementById('btn-replace')!   .addEventListener('click', () => this._apply('replace'));
    this.shadow.getElementById('btn-apply-quick')!.addEventListener('click', () => this._apply('replace'));

    // 관리자 전용: 임시 데이터 정리 버튼
    if (isAdmin()) {
      const cleanupBtn = document.createElement('button');
      cleanupBtn.className = 'left-action-btn danger';
      cleanupBtn.title = '임시/테스트 데이터 일괄 삭제 (관리자 전용)';
      cleanupBtn.innerHTML = `${Icons.trash} 정리`;
      this.shadow.querySelector('.left-btns')!.appendChild(cleanupBtn);
      cleanupBtn.addEventListener('click', () => void this._adminCleanup());
    }

    // 링크 복사 이벤트
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

  // ── 저장 폼 열기/닫기 ─────────────────────────────────────────────────────

  private _openSaveForm(): void {
    this._saveFormOpen = true;
    this._fillFolderSelect();
    (this.shadow.getElementById('sf-name') as HTMLInputElement).value = '';
    this.shadow.getElementById('save-form')!.classList.add('visible');
    this.shadow.getElementById('btn-save-tmpl')!.classList.add('active');
    setTimeout(() => (this.shadow.getElementById('sf-name') as HTMLInputElement).focus(), 50);
  }

  private _closeSaveForm(): void {
    this._saveFormOpen = false;
    this.shadow.getElementById('save-form')!.classList.remove('visible');
    this.shadow.getElementById('btn-save-tmpl')!.classList.remove('active');
  }

  // ── content 보장 ─────────────────────────────────────────────────────────

  /** content 가 없으면 서버 단건 API 로 가져와 캐시 후 반환 */
  private async _ensureContent(): Promise<string> {
    if (!this.selected) return '';
    if (this.selected.content) return this.selected.content;
    const serverId = toServerId(this.selected.id);
    if (serverId === null) return '';
    try {
      const node = await TemplateApiClient.getTemplate(serverId);
      this.selected = { ...this.selected, content: node.content ?? '' };
      return this.selected.content ?? '';
    } catch {
      return '';
    }
  }

  // ── 미리보기 ──────────────────────────────────────────────────────────────

  private async _refreshPreview(): Promise<void> {
    const emptyEl   = this.shadow.getElementById('preview-empty')!;
    const contentEl = this.shadow.getElementById('preview-content')!;
    const frame     = this.shadow.getElementById('preview-frame') as HTMLIFrameElement;
    const appendBtn = this.shadow.getElementById('btn-append')  as HTMLButtonElement;
    const replBtn   = this.shadow.getElementById('btn-replace') as HTMLButtonElement;

    if (!this.selected || this.selected.type !== 'template') {
      emptyEl.classList.remove('hidden');
      contentEl.classList.add('hidden');
      appendBtn.disabled = true;
      replBtn.disabled   = true;
      return;
    }

    // 이름·날짜를 먼저 표시하고 content 를 비동기 로드
    (this.shadow.getElementById('info-name')!).textContent = this.selected.name;
    (this.shadow.getElementById('info-date')!).textContent =
      new Date(this.selected.updatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
      });
    emptyEl.classList.add('hidden');
    contentEl.classList.remove('hidden');
    appendBtn.disabled = false;
    replBtn.disabled   = false;

    const rawContent = await this._ensureContent();
    const clean = String(DOMPurify.sanitize(rawContent, {
      ADD_TAGS: ['textarea'],
      ADD_ATTR: [
        'data-field-id', 'data-placeholder', 'data-label',
        'data-field-type', 'data-prefix', 'data-suffix',
        'data-multiline', 'data-number-format', 'data-date-format',
        'data-width', 'data-height', 'data-size-fixed', 'data-raw-value',
        'contenteditable', 'rows',
      ],
      FORCE_BODY: true,
    }));

    frame.srcdoc = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
<style>
body{font-family:'Noto Sans KR',sans-serif;font-size:11pt;line-height:1.6;padding:16px;margin:0;color:#222;}
h1,h2,h3{margin:.5em 0;}p{margin:.4em 0;}
ul,ol{margin:.4em 0;padding-left:1.5em;}hr{border:none;border-top:1px solid #e5e7eb;}
table{border-collapse:collapse;width:100%;}td,th{border:1px solid #ccc;padding:4px 8px;}
.poa-field input,.poa-field textarea{
  border:1px solid #93C5FD;border-radius:4px;background:#EFF6FF;color:#1E40AF;
  font-size:inherit;font-family:inherit;padding:2px 4px;pointer-events:none;}
.poa-field-drag-handle,.poa-field-resize-handle{display:none;}
</style>
</head><body>${clean}</body></html>`;
  }

  // ── 적용 ──────────────────────────────────────────────────────────────────

  private async _apply(mode: 'append' | 'replace'): Promise<void> {
    if (!this.selected) return;
    const content = await this._ensureContent();
    if (!content) return;
    const html = String(DOMPurify.sanitize(content, {
      ADD_TAGS: ['textarea'],
      ADD_ATTR: [
        'data-field-id', 'data-placeholder', 'data-label',
        'data-field-type', 'data-prefix', 'data-suffix',
        'data-multiline', 'data-number-format', 'data-date-format',
        'data-font-size', 'data-text-align', 'data-font-family',
        'data-width', 'data-height', 'data-size-fixed', 'data-raw-value',
        'value', 'rows',
      ],
      FORCE_BODY: true,
    }));
    this.dispatchEvent(new CustomEvent('poa-tmpl-insert', {
      bubbles: true, composed: true,
      detail: { html, mode },
    }));
    this.close();
  }

  // ── 저장 ──────────────────────────────────────────────────────────────────

  private _doSave(): void {
    const name = (this.shadow.getElementById('sf-name') as HTMLInputElement).value.trim();
    if (!name) {
      (this.shadow.getElementById('sf-name') as HTMLInputElement).focus();
      return;
    }
    const folderId = (this.shadow.getElementById('sf-folder') as HTMLSelectElement).value || null;
    const isPublicSelected = (this.shadow.getElementById('sf-public') as HTMLInputElement).checked;
    const isPublic = isPublicSelected && isAdmin();
    const html = this._getEditorHTML?.() ?? '';
    this.mgr.addTemplate(name, html, folderId, isPublic);
    this.tree.render();
    this._closeSaveForm();
    this._showToast(`"${name}" 저장 완료`);
  }

  private _fillFolderSelect(): void {
    const sel = this.shadow.getElementById('sf-folder') as HTMLSelectElement;
    sel.innerHTML = '<option value="">폴더 없음</option>';
    for (const f of this.mgr.getFolders()) {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = (f.isPublic ? '[공용] ' : '[내] ') + f.name;
      sel.appendChild(opt);
    }
  }

  private async _adminCleanup(): Promise<void> {
    try {
      await TemplateApiClient.adminCleanup();
      this._showToast('서버 임시 데이터 정리 완료');
    } catch {
      this._showToast('서버 정리 실패 (로컬만 정리됨)');
    }
    this.mgr.reload();
    this.tree.setManager(this.mgr);
  }

  private _showToast(msg: string): void {
    const t = document.createElement('div');
    t.className = 'tmpl-toast';
    t.textContent = msg;
    this.shadow.querySelector('.dlg')!.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
}
