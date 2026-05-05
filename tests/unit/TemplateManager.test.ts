import { describe, it, expect, vi } from 'vitest';
import { TemplateManager } from '../../src/modules/template/TemplateManager.js';

// localStorage mock
const store: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem:    (k: string) => store[k] ?? null,
  setItem:    (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear:      () => { Object.keys(store).forEach(k => delete store[k]); },
});

// DOMPurify mock — return input unchanged for tests
vi.mock('dompurify', () => ({
  default: { sanitize: (html: string) => html },
}));

function fresh(): TemplateManager {
  localStorage.clear();
  return new TemplateManager();
}

describe('TemplateManager — seed', () => {
  it('seeding creates 2 root folders', () => {
    const mgr = fresh();
    const roots = mgr.getRoots();
    expect(roots).toHaveLength(2);
    expect(roots[0].type).toBe('folder');
    expect(roots[1].type).toBe('folder');
  });

  it('public folder contains 3 seed templates', () => {
    const mgr = fresh();
    const pub = mgr.getRoots().find(n => n.isPublic)!;
    const children = mgr.getChildren(pub.id);
    expect(children).toHaveLength(3);
    expect(children.every(n => n.type === 'template')).toBe(true);
  });

  it('my folder is not public', () => {
    const mgr = fresh();
    const my = mgr.getRoots().find(n => !n.isPublic)!;
    expect(my.isPublic).toBe(false);
  });

  it('persists to localStorage on seed', () => {
    fresh();
    expect(localStorage.getItem('poa-templates')).not.toBeNull();
  });
});

describe('TemplateManager — addFolder', () => {
  it('adds a root folder', () => {
    const mgr = fresh();
    const before = mgr.getRoots().length;
    mgr.addFolder('테스트 폴더', null);
    expect(mgr.getRoots()).toHaveLength(before + 1);
  });

  it('adds a nested folder', () => {
    const mgr = fresh();
    const pub = mgr.getRoots().find(n => n.isPublic)!;
    const sub = mgr.addFolder('하위 폴더', pub.id);
    expect(sub.parentId).toBe(pub.id);
    expect(sub.type).toBe('folder');
  });

  it('returned node has correct properties', () => {
    const mgr = fresh();
    const node = mgr.addFolder('폴더', null, true);
    expect(node.name).toBe('폴더');
    expect(node.isPublic).toBe(true);
    expect(node.type).toBe('folder');
    expect(node.id).toBeTruthy();
  });
});

describe('TemplateManager — addTemplate', () => {
  it('adds template to a folder', () => {
    const mgr = fresh();
    const my = mgr.getRoots().find(n => !n.isPublic)!;
    const t = mgr.addTemplate('내 템플릿', '<p>내용</p>', my.id);
    expect(mgr.getChildren(my.id)).toContainEqual(expect.objectContaining({ id: t.id }));
  });

  it('template has content and correct type', () => {
    const mgr = fresh();
    const t = mgr.addTemplate('이름', '<b>bold</b>', null);
    expect(t.type).toBe('template');
    expect(t.content).toBeTruthy();
  });

  it('getById returns the template', () => {
    const mgr = fresh();
    const t = mgr.addTemplate('이름', '<p>x</p>', null);
    expect(mgr.getById(t.id)).toEqual(t);
  });
});

describe('TemplateManager — rename', () => {
  it('renames a node', () => {
    const mgr = fresh();
    const node = mgr.addFolder('원래 이름', null);
    mgr.rename(node.id, '새 이름');
    expect(mgr.getById(node.id)!.name).toBe('새 이름');
  });

  it('returns false for empty name', () => {
    const mgr = fresh();
    const node = mgr.addFolder('이름', null);
    expect(mgr.rename(node.id, '   ')).toBe(false);
  });

  it('returns false for unknown id', () => {
    const mgr = fresh();
    expect(mgr.rename('nonexistent', '이름')).toBe(false);
  });
});

describe('TemplateManager — delete', () => {
  it('deletes a leaf node', () => {
    const mgr = fresh();
    const node = mgr.addFolder('삭제 대상', null);
    mgr.delete(node.id);
    expect(mgr.getById(node.id)).toBeNull();
  });

  it('deletes folder and all children recursively', () => {
    const mgr = fresh();
    const parent = mgr.addFolder('부모', null);
    const child1 = mgr.addFolder('자식1', parent.id);
    const child2 = mgr.addTemplate('템플릿', '<p/>', parent.id);
    mgr.addFolder('손자', child1.id);
    mgr.delete(parent.id);
    expect(mgr.getById(parent.id)).toBeNull();
    expect(mgr.getById(child1.id)).toBeNull();
    expect(mgr.getById(child2.id)).toBeNull();
  });
});

describe('TemplateManager — move', () => {
  it('moves a node to a new parent', () => {
    const mgr = fresh();
    const a = mgr.addFolder('A', null);
    const b = mgr.addFolder('B', null);
    const result = mgr.move(a.id, b.id);
    expect(result).toBe(true);
    expect(mgr.getById(a.id)!.parentId).toBe(b.id);
  });

  it('prevents moving a folder into its own descendant (cycle)', () => {
    const mgr = fresh();
    const a = mgr.addFolder('A', null);
    const b = mgr.addFolder('B', a.id);
    const result = mgr.move(a.id, b.id);
    expect(result).toBe(false);
  });

  it('moves to root (null parentId)', () => {
    const mgr = fresh();
    const parent = mgr.addFolder('부모', null);
    const child  = mgr.addFolder('자식', parent.id);
    mgr.move(child.id, null);
    expect(mgr.getById(child.id)!.parentId).toBeNull();
  });
});

describe('TemplateManager — getChildren / getFolders', () => {
  it('getChildren returns children sorted by order then name', () => {
    const mgr = fresh();
    const parent = mgr.addFolder('부모', null);
    mgr.addTemplate('B', '<p/>', parent.id);
    mgr.addTemplate('A', '<p/>', parent.id);
    const children = mgr.getChildren(parent.id);
    expect(children).toHaveLength(2);
    // order 0 → B, order 1 → A (insertion order); same order → alphabetical
    expect(children[0].name).toBe('B');
  });

  it('getFolders returns only folder nodes', () => {
    const mgr = fresh();
    mgr.addTemplate('템플릿', '<p/>', null);
    const folders = mgr.getFolders();
    expect(folders.every(n => n.type === 'folder')).toBe(true);
  });
});
