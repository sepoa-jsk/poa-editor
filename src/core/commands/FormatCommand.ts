import { BaseCommand } from './BaseCommand';
import type { FormatTag } from '../types';

/**
 * Selection API + Range API 기반 인라인 서식 토글 커맨드.
 * document.execCommand 사용 금지 — Range.extractContents / insertNode 사용.
 *
 * 의존성 주입 원칙: ownerDocument와 Range를 외부에서 받아 전역 DOM에 직접 접근하지 않음.
 */
export class FormatCommand extends BaseCommand {
  private readonly tag: FormatTag;
  /** 생성 시점에 캡처한 Range 스냅샷 */
  private readonly savedRange: Range;
  /** 주입된 Document — window/document 전역 참조 대신 사용 */
  private readonly ownerDocument: Document;

  /** 마지막 execute()가 감싸기(true) / 제거(false) 중 어느 쪽이었는지 */
  private lastActionWasWrap = false;

  /** applyFormat 이후 생성된 래퍼 엘리먼트 (undoWrap에서 제거) */
  private wrappedElement: Element | null = null;

  /** removeFormat 이후 부모 엘리먼트에 분산된 자식 노드 목록 (undoRemove에서 재집결) */
  private movedChildren: Node[] | null = null;
  private movedChildrenParent: Node | null = null;
  /** 원래 조상 엘리먼트의 nextSibling — 재삽입 위치 기준점 */
  private movedChildrenAnchor: Node | null = null;

  constructor(tag: FormatTag, range: Range, ownerDocument: Document) {
    super(`format:${tag}`);
    this.tag = tag;
    this.savedRange = range.cloneRange();
    this.ownerDocument = ownerDocument;
  }

  execute(): void {
    const range = this.savedRange.cloneRange();
    if (range.collapsed) return;

    const sel = this.ownerDocument.getSelection();

    if (this.isTagActive(range)) {
      this.lastActionWasWrap = false;
      this.removeFormat(range, sel);
    } else {
      this.lastActionWasWrap = true;
      this.applyFormat(range, sel);
    }
  }

  undo(): void {
    if (this.lastActionWasWrap) {
      this.undoWrap();
    } else {
      this.undoRemove();
    }
  }

  /** 주어진 Range에 이 커맨드의 서식 태그가 이미 적용되어 있는지 확인 */
  isTagActive(range: Range): boolean {
    return this.findAncestor(range.commonAncestorContainer, this.tag) !== null;
  }

  /**
   * 선택 영역을 서식 태그로 감싼다.
   * Range.extractContents() → appendChild → insertNode 순서로 DOM 변형.
   */
  private applyFormat(range: Range, sel: Selection | null): void {
    const wrapper = this.ownerDocument.createElement(this.tag);
    try {
      const fragment = range.extractContents();
      wrapper.appendChild(fragment);
      range.insertNode(wrapper);
      this.wrappedElement = wrapper;

      if (sel) {
        sel.removeAllRanges();
        const newRange = this.ownerDocument.createRange();
        newRange.selectNodeContents(wrapper);
        sel.addRange(newRange);
      }
    } catch {
      // Range가 블록 경계를 가로지르는 경우 — 추후 스프린트에서 개선
    }
  }

  /**
   * 선택 영역을 감싸고 있는 서식 태그를 제거한다.
   * 자식 노드를 부모로 이동시키고 태그 엘리먼트를 삭제.
   */
  private removeFormat(range: Range, sel: Selection | null): void {
    const ancestor = this.findAncestor(range.commonAncestorContainer, this.tag);
    if (!ancestor || !ancestor.parentNode) return;

    const parent = ancestor.parentNode;
    const childNodes: Node[] = Array.from(ancestor.childNodes);
    const nextSib = ancestor.nextSibling;

    childNodes.forEach(child => parent.insertBefore(child, ancestor));
    parent.removeChild(ancestor);

    // undo를 위해 이동된 노드 정보 보관
    this.movedChildren = childNodes;
    this.movedChildrenParent = parent;
    this.movedChildrenAnchor = nextSib;

    if (sel && childNodes.length > 0) {
      sel.removeAllRanges();
      const newRange = this.ownerDocument.createRange();
      newRange.setStartBefore(childNodes[0]);
      newRange.setEndAfter(childNodes[childNodes.length - 1]);
      sel.addRange(newRange);
    }
  }

  /** applyFormat 역방향: 생성된 래퍼 엘리먼트를 제거하고 자식 노드를 원위치 */
  private undoWrap(): void {
    if (!this.wrappedElement || !this.wrappedElement.parentNode) return;
    const parent = this.wrappedElement.parentNode;
    Array.from(this.wrappedElement.childNodes).forEach(child =>
      parent.insertBefore(child, this.wrappedElement!)
    );
    parent.removeChild(this.wrappedElement);
    this.wrappedElement = null;
  }

  /** removeFormat 역방향: 흩어진 자식 노드들을 새 태그 엘리먼트로 재집결하여 원위치에 삽입 */
  private undoRemove(): void {
    if (!this.movedChildren || !this.movedChildrenParent) return;
    const newWrapper = this.ownerDocument.createElement(this.tag);
    this.movedChildren.forEach(child => newWrapper.appendChild(child));
    this.movedChildrenParent.insertBefore(newWrapper, this.movedChildrenAnchor);
    this.movedChildren = null;
    this.movedChildrenParent = null;
    this.movedChildrenAnchor = null;
  }

  /** node에서 위로 순회하며 tagName과 일치하는 첫 번째 Element 반환 */
  private findAncestor(node: Node, tagName: string): Element | null {
    let current: Node | null = node;
    while (current) {
      if (
        current.nodeType === 1 /* ELEMENT_NODE */ &&
        (current as Element).tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return current as Element;
      }
      current = current.parentNode;
    }
    return null;
  }
}
