import { describe, it, expect, beforeEach } from 'vitest';
import { getAppMode, getTemplateId, buildUserModeUrl } from '../../src/core/AppMode.js';

function setLocation(search: string, origin = 'http://localhost', pathname = '/'): void {
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

  it('returns admin when mode=admin', () => {
    setLocation('?mode=admin');
    expect(getAppMode()).toBe('admin');
  });

  it('returns admin when mode param is absent', () => {
    setLocation('');
    expect(getAppMode()).toBe('admin');
  });

  it('returns admin for unknown mode value', () => {
    setLocation('?mode=superuser');
    expect(getAppMode()).toBe('admin');
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
