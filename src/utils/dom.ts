import DOMPurify from 'dompurify';

/** HTML 문자열을 DOMPurify로 정제한다 (XSS 방어) */
export function sanitize(html: string): string {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

/** HTML 문자열에서 평문 텍스트를 추출한다 */
export function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
}

/** 평문 텍스트를 단순 HTML로 변환한다 (줄바꿈 → <p>) */
export function textToHtml(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      return trimmed === '' ? '<br>' : `<p>${escapeHtml(trimmed)}</p>`;
    })
    .join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** 노드가 HTMLElement인지 확인하는 타입 가드 */
export function isHTMLElement(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

const BLOCK_TAGS = new Set(['P','DIV','H1','H2','H3','H4','H5','H6','LI','BLOCKQUOTE','PRE','FIGURE','TD','TH']);

function isBlock(node: Node): node is HTMLElement {
  return isHTMLElement(node) && BLOCK_TAGS.has((node as HTMLElement).tagName);
}

function findBlockAncestor(node: Node, root: HTMLElement): HTMLElement | null {
  let cur: Node | null = node;
  while (cur && cur !== root) {
    if (isBlock(cur)) return cur;
    cur = cur.parentNode;
  }
  return null;
}

/**
 * 선택 범위 안에 포함된 블록 요소 목록을 반환한다.
 * collapsed 선택이면 커서가 속한 단일 블록을 반환하고,
 * 다중 선택이면 contentEl 직계 자식 블록 중 range와 교차하는 것을 반환한다.
 */
export function getSelectedBlocks(contentEl: HTMLElement, range: Range): HTMLElement[] {
  if (range.collapsed) {
    const block = findBlockAncestor(range.startContainer, contentEl);
    if (block) return [block];

    // 커서가 contentEl 직계(startContainer === contentEl)인 경우:
    // range.startOffset 위치 또는 바로 앞 자식 블록을 반환한다.
    // poa-form-group 같은 블록이 contentEl 직계 자식일 때 정렬이 동작하지 않던 문제 수정.
    if (range.startContainer === contentEl) {
      const at   = contentEl.childNodes[range.startOffset] as Node | undefined;
      const prev = contentEl.childNodes[range.startOffset - 1] as Node | undefined;
      if (at   && isBlock(at))   return [at   as HTMLElement];
      if (prev && isBlock(prev)) return [prev as HTMLElement];
    }
    return [];
  }

  const cac = range.commonAncestorContainer;

  // 공통 조상이 단일 블록 내부인 경우
  if (cac !== contentEl && !cac.contains(contentEl)) {
    const block = findBlockAncestor(cac, contentEl);
    if (block) return [block];
  }

  // 공통 조상이 contentEl이거나 여러 블록에 걸친 경우
  const blocks: HTMLElement[] = [];
  for (const child of Array.from(contentEl.childNodes)) {
    if (!isBlock(child)) continue;
    if (range.intersectsNode(child)) blocks.push(child);
  }
  if (blocks.length > 0) return blocks;

  // 폴백: 시작 컨테이너의 블록 조상
  const fallback = findBlockAncestor(range.startContainer, contentEl);
  return fallback ? [fallback] : [];
}

/** 이미지의 현재 정렬 상태를 반환한다 (float / margin 기반) */
export function getImageAlign(img: HTMLElement): 'left' | 'center' | 'right' | 'justify' {
  const fl = img.style.float || getComputedStyle(img).float;
  if (fl === 'left') return 'left';
  if (fl === 'right') return 'right';
  const ml = img.style.marginLeft || getComputedStyle(img).marginLeft;
  const mr = img.style.marginRight || getComputedStyle(img).marginRight;
  if (ml === 'auto' && mr === 'auto') return 'center';
  return 'left';
}

/** 표의 현재 정렬 상태를 반환한다 (margin 기반) */
export function getTableAlign(table: HTMLElement): 'left' | 'center' | 'right' {
  const ml = table.style.marginLeft || getComputedStyle(table).marginLeft;
  const mr = table.style.marginRight || getComputedStyle(table).marginRight;
  if (ml === 'auto' && mr === 'auto') return 'center';
  if (ml === 'auto' && mr !== 'auto') return 'right';
  return 'left';
}
