import { EmojiInserter, EMOJI_CATEGORIES, searchEmojis } from '../../modules/insert/EmojiInserter.js';
const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  background: #fff; border-radius: 12px;
  width: min(480px, 96vw); height: min(480px, 88vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 15px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 20px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.search-wrap { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0; }
.search-input {
  width: 100%; padding: 7px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit;
}
.search-input:focus { border-color: #2563eb; }

.body { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.emoji-area { flex: 1; overflow-y: auto; padding: 6px 8px; }

.section-label {
  font-size: 10px; font-weight: 600; color: #9ca3af; text-transform: uppercase;
  letter-spacing: .06em; padding: 4px 4px 2px; position: sticky; top: 0;
  background: #fff; z-index: 1;
}
.emoji-grid {
  display: flex; flex-wrap: wrap; gap: 1px;
}
.emoji-btn {
  width: 36px; height: 36px; border: none; background: none; cursor: pointer;
  font-size: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
  line-height: 1; padding: 0;
}
.emoji-btn:hover { background: #f3f4f6; }
.divider { border: none; border-top: 1px solid #f3f4f6; margin: 4px 0; flex-basis: 100%; }

.no-result { padding: 24px; text-align: center; color: #9ca3af; font-size: 13px; }

.cat-bar {
  display: flex; align-items: center; gap: 2px;
  padding: 6px 8px; border-top: 1px solid #f3f4f6;
  flex-shrink: 0; flex-wrap: wrap;
}
.cat-btn {
  width: 32px; height: 32px; border: none; background: none; cursor: pointer;
  font-size: 18px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
}
.cat-btn:hover   { background: #f3f4f6; }
.cat-btn.active  { background: #eff6ff; outline: 1.5px solid #2563eb; }
`;
export class PoaEmojiDialog extends HTMLElement {
    shadow;
    inserter = new EmojiInserter();
    activeCatId = EMOJI_CATEGORIES[0].id;
    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${STYLE}</style>
<div class="dlg">
  <div class="hdr"><h3>이모지</h3><button class="x-btn" aria-label="닫기">✕</button></div>
  <div class="search-wrap"><input class="search-input" id="search" type="text" placeholder="🔍 이모지 검색…"></div>
  <div class="body">
    <div class="emoji-area" id="emoji-area"></div>
    <div class="cat-bar" id="cat-bar"></div>
  </div>
</div>`;
        this._buildCatBar();
        this._bind();
    }
    open() {
        this._renderCategory(this.activeCatId);
        this.setAttribute('open', '');
        setTimeout(() => this.shadow.getElementById('search').focus(), 50);
    }
    close() { this.removeAttribute('open'); }
    // ── 빌드 ──────────────────────────────────────────────────────────────────
    _buildCatBar() {
        const bar = this.shadow.getElementById('cat-bar');
        bar.innerHTML = '';
        for (const cat of EMOJI_CATEGORIES) {
            const btn = document.createElement('button');
            btn.className = `cat-btn${cat.id === this.activeCatId ? ' active' : ''}`;
            btn.title = cat.label;
            btn.textContent = cat.icon;
            btn.dataset.catId = cat.id;
            btn.addEventListener('click', () => {
                this.activeCatId = cat.id;
                this._syncCatBar();
                this._renderCategory(cat.id);
                this.shadow.getElementById('search').value = '';
            });
            bar.appendChild(btn);
        }
    }
    _syncCatBar() {
        this.shadow.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.catId === this.activeCatId);
        });
    }
    // ── 렌더 ──────────────────────────────────────────────────────────────────
    _renderCategory(catId) {
        const area = this.shadow.getElementById('emoji-area');
        area.innerHTML = '';
        const recent = this.inserter.getRecent();
        if (recent.length > 0) {
            this._appendSection(area, '최근 사용', recent);
            const hr = document.createElement('hr');
            hr.className = 'divider';
            area.appendChild(hr);
        }
        const cat = EMOJI_CATEGORIES.find(c => c.id === catId);
        if (cat)
            this._appendSection(area, cat.label, cat.emojis);
    }
    _renderSearch(query) {
        const area = this.shadow.getElementById('emoji-area');
        area.innerHTML = '';
        const results = searchEmojis(query);
        if (results.length === 0) {
            const msg = document.createElement('div');
            msg.className = 'no-result';
            msg.textContent = `"${query}"에 대한 결과가 없습니다`;
            area.appendChild(msg);
        }
        else {
            this._appendSection(area, `검색 결과 (${results.length})`, results);
        }
    }
    _appendSection(area, label, emojis) {
        const lbl = document.createElement('div');
        lbl.className = 'section-label';
        lbl.textContent = label;
        area.appendChild(lbl);
        const grid = document.createElement('div');
        grid.className = 'emoji-grid';
        for (const emoji of emojis) {
            const btn = document.createElement('button');
            btn.className = 'emoji-btn';
            btn.textContent = emoji;
            btn.title = emoji;
            btn.addEventListener('click', () => this._pickEmoji(emoji));
            grid.appendChild(btn);
        }
        area.appendChild(grid);
    }
    // ── 바인딩 ───────────────────────────────────────────────────────────────
    _bind() {
        this.shadow.querySelector('.x-btn').addEventListener('click', () => this.close());
        this.addEventListener('click', e => { if (e.composedPath()[0] === this)
            this.close(); });
        const search = this.shadow.getElementById('search');
        search.addEventListener('input', () => {
            const q = search.value.trim();
            if (q)
                this._renderSearch(q);
            else
                this._renderCategory(this.activeCatId);
        });
        search.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                this.close();
            }
        });
    }
    // ── 선택 ─────────────────────────────────────────────────────────────────
    _pickEmoji(emoji) {
        this.dispatchEvent(new CustomEvent('poa-emoji-insert', {
            bubbles: true, composed: true,
            detail: { emoji },
        }));
        // Recent 렌더링 갱신 (inserter.addRecent는 PoaEditor에서 insert() 호출 시 처리됨)
        const search = this.shadow.getElementById('search').value.trim();
        if (!search)
            this._renderCategory(this.activeCatId);
    }
}
