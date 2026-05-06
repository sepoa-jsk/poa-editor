import { describe, it, expect, beforeEach } from 'vitest';
import { getAppMode, getTemplateId, buildUserModeUrl } from '../../src/core/AppMode.js';

function setLocation(search: string, origin = 'http://localhost'): void {
  Object.defineProperty(window, 'location', {
    value: { search, origin, href: `${origin}/${search}` },
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
    setLocation('', 'http://example.com');
    const url = buildUserModeUrl('xyz');
    expect(url).toContain('?mode=user');
    expect(url).toContain('template=xyz');
  });

  it('uses window.location.origin as base', () => {
    setLocation('', 'https://myapp.io');
    const url = buildUserModeUrl('t1');
    expect(url).toMatch(/^https:\/\/myapp\.io/);
  });

  it('URL-encodes special characters in templateId', () => {
    setLocation('', 'http://localhost');
    const url = buildUserModeUrl('a b+c');
    expect(url).not.toContain(' ');
  });
});
