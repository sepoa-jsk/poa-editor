const RECENT_KEY = 'poa-emoji-recent';
const MAX_RECENT = 16;
const RAW = [
    ['smileys', '스마일리/감정', '😀',
        '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 😎 🤩 🥳 😏 🤐'],
    ['sad', '슬픔/공감', '😢',
        '😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖'],
    ['gestures', '제스처/손', '👍',
        '👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 👏 🙌 🤲 🤝 🙏 ✋ 🤚 🖐️ 💪 🦾 🖖 🤌 🫶 🫵'],
    ['animals', '동물/자연', '🐶',
        '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🦅 🦆 🦉 🦇 🐺 🐗 🐴 🦄'],
    ['food', '음식/음료', '🍕',
        '🍕 🍔 🌭 🍟 🌮 🌯 🥗 🍲 🍛 🍜 🍝 🍣 🍤 🍡 🥟 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 🍷 🍸 🍺 ☕'],
    ['sports', '활동/스포츠', '⚽',
        '⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓 🏸 🥊 🥋 🎽 🛹 🛷 🏊 🏄 🏋️ 🤸 🏇 🏂 🚴 🏆 🥇 🥈 🥉 🎯 🎿 🤺 🎻'],
    ['travel', '여행/장소', '🌍',
        '🌍 🌎 🌏 🌐 🗺️ 🧭 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🏘️ 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🗼 🗽 ✈️'],
    ['objects', '사물/기호', '💡',
        '💡 🔦 🕯️ 💰 💳 💎 🔑 🗝️ 🔓 🔒 🛡️ 🔧 🔨 ⚙️ 🔩 ⚖️ 🔗 📱 💻 🖥️ 🖨️ 📷 📸 📹 🎥 📞 ☎️ 📺 📻 🎙️'],
    ['symbols', '기호/특수', '❤️',
        '❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 ✨ ⭐ 🌟 💫 🌈 ☀️ ⛅ 🌦️ ❄️ 🌊 🌸 🌺'],
];
export const EMOJI_CATEGORIES = RAW.map(([id, label, icon, raw]) => ({
    id, label, icon, emojis: raw.split(' ').filter(Boolean),
}));
const KW = [
    ['😀', ['웃음', '기쁨', 'smile', 'happy', 'grin']],
    ['😂', ['웃음', '눈물', 'laugh', 'funny', 'tears']],
    ['🤣', ['웃음', '롤', 'rofl', 'laugh']],
    ['😍', ['사랑', '눈하트', 'love', 'heart eyes']],
    ['🥰', ['사랑', '행복', 'love', 'happy']],
    ['😘', ['뽀뽀', '키스', 'kiss', 'love']],
    ['😎', ['쿨', '선글라스', 'cool', 'sunglasses']],
    ['🤩', ['신남', '스타', 'star struck', 'excited']],
    ['🥳', ['파티', '신남', 'party', 'celebrate']],
    ['😢', ['슬픔', '눈물', 'sad', 'cry']],
    ['😭', ['슬픔', '통곡', 'sob', 'cry', 'weep']],
    ['😠', ['화남', '분노', 'angry', 'mad']],
    ['😡', ['화남', '분노', 'rage', 'angry']],
    ['👍', ['좋아요', '엄지', 'like', 'thumbs up', 'good']],
    ['👎', ['싫어요', 'dislike', 'thumbs down', 'bad']],
    ['👏', ['박수', '칭찬', 'clap', 'applause']],
    ['🙏', ['감사', '기도', 'pray', 'thanks', 'please']],
    ['💪', ['힘', '근육', 'strong', 'muscle', 'flex']],
    ['❤️', ['하트', '사랑', 'heart', 'love', 'red']],
    ['💔', ['실연', '하트깨짐', 'broken heart', 'sad']],
    ['🔥', ['불', '핫', '인기', 'fire', 'hot']],
    ['✨', ['반짝', '빛', 'sparkle', 'shine', 'stars']],
    ['🎉', ['파티', '축하', 'party', 'celebrate', 'congratulations']],
    ['🎊', ['파티', '축하', 'party', 'confetti']],
    ['🐶', ['강아지', '개', 'dog', 'puppy']],
    ['🐱', ['고양이', 'cat', 'kitty']],
    ['🍕', ['피자', 'pizza']],
    ['🍔', ['버거', '햄버거', 'burger', 'hamburger']],
    ['☕', ['커피', 'coffee', 'cafe']],
    ['⚽', ['축구', 'soccer', 'football']],
    ['🏀', ['농구', 'basketball']],
    ['🌍', ['지구', '세계', 'earth', 'world', 'globe']],
    ['💡', ['전구', '아이디어', 'idea', 'light', 'bulb']],
    ['🔧', ['렌치', '수리', 'wrench', 'fix', 'repair', 'tool']],
    ['📱', ['폰', '스마트폰', 'phone', 'smartphone', 'mobile']],
    ['💻', ['컴퓨터', '노트북', 'computer', 'laptop']],
    ['🎵', ['음악', '노래', 'music', 'song', 'note']],
    ['🌸', ['벚꽃', '꽃', 'cherry blossom', 'flower', 'spring']],
    ['⭐', ['별', '스타', 'star', 'rating']],
    ['🌈', ['무지개', 'rainbow', 'colorful']],
];
export const EMOJI_KEYWORDS = new Map(KW);
export function searchEmojis(query) {
    const q = query.toLowerCase().trim();
    if (!q)
        return [];
    const results = new Set();
    for (const [emoji, keywords] of EMOJI_KEYWORDS) {
        if (keywords.some(k => k.includes(q)))
            results.add(emoji);
    }
    return Array.from(results);
}
export class EmojiInserter {
    getRecent() {
        try {
            const raw = localStorage.getItem(RECENT_KEY);
            return raw ? JSON.parse(raw) : [];
        }
        catch {
            return [];
        }
    }
    addRecent(emoji) {
        const list = this.getRecent().filter(e => e !== emoji);
        list.unshift(emoji);
        if (list.length > MAX_RECENT)
            list.length = MAX_RECENT;
        try {
            localStorage.setItem(RECENT_KEY, JSON.stringify(list));
        }
        catch { /* full */ }
    }
    insert(emoji, container) {
        this.addRecent(emoji);
        const ownerDoc = container.ownerDocument;
        const sel = ownerDoc.getSelection();
        if (!sel || sel.rangeCount === 0 || !container.contains(sel.getRangeAt(0).startContainer)) {
            container.insertAdjacentText('beforeend', emoji);
            return;
        }
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const node = ownerDoc.createTextNode(emoji);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
