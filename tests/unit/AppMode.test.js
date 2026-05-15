import { describe, it, expect, beforeEach } from 'vitest';
import { getAppMode, getTemplateId, buildUserModeUrl, isAdmin, isWriteMode, isUserMode, getEditorSize } from '../../src/core/AppMode.js';
function setLocation(search, origin = 'http://localhost', pathname = '/') {
    Object.defineProperty(window, 'location', {
        value: { search, origin, pathname, href: `${origin}${pathname}${search}` },
        configurable: true,
        writable: true,
    });
}
beforeEach(() => setLocation(''));
describe('getAppMode', () => {
    it('returns user when mode=user', () => {
        setLocation('?mode=user');
        expect(getAppMode()).toBe('user');
    });
    it('returns admin when role=admin', () => {
        setLocation('?role=admin');
        expect(getAppMode()).toBe('admin');
    });
    it('returns write when mode param is absent (default)', () => {
        setLocation('');
        expect(getAppMode()).toBe('write');
    });
    it('returns write for unknown mode value', () => {
        setLocation('?mode=superuser');
        expect(getAppMode()).toBe('write');
    });
    it('returns write when mode=write', () => {
        setLocation('?mode=write');
        expect(getAppMode()).toBe('write');
    });
    it('role=admin takes priority over mode=user', () => {
        setLocation('?role=admin&mode=user');
        expect(getAppMode()).toBe('admin');
    });
});
describe('isAdmin / isWriteMode / isUserMode', () => {
    it('isAdmin returns true for role=admin', () => {
        setLocation('?role=admin');
        expect(isAdmin()).toBe(true);
    });
    it('isAdmin returns false for mode=write', () => {
        setLocation('?mode=write');
        expect(isAdmin()).toBe(false);
    });
    it('isWriteMode returns true for default (no params)', () => {
        setLocation('');
        expect(isWriteMode()).toBe(true);
    });
    it('isUserMode returns true for mode=user', () => {
        setLocation('?mode=user');
        expect(isUserMode()).toBe(true);
    });
});
describe('getTemplateId', () => {
    it('returns template id when template param present', () => {
        setLocation('?mode=user&template=abc123');
        expect(getTemplateId()).toBe('abc123');
    });
    it('returns null when template param absent', () => {
        setLocation('?mode=user');
        expect(getTemplateId()).toBeNull();
    });
    it('returns null when no query string', () => {
        setLocation('');
        expect(getTemplateId()).toBeNull();
    });
});
describe('buildUserModeUrl', () => {
    it('contains mode=user and template params', () => {
        setLocation('', 'http://example.com', '/');
        const url = buildUserModeUrl('xyz');
        expect(url).toContain('?mode=user');
        expect(url).toContain('template=xyz');
    });
    it('uses window.location.origin as base', () => {
        setLocation('', 'https://myapp.io', '/');
        const url = buildUserModeUrl('t1');
        expect(url).toMatch(/^https:\/\/myapp\.io/);
    });
    it('URL-encodes special characters in templateId', () => {
        setLocation('', 'http://localhost', '/');
        const url = buildUserModeUrl('a b+c');
        expect(url).not.toContain(' ');
    });
    it('includes subpath for GitHub Pages deployment', () => {
        setLocation('', 'https://sepoa-jsk.github.io', '/poa-editor/');
        const url = buildUserModeUrl('abc');
        expect(url).toBe('https://sepoa-jsk.github.io/poa-editor/?mode=user&template=abc');
    });
    it('strips index.html from pathname', () => {
        setLocation('', 'https://example.com', '/poa-editor/index.html');
        const url = buildUserModeUrl('t1');
        expect(url).toBe('https://example.com/poa-editor/?mode=user&template=t1');
    });
    it('works on localhost root path', () => {
        setLocation('', 'http://localhost:5173', '/');
        const url = buildUserModeUrl('t1');
        expect(url).toBe('http://localhost:5173/?mode=user&template=t1');
    });
    it('works on IP address access', () => {
        setLocation('', 'http://192.168.50.120:5173', '/');
        const url = buildUserModeUrl('t1');
        expect(url).toBe('http://192.168.50.120:5173/?mode=user&template=t1');
    });
});
describe('getEditorSize', () => {
    it('파라미터 없으면 기본값 100% 반환', () => {
        setLocation('');
        expect(getEditorSize()).toEqual({ width: '100%', height: '100%' });
    });
    it('height 파라미터 반환', () => {
        setLocation('?height=800px');
        expect(getEditorSize().height).toBe('800px');
    });
    it('width 파라미터 반환', () => {
        setLocation('?width=50%');
        expect(getEditorSize().width).toBe('50%');
    });
    it('width + height 모두 지정 시 각각 반환', () => {
        setLocation('?width=900px&height=600px');
        expect(getEditorSize()).toEqual({ width: '900px', height: '600px' });
    });
    it('height 없으면 기본값 100%', () => {
        setLocation('?width=80%');
        expect(getEditorSize().height).toBe('100%');
    });
});
