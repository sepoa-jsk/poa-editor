import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FileManager } from '../../src/modules/file/FileManager';
describe('FileManager', () => {
    let fm;
    beforeEach(() => {
        fm = new FileManager();
    });
    afterEach(() => {
        fm.destroy();
    });
    it('isDirty returns false initially', () => {
        expect(fm.isDirty()).toBe(false);
    });
    it('markDirty sets dirty to true', () => {
        fm.markDirty();
        expect(fm.isDirty()).toBe(true);
    });
    it('markClean resets dirty to false', () => {
        fm.markDirty();
        fm.markClean();
        expect(fm.isDirty()).toBe(false);
    });
    it('getCurrentName returns default "새 문서"', () => {
        expect(fm.getCurrentName()).toBe('새 문서');
    });
    it('htmlToPlainText strips HTML tags', () => {
        const plain = fm.htmlToPlainText('<p>Hello <b>World</b></p>');
        expect(plain).toBe('Hello World');
    });
    it('htmlToPlainText returns empty string for empty input', () => {
        expect(fm.htmlToPlainText('')).toBe('');
    });
    it('hasFileSystemAccess returns a boolean', () => {
        expect(typeof fm.hasFileSystemAccess()).toBe('boolean');
    });
    it('newDocument resets name and clears dirty flag', () => {
        fm.markDirty();
        fm.newDocument();
        expect(fm.isDirty()).toBe(false);
        expect(fm.getCurrentName()).toBe('새 문서');
    });
    it('saveAsFile with download fallback returns true and marks clean', async () => {
        // Stub out browser APIs not available in jsdom
        const createObjectURL = vi.fn().mockReturnValue('blob:mock');
        const revokeObjectURL = vi.fn();
        const clickFn = vi.fn();
        vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
        // Intercept createElement('a') to prevent real DOM click
        const origCreate = document.createElement.bind(document);
        vi.spyOn(document, 'createElement').mockImplementation((tag) => {
            const el = origCreate(tag);
            if (tag === 'a') {
                Object.defineProperty(el, 'click', { value: clickFn });
            }
            return el;
        });
        fm.markDirty();
        // hasFileSystemAccess() is false in jsdom → download fallback
        const result = await fm.saveAsFile('<p>save</p>', 'test.html');
        expect(result).toBe(true);
        expect(fm.isDirty()).toBe(false);
        expect(clickFn).toHaveBeenCalled();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });
});
