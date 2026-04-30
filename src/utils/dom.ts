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
