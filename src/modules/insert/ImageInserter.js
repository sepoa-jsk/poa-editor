export const ALLOWED_IMG_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
/**
 * contenteditable 루트에 이미지를 삽입한다.
 * - URL 삽입: insertFromUrl(attrs)
 * - 파일 업로드 후 삽입: uploadAndInsert(file, attrs, config)
 * - alt 빈값 불가 (접근성 필수)
 * - Selection API 사용 (execCommand 미사용)
 */
export class ImageInserter {
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
    /** attrs.src URL로 이미지를 삽입. alt 비어있으면 에러를 던진다. */
    insertFromUrl(attrs) {
        if (!attrs.alt.trim()) {
            throw new Error('alt 텍스트는 필수입니다. 접근성을 위해 이미지 설명을 입력하세요.');
        }
        const img = this.buildImg(attrs);
        this.insertNode(img);
    }
    /** 파일을 업로드한 뒤 반환된 URL로 이미지를 삽입 */
    async uploadAndInsert(file, attrs, config) {
        this.validateExtension(file.name);
        const src = await this.doUpload(file, config);
        this.insertFromUrl({ ...attrs, src });
    }
    /** 파일 확장자 화이트리스트 검증 */
    validateExtension(filename) {
        const ext = filename.split('.').pop()?.toLowerCase() ?? '';
        if (!ALLOWED_IMG_EXTENSIONS.has(ext)) {
            throw new Error(`지원하지 않는 파일 형식입니다. (허용: ${[...ALLOWED_IMG_EXTENSIONS].join(', ')})`);
        }
    }
    async doUpload(file, config) {
        const formData = new FormData();
        formData.append(config.fieldName ?? 'file', file);
        const res = await fetch(config.uploadUrl, {
            method: 'POST',
            headers: config.headers,
            body: formData,
        });
        if (!res.ok)
            throw new Error(`업로드 실패: HTTP ${res.status}`);
        const json = (await res.json());
        if (!json.url)
            throw new Error('서버에서 URL을 반환하지 않았습니다.');
        return json.url;
    }
    buildImg(attrs) {
        const doc = this.root.ownerDocument;
        const img = doc.createElement('img');
        img.src = attrs.src;
        img.alt = attrs.alt;
        if (attrs.title)
            img.title = attrs.title;
        if (attrs.width)
            img.style.width = attrs.width;
        if (attrs.height)
            img.style.height = attrs.height;
        if (attrs.border)
            img.style.border = attrs.border;
        if (attrs.align === 'left' || attrs.align === 'right')
            img.style.float = attrs.align;
        if (attrs.id)
            img.id = attrs.id;
        if (attrs.className)
            img.className = attrs.className;
        return img;
    }
    insertNode(node) {
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
        range.deleteContents();
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
}
