import { describe, it, expect, vi } from 'vitest';
import { SignatureManager, buildSignatureHtml, MAX_LOGO_BYTES } from '../../src/modules/signature/SignatureManager.js';
// localStorage mock
const store = {};
vi.stubGlobal('localStorage', {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = v; },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
});
const FIELDS = {
    displayName: '홍길동',
    title: '팀장',
    department: '개발팀',
    company: '테스트㈜',
    phone: '010-1234-5678',
    email: 'hong@test.com',
    website: 'https://test.com',
};
function fresh() {
    localStorage.clear();
    return new SignatureManager();
}
function sampleData() {
    return { name: '테스트 서명', layout: 1, fields: FIELDS };
}
// ── SignatureManager CRUD ────────────────────────────────────────────────────
describe('SignatureManager — add / getAll / getById', () => {
    it('add returns a new signature with id', () => {
        const mgr = fresh();
        const sig = mgr.add(sampleData());
        expect(sig.id).toBeTruthy();
        expect(sig.name).toBe('테스트 서명');
        expect(sig.layout).toBe(1);
    });
    it('getAll returns all added signatures', () => {
        const mgr = fresh();
        mgr.add(sampleData());
        mgr.add({ ...sampleData(), name: '서명 2' });
        expect(mgr.getAll()).toHaveLength(2);
    });
    it('getById returns correct signature', () => {
        const mgr = fresh();
        const sig = mgr.add(sampleData());
        expect(mgr.getById(sig.id).name).toBe('테스트 서명');
    });
    it('getById returns null for unknown id', () => {
        const mgr = fresh();
        expect(mgr.getById('nonexistent')).toBeNull();
    });
});
describe('SignatureManager — update', () => {
    it('update changes name and fields', () => {
        const mgr = fresh();
        const sig = mgr.add(sampleData());
        mgr.update(sig.id, { name: '변경된 서명' });
        expect(mgr.getById(sig.id).name).toBe('변경된 서명');
    });
    it('update returns false for unknown id', () => {
        const mgr = fresh();
        expect(mgr.update('nope', { name: '이름' })).toBe(false);
    });
    it('update sets updatedAt', () => {
        const mgr = fresh();
        const sig = mgr.add(sampleData());
        const before = sig.updatedAt;
        mgr.update(sig.id, { name: '새 이름' });
        expect(mgr.getById(sig.id).updatedAt).toBeGreaterThanOrEqual(before);
    });
});
describe('SignatureManager — delete', () => {
    it('delete removes signature', () => {
        const mgr = fresh();
        const sig = mgr.add(sampleData());
        mgr.delete(sig.id);
        expect(mgr.getById(sig.id)).toBeNull();
        expect(mgr.getAll()).toHaveLength(0);
    });
    it('delete returns false for unknown id', () => {
        const mgr = fresh();
        expect(mgr.delete('nope')).toBe(false);
    });
});
describe('SignatureManager — max count', () => {
    it('throws when adding more than 10 signatures', () => {
        const mgr = fresh();
        for (let i = 0; i < 10; i++)
            mgr.add({ ...sampleData(), name: `서명 ${i}` });
        expect(() => mgr.add(sampleData())).toThrow();
    });
    it('isFull returns true when at max', () => {
        const mgr = fresh();
        for (let i = 0; i < 10; i++)
            mgr.add({ ...sampleData(), name: `서명 ${i}` });
        expect(mgr.isFull()).toBe(true);
    });
    it('isFull returns false when below max', () => {
        const mgr = fresh();
        mgr.add(sampleData());
        expect(mgr.isFull()).toBe(false);
    });
});
describe('SignatureManager — persistence', () => {
    it('persists signatures to localStorage', () => {
        const mgr = fresh();
        mgr.add(sampleData());
        expect(localStorage.getItem('poa-signatures')).not.toBeNull();
    });
    it('reloads from localStorage on construction', () => {
        const mgr1 = fresh();
        const sig = mgr1.add(sampleData());
        const mgr2 = new SignatureManager();
        expect(mgr2.getById(sig.id).name).toBe('테스트 서명');
    });
});
// ── MAX_LOGO_BYTES ────────────────────────────────────────────────────────────
describe('MAX_LOGO_BYTES', () => {
    it('is 200 * 1024', () => {
        expect(MAX_LOGO_BYTES).toBe(200 * 1024);
    });
});
// ── buildSignatureHtml ────────────────────────────────────────────────────────
describe('buildSignatureHtml', () => {
    it('layout 1 contains name and phone', () => {
        const html = buildSignatureHtml({ layout: 1, fields: FIELDS });
        expect(html).toContain('홍길동');
        expect(html).toContain('010-1234-5678');
    });
    it('layout 1 is a table', () => {
        const html = buildSignatureHtml({ layout: 1, fields: FIELDS });
        expect(html).toMatch(/<table/);
        expect(html).toContain('poa-signature');
    });
    it('layout 4 contains hr (divider)', () => {
        const html = buildSignatureHtml({ layout: 4, fields: FIELDS });
        expect(html).toContain('<hr');
    });
    it('layout 5 has two columns', () => {
        const html = buildSignatureHtml({ layout: 5, fields: FIELDS });
        expect(html).toContain('border-right:1px solid #ddd');
    });
    it('layout 6 uses headerColor in background', () => {
        const html = buildSignatureHtml({ layout: 6, fields: FIELDS, headerColor: '#ff0000' });
        expect(html).toContain('#ff0000');
    });
    it('layout 6 shows name in header with white text', () => {
        const html = buildSignatureHtml({ layout: 6, fields: FIELDS });
        expect(html).toContain('color:#fff');
        expect(html).toContain('홍길동');
    });
    it('layout 2 without logo falls back to layout 1 style', () => {
        const html = buildSignatureHtml({ layout: 2, fields: FIELDS, logo: undefined });
        expect(html).toContain('홍길동');
    });
    it('layout 2 with logo includes img tag', () => {
        const html = buildSignatureHtml({ layout: 2, fields: FIELDS, logo: 'data:image/png;base64,abc' });
        expect(html).toContain('<img');
        expect(html).toContain('border-right:2px solid #e5e7eb');
    });
    it('escapes HTML special chars in fields', () => {
        const html = buildSignatureHtml({
            layout: 1,
            fields: { ...FIELDS, displayName: '<script>alert(1)</script>' },
        });
        expect(html).not.toContain('<script>');
        expect(html).toContain('&lt;script&gt;');
    });
});
