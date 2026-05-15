import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LinkInserter, validateLinkUrl } from '../../src/modules/insert/LinkInserter';
import { BookmarkManager } from '../../src/modules/insert/BookmarkManager';
// ── validateLinkUrl ───────────────────────────────────────────────────────────
describe('validateLinkUrl', () => {
    it('https:// URL은 유효하다', () => {
        expect(validateLinkUrl('https://example.com')).toBe(true);
        expect(validateLinkUrl('https://example.com/path?q=1#hash')).toBe(true);
    });
    it('http:// URL은 유효하다', () => {
        expect(validateLinkUrl('http://localhost:3000')).toBe(true);
    });
    it('mailto: / tel: URL은 유효하다', () => {
        expect(validateLinkUrl('mailto:user@example.com')).toBe(true);
        expect(validateLinkUrl('tel:+821012345678')).toBe(true);
    });
    it('빈 문자열은 유효하지 않다', () => {
        expect(validateLinkUrl('')).toBe(false);
    });
    it('프로토콜 없는 도메인은 유효하지 않다', () => {
        expect(validateLinkUrl('example.com')).toBe(false);
        expect(validateLinkUrl('www.example.com')).toBe(false);
    });
    it('#anchor 형식의 내부 책갈피 링크는 유효하다', () => {
        expect(validateLinkUrl('#bm-abc123')).toBe(true);
        expect(validateLinkUrl('#section1')).toBe(true);
    });
    it('# 만 있는 것은 유효하지 않다', () => {
        expect(validateLinkUrl('#')).toBe(false);
    });
});
// ── LinkInserter ──────────────────────────────────────────────────────────────
describe('LinkInserter', () => {
    let root;
    let inserter;
    function setRange(container, offset = 0) {
        const range = document.createRange();
        range.setStart(container, offset);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    beforeEach(() => {
        root = document.createElement('div');
        root.contentEditable = 'true';
        document.body.appendChild(root);
        inserter = new LinkInserter(root);
    });
    afterEach(() => {
        root.remove();
        window.getSelection()?.removeAllRanges();
    });
    it('유효하지 않은 URL이면 에러를 던진다', () => {
        expect(() => inserter.insertLink({ href: 'not-a-url', text: '링크' })).toThrow('유효하지 않은 URL');
    });
    it('insertLink로 <a> 엘리먼트가 root에 삽입된다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '예시' });
        const anchor = root.querySelector('a');
        expect(anchor).not.toBeNull();
        expect(anchor.textContent).toBe('예시');
        expect(anchor.href).toContain('example.com');
    });
    it('target="_blank" 시 rel="noopener noreferrer" 자동 주입', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '새탭', target: '_blank' });
        const anchor = root.querySelector('a');
        expect(anchor.target).toBe('_blank');
        expect(anchor.rel).toBe('noopener noreferrer');
    });
    it('target="_self"이면 rel이 설정되지 않는다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '현재탭', target: '_self' });
        const anchor = root.querySelector('a');
        expect(anchor.target).toBe('_self');
        expect(anchor.rel).toBe('');
    });
    it('saveSelection 후 insertLink가 저장된 위치에 삽입한다', () => {
        root.innerHTML = '<p>앞뒤</p>';
        const p = root.querySelector('p');
        const range = document.createRange();
        range.setStart(p.firstChild, 1); // '앞' 뒤
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        inserter.saveSelection();
        sel.removeAllRanges(); // selection 제거
        inserter.insertLink({ href: 'https://x.com', text: '링크' });
        const anchor = root.querySelector('a');
        expect(anchor).not.toBeNull();
        expect(p.textContent).toContain('앞');
    });
    it('title 속성이 anchor에 설정된다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '링크', title: '툴팁' });
        const anchor = root.querySelector('a');
        expect(anchor.title).toBe('툴팁');
    });
    it('updateLink로 href와 rel이 수정된다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://a.com', text: '링크' });
        const anchor = root.querySelector('a');
        inserter.updateLink(anchor, { href: 'https://b.com', target: '_blank' });
        expect(anchor.href).toContain('b.com');
        expect(anchor.rel).toBe('noopener noreferrer');
    });
    it('removeLink로 <a>가 제거되고 텍스트만 남는다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '링크텍스트' });
        const anchor = root.querySelector('a');
        inserter.removeLink(anchor);
        expect(root.querySelector('a')).toBeNull();
        expect(root.textContent).toContain('링크텍스트');
    });
    it('내부 책갈피 링크 (#id)는 유효하게 삽입된다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: '#bm-abc123', text: '절로 이동' });
        const anchor = root.querySelector('a');
        expect(anchor.getAttribute('href')).toBe('#bm-abc123');
    });
    it('text가 비어있으면 href가 링크 텍스트로 사용된다', () => {
        setRange(root, 0);
        inserter.insertLink({ href: 'https://example.com', text: '' });
        const anchor = root.querySelector('a');
        expect(anchor.textContent).toBe('https://example.com');
    });
});
// ── BookmarkManager ───────────────────────────────────────────────────────────
describe('BookmarkManager', () => {
    let root;
    let manager;
    beforeEach(() => {
        root = document.createElement('div');
        root.contentEditable = 'true';
        document.body.appendChild(root);
        manager = new BookmarkManager(root);
    });
    afterEach(() => {
        root.remove();
        window.getSelection()?.removeAllRanges();
    });
    it('insert는 bm- 접두사를 가진 ID를 반환하고 DOM에 삽입한다', () => {
        const range = document.createRange();
        range.setStart(root, 0);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        const id = manager.insert('섹션 A');
        expect(id).toMatch(/^bm-[0-9a-f]{12}$/);
        const anchor = root.querySelector(`a#${id}`);
        expect(anchor).not.toBeNull();
        expect(anchor.classList.contains('poa-bookmark')).toBe(true);
        expect(anchor.getAttribute('data-label')).toBe('섹션 A');
    });
    it('getAll은 삽입된 책갈피 목록을 반환한다', () => {
        const setRangeAt = (offset) => {
            const range = document.createRange();
            range.selectNodeContents(root);
            range.collapse(offset === 0);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        };
        setRangeAt(0);
        manager.insert('첫 번째');
        setRangeAt(1);
        manager.insert('두 번째');
        const all = manager.getAll();
        expect(all).toHaveLength(2);
        expect(all[0].label).toBe('첫 번째');
        expect(all[1].label).toBe('두 번째');
    });
    it('update는 레이블과 텍스트를 수정한다', () => {
        const range = document.createRange();
        range.setStart(root, 0);
        range.collapse(true);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        const id = manager.insert('원래 레이블');
        manager.update(id, '수정된 레이블');
        const anchor = root.querySelector(`a#${id}`);
        expect(anchor.getAttribute('data-label')).toBe('수정된 레이블');
        expect(anchor.title).toBe('수정된 레이블');
        expect(anchor.textContent).toContain('수정된 레이블');
    });
    it('remove는 책갈피 앵커를 DOM에서 제거한다', () => {
        const range = document.createRange();
        range.setStart(root, 0);
        range.collapse(true);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        const id = manager.insert('삭제할 책갈피');
        expect(root.querySelector(`a#${id}`)).not.toBeNull();
        manager.remove(id);
        expect(root.querySelector(`a#${id}`)).toBeNull();
    });
    it('존재하지 않는 ID로 update 시 에러를 던진다', () => {
        expect(() => manager.update('bm-nonexistent', '레이블')).toThrow("책갈피 'bm-nonexistent'를");
    });
});
