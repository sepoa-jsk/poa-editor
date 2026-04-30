import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AutoSave } from '../../src/modules/file/AutoSave';

// Reset fake-indexeddb between tests by re-importing fresh DB
// fake-indexeddb/auto patches globalThis.indexedDB — each openDB call uses the in-memory instance

describe('AutoSave', () => {
  let autoSave: AutoSave;

  beforeEach(() => {
    autoSave = new AutoSave(1000);
  });

  it('listSnapshots returns empty array when nothing saved', async () => {
    const entries = await autoSave.listSnapshots();
    expect(entries).toHaveLength(0);
  });

  it('saveNow stores a snapshot retrievable via listSnapshots', async () => {
    await autoSave.saveNow('<p>hello</p>');
    const entries = await autoSave.listSnapshots();
    expect(entries).toHaveLength(1);
    expect(entries[0].html).toBe('<p>hello</p>');
    expect(typeof entries[0].savedAt).toBe('number');
  });

  it('listSnapshots returns entries in reverse (newest first)', async () => {
    await autoSave.saveNow('<p>first</p>');
    await autoSave.saveNow('<p>second</p>');
    const entries = await autoSave.listSnapshots();
    expect(entries[0].html).toBe('<p>second</p>');
    expect(entries[1].html).toBe('<p>first</p>');
  });

  it('restoreSnapshot returns html for a valid id', async () => {
    await autoSave.saveNow('<p>restore-me</p>');
    const entries = await autoSave.listSnapshots();
    const html = await autoSave.restoreSnapshot(entries[0].id);
    expect(html).toBe('<p>restore-me</p>');
  });

  it('restoreSnapshot returns null for unknown id', async () => {
    const html = await autoSave.restoreSnapshot(9999);
    expect(html).toBeNull();
  });

  it('trims oldest entries when exceeding MAX_ENTRIES (10)', async () => {
    for (let i = 1; i <= 11; i++) {
      await autoSave.saveNow(`<p>entry ${i}</p>`);
    }
    const entries = await autoSave.listSnapshots();
    expect(entries.length).toBe(10);
    // oldest (entry 1) should be gone; newest (entry 11) should be first
    expect(entries[0].html).toBe('<p>entry 11</p>');
    expect(entries.some((e) => e.html === '<p>entry 1</p>')).toBe(false);
  });

  it('clearAll removes all snapshots', async () => {
    await autoSave.saveNow('<p>a</p>');
    await autoSave.saveNow('<p>b</p>');
    await autoSave.clearAll();
    const entries = await autoSave.listSnapshots();
    expect(entries).toHaveLength(0);
  });

  it('isRunning reflects start/stop lifecycle', () => {
    expect(autoSave.isRunning()).toBe(false);
    autoSave.start(() => '<p>content</p>');
    expect(autoSave.isRunning()).toBe(true);
    autoSave.stop();
    expect(autoSave.isRunning()).toBe(false);
  });

  it('start triggers saveNow after interval', async () => {
    vi.useFakeTimers();
    const saves: string[] = [];
    const spy = vi.spyOn(autoSave, 'saveNow').mockImplementation(async (html) => {
      saves.push(html);
    });
    autoSave.start(() => '<p>timed</p>');
    vi.advanceTimersByTime(1000);
    await Promise.resolve(); // flush microtasks
    expect(spy).toHaveBeenCalledWith('<p>timed</p>');
    autoSave.stop();
    vi.useRealTimers();
  });
});
