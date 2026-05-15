/** crypto.getRandomValues로 nanoid 수준의 고유 12자 16진수 ID를 생성한다 */
function generateId() {
    const arr = new Uint8Array(6);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}
/**
 * contenteditable 루트 내 책갈피 앵커를 관리한다.
 * 책갈피: <a id="bm-{id}" class="poa-bookmark" data-label="레이블">
 * CRUD: insert / getAll / update / remove
 */
export class BookmarkManager {
    root;
    savedRange = null;
    constructor(root) {
        this.root = root;
    }
    /** 다이얼로그를 열기 전에 현재 선택 범위를 저장 */
    saveSelection() {
        const sel = this.root.ownerDocument.getSelection();
        if (sel && sel.rangeCount > 0) {
            this.savedRange = sel.getRangeAt(0).cloneRange();
        }
    }
    /** 커서 위치에 책갈피 앵커를 삽입하고 생성된 ID를 반환한다 */
    insert(label) {
        const id = `bm-${generateId()}`;
        const doc = this.root.ownerDocument;
        const anchor = doc.createElement('a');
        anchor.id = id;
        anchor.setAttribute('name', id);
        anchor.className = 'poa-bookmark';
        anchor.setAttribute('data-label', label);
        anchor.title = label || id;
        anchor.textContent = `[${label || id}]`;
        anchor.contentEditable = 'false';
        this.insertAtRange(anchor);
        return id;
    }
    /** 문서 내 모든 책갈피 목록을 반환한다 */
    getAll() {
        return Array.from(this.root.querySelectorAll('a.poa-bookmark[id^="bm-"]')).map((el) => ({
            id: el.id,
            label: el.getAttribute('data-label') ?? el.id,
            element: el,
        }));
    }
    /** 책갈피 레이블을 수정한다 */
    update(id, label) {
        const el = this.root.querySelector(`a[id="${id}"]`);
        if (!el)
            throw new Error(`책갈피 '${id}'를 찾을 수 없습니다.`);
        el.setAttribute('data-label', label);
        el.title = label;
        el.textContent = `[${label || id}]`;
    }
    /** 책갈피 앵커를 삭제한다 */
    remove(id) {
        this.root.querySelector(`a[id="${id}"]`)?.remove();
    }
    insertAtRange(node) {
        const doc = this.root.ownerDocument;
        const sel = doc.getSelection();
        let range;
        if (this.savedRange) {
            range = this.savedRange.cloneRange();
            this.savedRange = null;
        }
        else if (sel && sel.rangeCount > 0) {
            range = sel.getRangeAt(0);
        }
        else {
            range = doc.createRange();
            range.selectNodeContents(this.root);
            range.collapse(false);
        }
        range.collapse(true);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
}
