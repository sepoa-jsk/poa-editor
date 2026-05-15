const LIST_TAGS = new Set(['ul', 'ol']);
/** 선택 블록에서 직접 자식 p/div/li 노드를 수집한다.
 *  직접 자식이 ul/ol인 경우 li 자식까지 투명하게 펼쳐 반환한다. */
function getBlocksInRange(contentEl, range) {
    const blocks = [];
    const children = Array.from(contentEl.children);
    const expandIfList = (el) => LIST_TAGS.has(el.tagName.toLowerCase())
        ? Array.from(el.children)
        : [el];
    if (range.collapsed) {
        const el = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : range.startContainer;
        const block = children.find(c => c === el || c.contains(el));
        if (block)
            blocks.push(...expandIfList(block));
        return blocks;
    }
    for (const child of children) {
        if (range.intersectsNode(child))
            blocks.push(...expandIfList(child));
    }
    return blocks;
}
/** 블록이 list 컨텍스트(ul/ol의 직접 li)인지 확인 */
function isListItem(el) {
    return el.tagName === 'LI';
}
/**
 * 글머리 기호(ul/ol) 토글 및 위/아래 첨자 적용을 담당한다.
 *
 * - toggleList('ul'|'ol'): 선택 단락을 목록으로 변환 / 이미 목록이면 해제
 * - toggleSuperSub('sup'|'sub'): 선택 텍스트에 위/아래 첨자 토글
 * - handleTab(e): 목록 내 Tab(들여쓰기) / Shift+Tab(내어쓰기) 처리
 */
export class ListManager {
    contentEl;
    constructor(contentEl) {
        this.contentEl = contentEl;
    }
    // ── 공개 API ────────────────────────────────────────────────────
    /**
     * 선택 단락을 ul/ol 목록으로 변환한다.
     * 이미 같은 종류의 목록이면 일반 단락으로 복원한다.
     */
    toggleList(type) {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        const range = sel.getRangeAt(0);
        const blocks = getBlocksInRange(this.contentEl, range);
        if (blocks.length === 0)
            return;
        // 선택 블록이 모두 이미 같은 type의 list인지 판단
        const allSameList = blocks.every(b => {
            if (!isListItem(b))
                return false;
            return (b.parentElement?.tagName.toLowerCase() === type);
        });
        if (allSameList) {
            // 목록 해제: li → p
            this.unlistBlocks(blocks);
        }
        else {
            // 목록 변환
            this.listifyBlocks(blocks, type);
        }
    }
    /**
     * 선택 텍스트에 위/아래 첨자를 토글한다.
     * 이미 해당 태그면 언래핑, 아니면 래핑한다.
     */
    toggleSuperSub(tag) {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        const range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        const ownerDoc = this.contentEl.ownerDocument;
        const opposite = tag === 'sup' ? 'sub' : 'sup';
        const ancestorTag = this.findAncestorTag(range.commonAncestorContainer, tag);
        const ancestorOpposite = this.findAncestorTag(range.commonAncestorContainer, opposite);
        const alreadyWrapped = ancestorTag !== null
            || this.isWrappedWith(range.cloneContents(), tag);
        if (alreadyWrapped) {
            // 이미 해당 태그 — 언래핑
            const el = ancestorTag ?? (() => {
                const extracted = range.extractContents();
                this.unwrapTag(extracted, tag);
                range.insertNode(extracted);
                return null;
            })();
            if (el) {
                const parent = el.parentNode;
                while (el.firstChild)
                    parent.insertBefore(el.firstChild, el);
                parent.removeChild(el);
            }
        }
        else if (ancestorOpposite) {
            // 반대 태그 안에 있는 경우 → 반대 태그를 새 태그로 교체
            const newEl = ownerDoc.createElement(tag);
            while (ancestorOpposite.firstChild)
                newEl.appendChild(ancestorOpposite.firstChild);
            ancestorOpposite.parentNode.replaceChild(newEl, ancestorOpposite);
            sel.removeAllRanges();
            const newRange = ownerDoc.createRange();
            newRange.selectNodeContents(newEl);
            sel.addRange(newRange);
        }
        else {
            // 일반 래핑
            const r = sel.rangeCount ? sel.getRangeAt(0) : range;
            if (r.collapsed)
                return;
            const extracted = r.extractContents();
            this.unwrapTag(extracted, opposite);
            const el = ownerDoc.createElement(tag);
            el.appendChild(extracted);
            r.insertNode(el);
            sel.removeAllRanges();
            const newRange = ownerDoc.createRange();
            newRange.selectNodeContents(el);
            sel.addRange(newRange);
        }
    }
    /**
     * 목록 내에서 Tab / Shift+Tab을 처리한다.
     * @returns true이면 기본 동작을 막아야 함
     */
    handleTab(e) {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0)
            return false;
        const range = sel.getRangeAt(0);
        // 커서가 li 안에 있는지 확인
        let node = range.startContainer;
        let li = null;
        while (node && node !== this.contentEl) {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'LI') {
                li = node;
                break;
            }
            node = node.parentNode;
        }
        if (!li)
            return false;
        e.preventDefault();
        if (e.shiftKey) {
            this.outdentListItem(li);
        }
        else {
            this.indentListItem(li);
        }
        return true;
    }
    // ── 내부 헬퍼 ────────────────────────────────────────────────────
    listifyBlocks(blocks, type) {
        const ownerDoc = this.contentEl.ownerDocument;
        // 블록이 이미 다른 타입의 list인 경우 → 부모 태그만 교체
        const firstBlock = blocks[0];
        const parentList = firstBlock.parentElement;
        if (isListItem(firstBlock) && parentList && ['ul', 'ol'].includes(parentList.tagName.toLowerCase())) {
            // 부모 ul/ol 태그를 새 type으로 교체
            const newList = ownerDoc.createElement(type);
            newList.innerHTML = parentList.innerHTML;
            parentList.replaceWith(newList);
            return;
        }
        // 연속된 블록들을 하나의 list로 묶는다
        const list = ownerDoc.createElement(type);
        const firstParent = firstBlock.parentElement;
        for (const block of blocks) {
            const li = ownerDoc.createElement('li');
            // 기존 블록 내용을 li로 이전
            while (block.firstChild)
                li.appendChild(block.firstChild);
            list.appendChild(li);
        }
        // 첫 번째 블록 위치에 list 삽입 후 나머지 블록 제거
        firstParent?.insertBefore(list, firstBlock);
        for (const block of blocks)
            block.remove();
    }
    unlistBlocks(blocks) {
        const ownerDoc = this.contentEl.ownerDocument;
        for (const li of blocks) {
            const parentList = li.parentElement;
            if (!parentList)
                continue;
            const p = ownerDoc.createElement('p');
            while (li.firstChild)
                p.appendChild(li.firstChild);
            parentList.parentElement?.insertBefore(p, parentList);
            li.remove();
            // 목록이 비었으면 제거
            if (parentList.children.length === 0)
                parentList.remove();
        }
    }
    indentListItem(li) {
        const prev = li.previousElementSibling;
        if (!prev)
            return;
        const ownerDoc = this.contentEl.ownerDocument;
        const parentTag = li.parentElement?.tagName.toLowerCase() ?? 'ul';
        // 이전 형제의 마지막 자식이 같은 타입 list이면 거기에 추가
        const lastChild = prev.lastElementChild;
        if (lastChild && ['ul', 'ol'].includes(lastChild.tagName.toLowerCase())) {
            lastChild.appendChild(li);
        }
        else {
            const nested = ownerDoc.createElement(parentTag);
            nested.appendChild(li);
            prev.appendChild(nested);
        }
    }
    outdentListItem(li) {
        const parentList = li.parentElement;
        if (!parentList)
            return;
        const grandParentLi = parentList.parentElement;
        if (!grandParentLi || grandParentLi.tagName !== 'LI')
            return;
        const grandParentList = grandParentLi.parentElement;
        if (!grandParentList)
            return;
        // li를 grandParentLi 뒤로 이동
        grandParentList.insertBefore(li, grandParentLi.nextSibling);
        // 원래 중첩 목록이 비었으면 제거
        if (parentList.children.length === 0)
            parentList.remove();
    }
    findAncestorTag(node, tag) {
        let cur = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
        while (cur && cur !== this.contentEl) {
            if (cur.nodeType === Node.ELEMENT_NODE && cur.tagName.toLowerCase() === tag) {
                return cur;
            }
            cur = cur.parentNode;
        }
        return null;
    }
    isWrappedWith(fragment, tag) {
        const text = fragment.textContent ?? '';
        if (!text.trim())
            return false;
        const walker = this.contentEl.ownerDocument.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();
        while (textNode) {
            let cur = textNode.parentNode;
            let found = false;
            while (cur && cur !== fragment) {
                if (cur.tagName?.toLowerCase() === tag) {
                    found = true;
                    break;
                }
                cur = cur.parentNode;
            }
            if (!found)
                return false;
            textNode = walker.nextNode();
        }
        return true;
    }
    unwrapTag(node, tag) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            if (el.tagName.toLowerCase() === tag) {
                while (el.firstChild)
                    el.parentNode?.insertBefore(el.firstChild, el);
                el.parentNode?.removeChild(el);
                return;
            }
        }
        // Recurse into element children AND DocumentFragment children
        Array.from(node.childNodes).forEach(child => this.unwrapTag(child, tag));
    }
}
