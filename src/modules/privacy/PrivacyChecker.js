// ── 금융 키워드 (계좌번호 오탐 방지) ──────────────────────────────────────────
const FINANCE_KEYWORDS = ['계좌', '통장', '입금', '출금', '계좌번호', '이체', '송금', '은행'];
function hasFinanceKeywordNear(text, index, radius = 100) {
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + radius);
    const snippet = text.slice(start, end);
    return FINANCE_KEYWORDS.some(kw => snippet.includes(kw));
}
// ── 마스킹 함수 ───────────────────────────────────────────────────────────────
function maskPhone(raw) {
    // 010-1234-5678 → 010-****-5678  /  01012345678 → 010****5678
    return raw.replace(/(01\d[-\s]?)(\d{3,4})([-\s]?\d{4})/, (_m, p1, _p2, p3) => `${p1}****${p3}`);
}
function maskPhoneGeneral(raw) {
    return raw.replace(/(0\d{1,2}[-\s]?)(\d{3,4})([-\s]?\d{4})/, (_m, p1, _p2, p3) => `${p1}****${p3}`);
}
function maskEmail(raw) {
    const at = raw.indexOf('@');
    if (at <= 1)
        return raw;
    return raw[0] + '***' + raw.slice(at);
}
function maskResidentId(raw) {
    const dash = raw.indexOf('-');
    if (dash === 6)
        return raw.slice(0, 7) + '*******';
    if (raw.length >= 13)
        return raw.slice(0, 7) + '*******';
    return raw.slice(0, 6) + '-*******';
}
function maskCreditCard(raw) {
    // 마지막 4자리만 노출
    const digits = raw.replace(/[-\s]/g, '');
    const last4 = digits.slice(-4);
    const sep = raw.includes('-') ? '-' : (raw.includes(' ') ? ' ' : '');
    return sep
        ? `****${sep}****${sep}****${sep}${last4}`
        : `************${last4}`;
}
function maskBankAccount(raw) {
    if (raw.length <= 4)
        return raw;
    return raw.slice(0, 2) + '*'.repeat(raw.length - 4) + raw.slice(-2);
}
function maskIp(raw) {
    return raw.replace(/\.\d+$/, '.***.***');
}
function maskPassport(raw) {
    return raw.slice(0, 2) + '*'.repeat(raw.length - 2);
}
// ── 패턴 정의 목록 ────────────────────────────────────────────────────────────
const PATTERNS = [
    {
        type: 'resident-id',
        label: '주민등록번호',
        riskLevel: 'very-high',
        pattern: /\d{6}-?[1-4]\d{6}/g,
        mask: maskResidentId,
    },
    {
        type: 'credit-card',
        label: '신용카드 번호',
        riskLevel: 'very-high',
        pattern: /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,
        mask: maskCreditCard,
    },
    {
        type: 'phone-mobile',
        label: '휴대폰 번호',
        riskLevel: 'high',
        pattern: /01[0-9][-\s]?\d{3,4}[-\s]?\d{4}/g,
        mask: maskPhone,
    },
    {
        type: 'phone-general',
        label: '일반 전화번호',
        riskLevel: 'high',
        // 휴대폰 패턴(01x)과 겹치지 않도록 0[2-9] 또는 0\d\d 형태
        pattern: /0[2-9]\d?[-\s]?\d{3,4}[-\s]?\d{4}/g,
        mask: maskPhoneGeneral,
    },
    {
        type: 'email',
        label: '이메일 주소',
        riskLevel: 'high',
        pattern: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
        mask: maskEmail,
    },
    {
        type: 'bank-account',
        label: '계좌번호',
        riskLevel: 'high',
        pattern: /\d{10,14}/g,
        contextGuard: hasFinanceKeywordNear,
        mask: maskBankAccount,
    },
    {
        type: 'passport',
        label: '여권번호',
        riskLevel: 'high',
        pattern: /[A-Z]{1,2}\d{7,9}/g,
        mask: maskPassport,
    },
    {
        type: 'ip-address',
        label: 'IP 주소',
        riskLevel: 'medium',
        pattern: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
        mask: maskIp,
    },
];
// ── 위치 레이블 헬퍼 ──────────────────────────────────────────────────────────
function makeLocationLabel(root, node) {
    const BLOCK_TAGS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th', 'blockquote', 'pre']);
    let block = null;
    let cur = node.parentNode;
    while (cur && cur !== root) {
        if (cur.nodeType === Node.ELEMENT_NODE && BLOCK_TAGS.has(cur.tagName.toLowerCase())) {
            block = cur;
            break;
        }
        cur = cur.parentNode;
    }
    if (!block)
        return '문서';
    const tag = block.tagName.toLowerCase();
    const blocks = Array.from(root.querySelectorAll(tag));
    const idx = blocks.indexOf(block);
    return idx >= 0 ? `${idx + 1}번째 ${tagToKo(tag)}` : tag;
}
function tagToKo(tag) {
    const map = {
        p: '단락', div: '단락', li: '목록 항목',
        td: '표 셀', th: '표 헤더', blockquote: '인용문', pre: '코드 블록',
        h1: '제목', h2: '제목', h3: '제목', h4: '제목', h5: '제목', h6: '제목',
    };
    return map[tag] ?? tag;
}
// ── 메인 클래스 ────────────────────────────────────────────────────────────────
/**
 * 정규식 기반 개인정보 탐지 엔진.
 * TreeWalker로 텍스트 노드를 순회하며 8가지 패턴을 검사한다.
 */
export class PrivacyChecker {
    root;
    idSeq = 0;
    constructor(root) {
        this.root = root;
    }
    run() {
        const matches = [];
        const walker = document.createTreeWalker(this.root, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();
        while (textNode) {
            const text = textNode.nodeValue ?? '';
            if (text.trim()) {
                for (const def of PATTERNS) {
                    def.pattern.lastIndex = 0;
                    let m;
                    while ((m = def.pattern.exec(text)) !== null) {
                        const raw = m[0];
                        if (def.contextGuard && !def.contextGuard(text, m.index))
                            continue;
                        matches.push({
                            id: `pii-${++this.idSeq}`,
                            type: def.type,
                            riskLevel: def.riskLevel,
                            label: def.label,
                            raw,
                            masked: def.mask(raw),
                            textNode,
                            nodeOffset: m.index,
                            locationLabel: makeLocationLabel(this.root, textNode),
                            highlightEl: null,
                        });
                    }
                }
            }
            textNode = walker.nextNode();
        }
        // 위험도 높은 순 정렬
        const order = { 'very-high': 0, 'high': 1, 'medium': 2 };
        matches.sort((a, b) => order[a.riskLevel] - order[b.riskLevel]);
        return matches;
    }
    /**
     * 탐지된 텍스트에 하이라이트 span을 삽입하고 match.highlightEl을 채운다.
     * 한 텍스트 노드에 여러 매치가 있을 경우 역순(뒤부터) 처리해 오프셋 오염을 방지한다.
     */
    static highlight(matches) {
        // 동일 텍스트 노드 내 오프셋이 뒤에 있는 것부터 처리
        const sorted = [...matches].sort((a, b) => {
            if (a.textNode === b.textNode)
                return b.nodeOffset - a.nodeOffset;
            return 0;
        });
        for (const match of sorted) {
            try {
                const node = match.textNode;
                if (!node.parentNode || !node.nodeValue)
                    continue;
                const before = node.nodeValue.slice(0, match.nodeOffset);
                const hit = node.nodeValue.slice(match.nodeOffset, match.nodeOffset + match.raw.length);
                const after = node.nodeValue.slice(match.nodeOffset + match.raw.length);
                const ownerDoc = node.ownerDocument;
                const span = ownerDoc.createElement('span');
                span.dataset.privacyId = match.id;
                span.dataset.privacyType = match.type;
                if (match.riskLevel === 'very-high') {
                    span.style.background = '#DC2626';
                    span.style.color = '#FFFFFF';
                }
                else {
                    span.style.background = '#FEE2E2';
                }
                span.style.borderRadius = '2px';
                span.style.padding = '0 1px';
                span.textContent = hit;
                const parent = node.parentNode;
                if (before)
                    parent.insertBefore(ownerDoc.createTextNode(before), node);
                parent.insertBefore(span, node);
                if (after)
                    parent.insertBefore(ownerDoc.createTextNode(after), node);
                parent.removeChild(node);
                match.highlightEl = span;
                // textNode 참조를 span 내부의 텍스트 노드로 갱신 (이후 삭제/마스킹 시 사용)
                match.textNode = span.firstChild;
                match.nodeOffset = 0;
            }
            catch {
                // DOM 변경 중 예외 발생 시 해당 매치 건너뜀
            }
        }
    }
    /** 하이라이트 span을 제거하고 텍스트 노드를 원복 */
    static removeHighlights(root) {
        root.querySelectorAll('[data-privacy-id]').forEach(span => {
            const text = span.textContent ?? '';
            span.replaceWith(span.ownerDocument.createTextNode(text));
        });
        // 인접한 텍스트 노드 병합
        root.normalize();
    }
    /** 단일 매치 삭제 */
    static deleteMatch(match) {
        const span = match.highlightEl;
        if (span?.parentNode) {
            span.remove();
            match.highlightEl = null;
        }
    }
    /** 단일 매치 마스킹 */
    static maskMatch(match) {
        const span = match.highlightEl;
        if (span) {
            span.textContent = match.masked;
            span.style.background = '';
            span.style.color = '';
            span.removeAttribute('data-privacy-id');
            span.removeAttribute('data-privacy-type');
            match.highlightEl = null;
        }
    }
    /** 모든 매치 삭제 */
    static deleteAll(matches) {
        for (const m of matches)
            PrivacyChecker.deleteMatch(m);
    }
    /** 모든 매치 마스킹 */
    static maskAll(matches) {
        for (const m of matches)
            PrivacyChecker.maskMatch(m);
    }
}
