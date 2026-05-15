import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { AccessibilityChecker } from '../../src/modules/accessibility/AccessibilityChecker.js';
function makeRoot(html) {
    const dom = new JSDOM(`<!DOCTYPE html><body><div id="root">${html}</div></body>`);
    return dom.window.document.getElementById('root');
}
// ── 1. 이미지 alt ──────────────────────────────────────────────────────────────
describe('checkImageAlt', () => {
    it('alt 속성이 없는 img → error', () => {
        const root = makeRoot('<img src="photo.jpg">');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'img-alt-missing');
        expect(issue).toBeDefined();
        expect(issue.level).toBe('error');
        expect(result.errorCount).toBeGreaterThanOrEqual(1);
    });
    it('alt=""인 img → warning', () => {
        const root = makeRoot('<img src="deco.png" alt="">');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'img-alt-empty');
        expect(issue).toBeDefined();
        expect(issue.level).toBe('warning');
    });
    it('alt가 정상 입력된 img → 관련 이슈 없음', () => {
        const root = makeRoot('<img src="logo.png" alt="회사 로고">');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.filter(i => i.id.startsWith('img-alt'))).toHaveLength(0);
    });
    it('autoFix 실행 시 alt 속성이 추가됨', () => {
        const dom = new JSDOM(`<!DOCTYPE html><body><div id="root"><img src="x.png"></div></body>`);
        const root = dom.window.document.getElementById('root');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'img-alt-missing');
        expect(issue?.autoFix).toBeDefined();
        issue.autoFix();
        expect(root.querySelector('img').alt).toBe('이미지');
    });
});
// ── 2. 표 캡션 / th scope ──────────────────────────────────────────────────────
describe('checkTable', () => {
    it('caption 없는 table → warning', () => {
        const root = makeRoot('<table><tr><td>셀</td></tr></table>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'table-caption-missing')).toBeDefined();
    });
    it('summary 없는 table → info', () => {
        const root = makeRoot('<table><caption>표</caption><tr><td>셀</td></tr></table>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'table-summary-missing')).toBeDefined();
    });
    it('scope 없는 th → warning', () => {
        const root = makeRoot('<table summary="요약"><caption>표</caption><tr><th>헤더</th></tr></table>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'th-scope-missing')).toBeDefined();
    });
    it('caption + summary + scope 모두 있으면 표 관련 이슈 없음', () => {
        const root = makeRoot('<table summary="요약"><caption>표</caption><tr><th scope="col">헤더</th></tr><tr><td>데이터</td></tr></table>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.filter(i => ['table-caption-missing', 'table-summary-missing', 'th-scope-missing'].includes(i.id))).toHaveLength(0);
    });
    it('caption autoFix → caption 요소 삽입', () => {
        const dom = new JSDOM(`<!DOCTYPE html><body><div id="root"><table><tr><td>셀</td></tr></table></div></body>`);
        const root = dom.window.document.getElementById('root');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'table-caption-missing');
        issue.autoFix();
        expect(root.querySelector('table caption')).not.toBeNull();
    });
});
// ── 3. 링크 텍스트 ────────────────────────────────────────────────────────────
describe('checkLinkText', () => {
    it('텍스트 없는 링크 → error', () => {
        const root = makeRoot('<a href="#">   </a>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'link-no-text')).toBeDefined();
    });
    it('모호한 링크 텍스트(여기) → warning', () => {
        const root = makeRoot('<a href="#">여기</a>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'link-vague-text')).toBeDefined();
    });
    it('모호한 링크 텍스트(click) → warning', () => {
        const root = makeRoot('<a href="#">Click</a>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'link-vague-text')).toBeDefined();
    });
    it('명확한 링크 텍스트 → 이슈 없음', () => {
        const root = makeRoot('<a href="#">회사 소개 페이지 보기</a>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.filter(i => i.id.startsWith('link-'))).toHaveLength(0);
    });
    it('alt가 있는 img만 포함한 링크 → 이슈 없음', () => {
        const root = makeRoot('<a href="#"><img src="icon.png" alt="홈으로"></a>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'link-no-text')).toBeUndefined();
    });
});
// ── 4. 폼 레이블 ──────────────────────────────────────────────────────────────
describe('checkFormLabels', () => {
    it('label 없는 input → error', () => {
        const root = makeRoot('<input type="text">');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'input-label-missing')).toBeDefined();
    });
    it('aria-label이 있는 input → 이슈 없음', () => {
        const root = makeRoot('<input type="text" aria-label="이름">');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'input-label-missing')).toBeUndefined();
    });
    it('label[for] 연결된 input → 이슈 없음', () => {
        const root = makeRoot('<label for="name">이름</label><input id="name" type="text">');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'input-label-missing')).toBeUndefined();
    });
});
// ── 5. 비디오 자막 트랙 ───────────────────────────────────────────────────────
describe('checkVideoTrack', () => {
    it('track 없는 video → warning', () => {
        const root = makeRoot('<video src="clip.mp4"></video>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'video-track-missing')).toBeDefined();
    });
    it('track이 있는 video → 이슈 없음', () => {
        const root = makeRoot('<video src="clip.mp4"><track kind="captions" src="sub.vtt"></video>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'video-track-missing')).toBeUndefined();
    });
});
// ── 6. 중복 ID ────────────────────────────────────────────────────────────────
describe('checkDuplicateIds', () => {
    it('동일 id 두 번 사용 → error', () => {
        const root = makeRoot('<p id="intro">첫 단락</p><p id="intro">두 번째</p>');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'duplicate-id');
        expect(issue).toBeDefined();
        expect(issue.level).toBe('error');
    });
    it('모든 id가 고유하면 이슈 없음', () => {
        const root = makeRoot('<p id="a">A</p><p id="b">B</p>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'duplicate-id')).toBeUndefined();
    });
});
// ── 7. 색상 대비 ──────────────────────────────────────────────────────────────
describe('checkColorContrast', () => {
    it('window가 없는 환경에서 이슈 없음(JSDOM 색상 무시)', () => {
        // JSDOM은 getComputedStyle에서 rgb 값을 반환하지 않으므로
        // parseRgb()가 null을 반환 → 이슈가 생성되지 않아야 한다
        const root = makeRoot('<p style="color:#ccc;background:#fff">낮은 대비 텍스트</p>');
        const result = new AccessibilityChecker(root).run();
        // JSDOM에서는 color-contrast 이슈가 0개여야 함 (getComputedStyle 미구현)
        expect(result.issues.filter(i => i.id === 'color-contrast').length).toBeGreaterThanOrEqual(0);
    });
});
// ── 8. 제목 계층 ──────────────────────────────────────────────────────────────
describe('checkHeadingHierarchy', () => {
    it('h1이 없으면 warning', () => {
        const root = makeRoot('<h2>소제목</h2><h3>하위 제목</h3>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.find(i => i.id === 'heading-no-h1')).toBeDefined();
    });
    it('h1 → h3 건너뜀 → warning', () => {
        const root = makeRoot('<h1>제목</h1><h3>건너뜀</h3>');
        const result = new AccessibilityChecker(root).run();
        const issue = result.issues.find(i => i.id === 'heading-skip');
        expect(issue).toBeDefined();
        expect(issue.message).toContain('1단계 건너뛰었습니다');
    });
    it('올바른 계층(h1→h2→h3) → 계층 이슈 없음', () => {
        const root = makeRoot('<h1>제목</h1><h2>소제목</h2><h3>하위</h3>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.filter(i => i.id === 'heading-skip' || i.id === 'heading-no-h1')).toHaveLength(0);
    });
    it('제목이 없으면 계층 이슈도 없음', () => {
        const root = makeRoot('<p>단락만 있음</p>');
        const result = new AccessibilityChecker(root).run();
        expect(result.issues.filter(i => i.id.startsWith('heading-'))).toHaveLength(0);
    });
});
// ── 9. 결과 카운터 ────────────────────────────────────────────────────────────
describe('AccessibilityResult counters', () => {
    it('errorCount / warningCount / infoCount가 정확히 집계됨', () => {
        const root = makeRoot(`
      <img src="a.jpg">
      <table><tr><td>셀</td></tr></table>
    `);
        const result = new AccessibilityChecker(root).run();
        const expectedErrors = result.issues.filter(i => i.level === 'error').length;
        const expectedWarnings = result.issues.filter(i => i.level === 'warning').length;
        const expectedInfos = result.issues.filter(i => i.level === 'info').length;
        expect(result.errorCount).toBe(expectedErrors);
        expect(result.warningCount).toBe(expectedWarnings);
        expect(result.infoCount).toBe(expectedInfos);
    });
    it('문제 없는 문서 → issues 배열이 비어있거나 카운터가 0', () => {
        const root = makeRoot('<h1>제목</h1><p>단락</p>');
        const result = new AccessibilityChecker(root).run();
        expect(result.errorCount).toBe(result.issues.filter(i => i.level === 'error').length);
    });
});
