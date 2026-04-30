export class PoaStatusBar extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `
<style>
:host { display: block; box-sizing: border-box; }
.bar {
  display: flex; align-items: center; gap: 16px;
  padding: 3px 12px;
  background: var(--poa-statusbar-bg, #f5f5f5);
  border-top: 1px solid var(--poa-toolbar-border, #ddd);
  font-size: 11px; color: var(--poa-statusbar-color, #777);
  user-select: none; -webkit-user-select: none;
}
</style>
<div class="bar">
  <span id="char-count">0자</span>
  <span id="word-count">0단어</span>
</div>`;
  }

  update(html: string): void {
    const charEl = this.shadow.getElementById('char-count');
    const wordEl = this.shadow.getElementById('word-count');
    if (!charEl || !wordEl) return;

    // DOMParser is safe and produces no side-effects
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent ?? '';

    const charCount = [...text.replace(/\s/g, '')].length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    charEl.textContent = `${charCount}자`;
    wordEl.textContent = `${wordCount}단어`;
  }
}
