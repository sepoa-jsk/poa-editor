import { describe, it, expect, vi } from 'vitest';
import { EmojiInserter, EMOJI_CATEGORIES, searchEmojis, EMOJI_KEYWORDS } from '../../src/modules/insert/EmojiInserter.js';
const store = {};
vi.stubGlobal('localStorage', {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = v; },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
});
function clearRecent() { localStorage.clear(); }
describe('EMOJI_CATEGORIES', () => {
    it('has 9 categories', () => {
        expect(EMOJI_CATEGORIES).toHaveLength(9);
    });
    it('each category has emojis', () => {
        for (const cat of EMOJI_CATEGORIES) {
            expect(cat.emojis.length).toBeGreaterThan(0);
        }
    });
    it('first category id is smileys', () => {
        expect(EMOJI_CATEGORIES[0].id).toBe('smileys');
    });
    it('all categories have icon, label, id', () => {
        for (const cat of EMOJI_CATEGORIES) {
            expect(cat.id).toBeTruthy();
            expect(cat.label).toBeTruthy();
            expect(cat.icon).toBeTruthy();
        }
    });
});
describe('EMOJI_KEYWORDS', () => {
    it('has entries', () => {
        expect(EMOJI_KEYWORDS.size).toBeGreaterThan(10);
    });
    it('heart emoji has love/heart keyword', () => {
        const kw = EMOJI_KEYWORDS.get('❤️') ?? [];
        expect(kw).toContain('heart');
    });
});
describe('searchEmojis', () => {
    it('returns empty array for empty query', () => {
        expect(searchEmojis('')).toHaveLength(0);
    });
    it('English keyword search works', () => {
        const results = searchEmojis('smile');
        expect(results.length).toBeGreaterThan(0);
        expect(results).toContain('😀');
    });
    it('Korean keyword search works', () => {
        const results = searchEmojis('웃음');
        expect(results.length).toBeGreaterThan(0);
    });
    it('case insensitive', () => {
        const lower = searchEmojis('love');
        const upper = searchEmojis('LOVE');
        expect(lower.length).toBe(upper.length);
    });
    it('no results for unknown query', () => {
        const results = searchEmojis('xyzqwerty12345');
        expect(results).toHaveLength(0);
    });
    it('partial match works', () => {
        const results = searchEmojis('pray');
        expect(results).toContain('🙏');
    });
});
describe('EmojiInserter — recent', () => {
    it('getRecent returns empty array initially', () => {
        clearRecent();
        const ins = new EmojiInserter();
        expect(ins.getRecent()).toEqual([]);
    });
    it('addRecent adds emoji to front', () => {
        clearRecent();
        const ins = new EmojiInserter();
        ins.addRecent('😀');
        ins.addRecent('❤️');
        const recent = ins.getRecent();
        expect(recent[0]).toBe('❤️');
        expect(recent[1]).toBe('😀');
    });
    it('addRecent deduplicates emoji', () => {
        clearRecent();
        const ins = new EmojiInserter();
        ins.addRecent('😀');
        ins.addRecent('😀');
        expect(ins.getRecent()).toHaveLength(1);
    });
    it('addRecent keeps max 16 entries', () => {
        clearRecent();
        const ins = new EmojiInserter();
        for (let i = 0; i < 20; i++)
            ins.addRecent(EMOJI_CATEGORIES[0].emojis[i] ?? '😀');
        expect(ins.getRecent().length).toBeLessThanOrEqual(16);
    });
});
describe('EmojiInserter — insert', () => {
    it('inserts emoji at end of container when no selection', () => {
        clearRecent();
        const ins = new EmojiInserter();
        const div = document.createElement('div');
        div.textContent = 'hello';
        document.body.appendChild(div);
        ins.insert('😀', div);
        expect(div.textContent).toBe('hello😀');
        document.body.removeChild(div);
    });
    it('insert adds emoji to recent', () => {
        clearRecent();
        const ins = new EmojiInserter();
        const div = document.createElement('div');
        document.body.appendChild(div);
        ins.insert('🎉', div);
        expect(ins.getRecent()[0]).toBe('🎉');
        document.body.removeChild(div);
    });
});
