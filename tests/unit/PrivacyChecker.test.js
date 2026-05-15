import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { PrivacyChecker } from '../../src/modules/privacy/PrivacyChecker.js';
function makeRoot(html) {
    const dom = new JSDOM(`<!DOCTYPE html><body><div id="root">${html}</div></body>`);
    // PrivacyChecker는 document.createTreeWalker를 사용하므로 global document를 교체
    const g = global;
    g.document = dom.window.document;
    g.Node = dom.window.Node;
    g.NodeFilter = dom.window.NodeFilter;
    return dom.window.document.getElementById('root');
}
// ── 1. 휴대폰 번호 ─────────────────────────────────────────────────────────────
describe('휴대폰 번호 탐지', () => {
    it('하이픈 있는 형식 010-1234-5678 탐지', () => {
        const root = makeRoot('<p>연락처: 010-1234-5678</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'phone-mobile' && m.raw === '010-1234-5678')).toBe(true);
    });
    it('하이픈 없는 형식 01012345678 탐지', () => {
        const root = makeRoot('<p>전화: 01012345678</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'phone-mobile')).toBe(true);
    });
    it('마스킹: 010-****-5678 형태', () => {
        const root = makeRoot('<p>010-1234-5678</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'phone-mobile');
        expect(m.masked).toBe('010-****-5678');
    });
});
// ── 2. 일반 전화번호 ───────────────────────────────────────────────────────────
describe('일반 전화번호 탐지', () => {
    it('02-1234-5678 탐지', () => {
        const root = makeRoot('<p>서울: 02-1234-5678</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'phone-general')).toBe(true);
    });
    it('031-456-7890 탐지', () => {
        const root = makeRoot('<p>경기: 031-456-7890</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'phone-general')).toBe(true);
    });
});
// ── 3. 이메일 주소 ─────────────────────────────────────────────────────────────
describe('이메일 주소 탐지', () => {
    it('user@example.com 탐지', () => {
        const root = makeRoot('<p>이메일: user@example.com</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'email' && m.raw === 'user@example.com')).toBe(true);
    });
    it('마스킹: u***@example.com 형태', () => {
        const root = makeRoot('<p>user@example.com</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'email');
        expect(m.masked).toBe('u***@example.com');
    });
    it('고급 이메일 형식 hello.world+tag@sub.domain.org 탐지', () => {
        const root = makeRoot('<p>hello.world+tag@sub.domain.org</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'email')).toBe(true);
    });
});
// ── 4. 주민등록번호 ────────────────────────────────────────────────────────────
describe('주민등록번호 탐지', () => {
    it('123456-1234567 탐지 (매우높음)', () => {
        const root = makeRoot('<p>주민번호: 123456-1234567</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'resident-id');
        expect(m).toBeDefined();
        expect(m.riskLevel).toBe('very-high');
    });
    it('하이픈 없는 1234561234567 탐지', () => {
        const root = makeRoot('<p>1234561234567</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'resident-id')).toBe(true);
    });
    it('마스킹: 123456-******* 형태', () => {
        const root = makeRoot('<p>123456-1234567</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'resident-id');
        expect(m.masked).toContain('123456-');
        expect(m.masked).toContain('*');
    });
    it('결과 목록에서 매우높음이 맨 앞에 정렬됨', () => {
        const root = makeRoot('<p>주민번호 123456-1234567, 전화 010-0000-0000</p>');
        const matches = new PrivacyChecker(root).run();
        if (matches.length >= 2) {
            expect(matches[0].riskLevel).toBe('very-high');
        }
    });
});
// ── 5. 신용카드 번호 ───────────────────────────────────────────────────────────
describe('신용카드 번호 탐지', () => {
    it('1234-5678-9012-3456 탐지 (매우높음)', () => {
        const root = makeRoot('<p>카드: 1234-5678-9012-3456</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'credit-card');
        expect(m).toBeDefined();
        expect(m.riskLevel).toBe('very-high');
    });
    it('마스킹: 마지막 4자리만 노출', () => {
        const root = makeRoot('<p>1234-5678-9012-3456</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'credit-card');
        expect(m.masked).toContain('3456');
        expect(m.masked).toContain('****');
    });
});
// ── 6. 계좌번호 (컨텍스트 가드) ───────────────────────────────────────────────
describe('계좌번호 탐지 (컨텍스트 가드)', () => {
    it('금융 키워드 인접 시 탐지', () => {
        const root = makeRoot('<p>계좌번호: 1234567890123</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'bank-account')).toBe(true);
    });
    it('금융 키워드 없는 단순 숫자 나열은 탐지 안 됨', () => {
        const root = makeRoot('<p>상품번호: 1234567890123</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'bank-account')).toBe(false);
    });
});
// ── 7. IP 주소 ─────────────────────────────────────────────────────────────────
describe('IP 주소 탐지', () => {
    it('192.168.0.1 탐지 (중간 위험도)', () => {
        const root = makeRoot('<p>서버 IP: 192.168.0.1</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'ip-address');
        expect(m).toBeDefined();
        expect(m.riskLevel).toBe('medium');
    });
    it('잘못된 범위(999.999.999.999) 탐지 안 됨', () => {
        const root = makeRoot('<p>999.999.999.999</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'ip-address')).toBe(false);
    });
});
// ── 8. 여권번호 ────────────────────────────────────────────────────────────────
describe('여권번호 탐지', () => {
    it('M12345678 탐지', () => {
        const root = makeRoot('<p>여권: M12345678</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'passport')).toBe(true);
    });
    it('AB1234567 탐지', () => {
        const root = makeRoot('<p>여권: AB1234567</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches.some(m => m.type === 'passport')).toBe(true);
    });
});
// ── 9. 복합 문서 / 위험도 정렬 ────────────────────────────────────────────────
describe('복합 탐지 및 유틸리티', () => {
    it('여러 유형이 혼재할 때 모두 탐지', () => {
        const root = makeRoot(`
      <p>이메일: user@test.com, 전화: 010-0000-0000</p>
      <p>주민: 900101-1234567</p>
    `);
        const matches = new PrivacyChecker(root).run();
        const types = new Set(matches.map(m => m.type));
        expect(types.has('email')).toBe(true);
        expect(types.has('phone-mobile')).toBe(true);
        expect(types.has('resident-id')).toBe(true);
    });
    it('빈 문서에서 실행하면 빈 배열 반환', () => {
        const root = makeRoot('<p></p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches).toHaveLength(0);
    });
    it('개인정보 없는 텍스트에서 오탐 없음', () => {
        const root = makeRoot('<p>안녕하세요! 오늘 날씨가 좋네요. 1 + 1 = 2</p>');
        const matches = new PrivacyChecker(root).run();
        expect(matches).toHaveLength(0);
    });
    it('각 match에 고유한 id가 부여됨', () => {
        const root = makeRoot('<p>010-1111-1111, 010-2222-2222</p>');
        const matches = new PrivacyChecker(root).run();
        const ids = matches.map(m => m.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});
// ── 10. 마스킹 처리 검증 ──────────────────────────────────────────────────────
describe('마스킹 패턴 검증', () => {
    it('신용카드: 마지막 4자리만 노출', () => {
        const root = makeRoot('<p>카드: 4111-1111-1111-1111</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'credit-card');
        expect(m?.masked).toContain('1111');
        expect(m?.masked.startsWith('****')).toBe(true);
    });
    it('이메일: 첫 글자 + *** 형태', () => {
        const root = makeRoot('<p>contact@company.co.kr</p>');
        const matches = new PrivacyChecker(root).run();
        const m = matches.find(m => m.type === 'email');
        expect(m?.masked).toMatch(/^c\*\*\*@/);
    });
});
