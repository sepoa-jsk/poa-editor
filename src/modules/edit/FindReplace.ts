export interface FindOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
}

export interface FindState {
  count: number;
  current: number;
  replaced?: boolean;
}

/**
 * contenteditable 루트 안에서 텍스트 검색·강조·교체를 수행.
 * TreeWalker로 텍스트 노드를 수집하고, 매칭 구간을 <mark> 요소로 감싼다.
 * execCommand 미사용.
 */
export class FindReplace {
  private readonly root: HTMLElement;
  private marks: HTMLElement[] = [];
  private currentIndex = -1;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  /** query에 해당하는 모든 구간을 하이라이트하고 첫 번째로 이동 */
  find(query: string, options: FindOptions = {}): FindState {
    this.clearMarks();
    if (!query.trim()) return { count: 0, current: -1 };

    const regex = this.buildRegex(query, options);
    const textNodes = this.collectTextNodes();

    // 역순으로 처리해 DOM 변경이 이후 노드의 오프셋에 영향을 미치지 않도록 한다
    for (let ni = textNodes.length - 1; ni >= 0; ni--) {
      const node = textNodes[ni];
      const text = node.nodeValue ?? '';
      const ranges: [number, number][] = [];
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        ranges.push([m.index, m.index + m[0].length]);
      }
      for (let ri = ranges.length - 1; ri >= 0; ri--) {
        const mark = this.wrapRange(node, ranges[ri][0], ranges[ri][1]);
        if (mark) this.marks.unshift(mark);
      }
    }

    if (this.marks.length > 0) {
      this.currentIndex = 0;
      this.applyHighlight();
    }

    return { count: this.marks.length, current: this.marks.length > 0 ? 0 : -1 };
  }

  /** 다음 매칭으로 이동 */
  next(): FindState {
    if (this.marks.length === 0) return { count: 0, current: -1 };
    this.currentIndex = (this.currentIndex + 1) % this.marks.length;
    this.applyHighlight();
    return { count: this.marks.length, current: this.currentIndex };
  }

  /** 이전 매칭으로 이동 */
  prev(): FindState {
    if (this.marks.length === 0) return { count: 0, current: -1 };
    this.currentIndex = (this.currentIndex - 1 + this.marks.length) % this.marks.length;
    this.applyHighlight();
    return { count: this.marks.length, current: this.currentIndex };
  }

  /** 현재 하이라이트된 매칭을 replacement로 교체 */
  replaceCurrent(replacement: string): FindState {
    if (this.marks.length === 0 || this.currentIndex < 0) return { count: 0, current: -1 };
    const mark = this.marks[this.currentIndex];
    mark.replaceWith(this.root.ownerDocument.createTextNode(replacement));
    this.marks.splice(this.currentIndex, 1);

    if (this.marks.length === 0) {
      this.currentIndex = -1;
      return { count: 0, current: -1, replaced: true };
    }
    this.currentIndex = Math.min(this.currentIndex, this.marks.length - 1);
    this.applyHighlight();
    return { count: this.marks.length, current: this.currentIndex, replaced: true };
  }

  /** 모든 매칭을 replacement로 교체하고 교체 횟수를 반환 */
  replaceAll(query: string, replacement: string, options: FindOptions = {}): number {
    this.find(query, options);
    const count = this.marks.length;
    const doc = this.root.ownerDocument;
    for (const mark of this.marks) {
      mark.replaceWith(doc.createTextNode(replacement));
    }
    this.marks = [];
    this.currentIndex = -1;
    return count;
  }

  /** 모든 <mark> 하이라이트를 제거하고 원래 텍스트를 복원 */
  clearMarks(): void {
    for (const mark of this.marks) {
      if (!mark.parentNode) continue;
      const frag = mark.ownerDocument.createDocumentFragment();
      while (mark.firstChild) frag.appendChild(mark.firstChild);
      mark.parentNode.replaceChild(frag, mark);
    }
    this.marks = [];
    this.currentIndex = -1;
  }

  private buildRegex(query: string, options: FindOptions): RegExp {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = options.wholeWord ? `\\b${escaped}\\b` : escaped;
    return new RegExp(pattern, options.caseSensitive ? 'g' : 'gi');
  }

  private collectTextNodes(): Text[] {
    const result: Text[] = [];
    const walker = this.root.ownerDocument.createTreeWalker(
      this.root,
      NodeFilter.SHOW_TEXT,
    );
    let node: Node | null;
    while ((node = walker.nextNode()) !== null) {
      if ((node as Text).nodeValue?.trim()) result.push(node as Text);
    }
    return result;
  }

  private wrapRange(textNode: Text, start: number, end: number): HTMLElement | null {
    try {
      const doc = textNode.ownerDocument;
      const range = doc.createRange();
      range.setStart(textNode, start);
      range.setEnd(textNode, end);
      const mark = doc.createElement('mark');
      mark.dataset.poaMark = 'true';
      range.surroundContents(mark);
      return mark;
    } catch {
      return null;
    }
  }

  private applyHighlight(): void {
    this.marks.forEach((mark, i) => {
      const isCurrent = i === this.currentIndex;
      mark.style.background = isCurrent ? '#F59E0B' : '#FEF3C7';
      mark.style.color = isCurrent ? '#FFFFFF' : '';
      mark.style.outline = '';
    });
    this.marks[this.currentIndex]?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }
}
