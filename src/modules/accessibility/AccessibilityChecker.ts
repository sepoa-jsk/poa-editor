export type IssueLevel = 'error' | 'warning' | 'info';

export interface AccessibilityIssue {
  id: string;
  level: IssueLevel;
  title: string;
  message: string;
  element: Element | null;
  selector: string;
  autoFix?: () => void;
}

export interface AccessibilityResult {
  issues: AccessibilityIssue[];
  errorCount: number;
  warningCount: number;
  infoCount: number;
}

// ── 내부 유틸 ──────────────────────────────────────────────────────────────────

function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const id  = el.id ? `#${el.id}` : '';
  const src = el.getAttribute('src')
    ? `[src="${el.getAttribute('src')!.slice(0, 30)}"]`
    : '';
  return `${tag}${id}${src}` || tag;
}

/** rgb/rgba 문자열을 [r, g, b] 로 파싱. 투명(alpha=0)이면 null 반환. */
function parseRgb(color: string): [number, number, number] | null {
  const m = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!m) return null;
  const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
  if (alpha === 0) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function sRGB(val: number): number {
  const v = val / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
}

function contrastRatio(l1: number, l2: number): number {
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

// ── 메인 클래스 ────────────────────────────────────────────────────────────────

/**
 * WCAG 2.2 기반 접근성 검사 엔진.
 * contenteditable 루트 안에서 8가지 항목을 검사하고 결과를 반환한다.
 */
export class AccessibilityChecker {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  run(): AccessibilityResult {
    const issues: AccessibilityIssue[] = [
      ...this.checkImageAlt(),
      ...this.checkTable(),
      ...this.checkLinkText(),
      ...this.checkFormLabels(),
      ...this.checkVideoTrack(),
      ...this.checkDuplicateIds(),
      ...this.checkColorContrast(),
      ...this.checkHeadingHierarchy(),
    ];

    return {
      issues,
      errorCount:   issues.filter(i => i.level === 'error').length,
      warningCount: issues.filter(i => i.level === 'warning').length,
      infoCount:    issues.filter(i => i.level === 'info').length,
    };
  }

  // 1. 이미지 alt ──────────────────────────────────────────────────────────────

  private checkImageAlt(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    this.root.querySelectorAll<HTMLImageElement>('img').forEach(img => {
      if (!img.hasAttribute('alt')) {
        issues.push({
          id: 'img-alt-missing',
          level: 'error',
          title: '이미지 alt 속성 누락',
          message: `${describeElement(img)} — alt 속성이 없습니다.`,
          element: img,
          selector: describeElement(img),
          autoFix: () => { img.alt = '이미지'; },
        });
      } else if (img.alt === '') {
        issues.push({
          id: 'img-alt-empty',
          level: 'warning',
          title: '이미지 alt 속성 빈값',
          message: `${describeElement(img)} — alt가 빈 문자열입니다. 장식용 이미지가 맞는지 확인하세요.`,
          element: img,
          selector: describeElement(img),
        });
      }
    });
    return issues;
  }

  // 2. 표 캡션/th scope ────────────────────────────────────────────────────────

  private checkTable(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    this.root.querySelectorAll<HTMLTableElement>('table').forEach(table => {
      if (!table.querySelector('caption')) {
        issues.push({
          id: 'table-caption-missing',
          level: 'warning',
          title: '표 캡션 누락',
          message: `${describeElement(table)} — caption 요소가 없습니다.`,
          element: table,
          selector: describeElement(table),
          autoFix: () => {
            const cap = table.ownerDocument.createElement('caption');
            cap.textContent = '표';
            table.prepend(cap);
          },
        });
      }
      if (!table.hasAttribute('summary')) {
        issues.push({
          id: 'table-summary-missing',
          level: 'info',
          title: '표 summary 속성 없음',
          message: `${describeElement(table)} — summary 속성을 추가하면 스크린 리더에 도움이 됩니다.`,
          element: table,
          selector: describeElement(table),
        });
      }
      table.querySelectorAll<HTMLTableCellElement>('th').forEach(th => {
        if (!th.hasAttribute('scope')) {
          issues.push({
            id: 'th-scope-missing',
            level: 'warning',
            title: '표 헤더 scope 누락',
            message: `th 요소에 scope 속성이 없습니다.`,
            element: th,
            selector: describeElement(th),
            autoFix: () => { th.scope = 'col'; },
          });
        }
      });
    });
    return issues;
  }

  // 3. 링크 텍스트 ─────────────────────────────────────────────────────────────

  private checkLinkText(): AccessibilityIssue[] {
    const VAGUE = new Set(['여기', '클릭', '링크', '더보기', '바로가기', 'here', 'click', 'link', 'more']);
    const issues: AccessibilityIssue[] = [];
    this.root.querySelectorAll<HTMLAnchorElement>('a').forEach(a => {
      const text = (a.textContent ?? '').trim();
      const hasImgAlt = a.querySelector('img[alt]') !== null;
      if (!text && !hasImgAlt) {
        issues.push({
          id: 'link-no-text',
          level: 'error',
          title: '링크 텍스트 없음',
          message: `${describeElement(a)} — 링크에 텍스트가 없습니다.`,
          element: a,
          selector: describeElement(a),
        });
      } else if (text && VAGUE.has(text.toLowerCase())) {
        issues.push({
          id: 'link-vague-text',
          level: 'warning',
          title: '링크 텍스트 불명확',
          message: `<a>${text}</a> — 링크 목적을 알 수 없는 텍스트입니다.`,
          element: a,
          selector: describeElement(a),
        });
      }
    });
    return issues;
  }

  // 4. 폼 레이블 ───────────────────────────────────────────────────────────────

  private checkFormLabels(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    const doc = this.root.ownerDocument;
    this.root.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select').forEach(el => {
      const hasAriaLabel = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby');
      const hasLabel = el.id ? doc.querySelector(`label[for="${el.id}"]`) !== null : false;
      if (!hasLabel && !hasAriaLabel) {
        const tag = el.tagName.toLowerCase();
        issues.push({
          id: `${tag}-label-missing`,
          level: 'error',
          title: `${tag === 'input' ? '입력 필드' : '선택 상자'} 레이블 없음`,
          message: `${describeElement(el)} — label 연결이 없습니다.`,
          element: el,
          selector: describeElement(el),
        });
      }
    });
    return issues;
  }

  // 5. 비디오 자막 트랙 ────────────────────────────────────────────────────────

  private checkVideoTrack(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    this.root.querySelectorAll<HTMLVideoElement>('video').forEach(video => {
      if (!video.querySelector('track')) {
        issues.push({
          id: 'video-track-missing',
          level: 'warning',
          title: '비디오 자막 트랙 없음',
          message: `${describeElement(video)} — track 요소가 없습니다.`,
          element: video,
          selector: describeElement(video),
        });
      }
    });
    return issues;
  }

  // 6. 중복 ID ─────────────────────────────────────────────────────────────────

  private checkDuplicateIds(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    const idMap = new Map<string, Element[]>();
    this.root.querySelectorAll('[id]').forEach(el => {
      if (!idMap.has(el.id)) idMap.set(el.id, []);
      idMap.get(el.id)!.push(el);
    });
    idMap.forEach((els, id) => {
      if (els.length > 1) {
        issues.push({
          id: 'duplicate-id',
          level: 'error',
          title: '중복 ID',
          message: `id="${id}" 가 ${els.length}개 요소에서 사용됩니다.`,
          element: els[0],
          selector: `[id="${id}"]`,
        });
      }
    });
    return issues;
  }

  // 7. 색상 대비 (WCAG AA 4.5:1) ───────────────────────────────────────────────

  private checkColorContrast(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    if (typeof window === 'undefined') return issues;

    const checked = new Set<string>();
    const textEls = this.root.querySelectorAll<HTMLElement>(
      'p, li, span, td, th, h1, h2, h3, h4, h5, h6, a'
    );
    textEls.forEach(el => {
      try {
        const style = window.getComputedStyle(el);
        const fg = parseRgb(style.color);
        const bg = parseRgb(style.backgroundColor);
        if (!fg || !bg) return;
        const key = `${fg.join(',')}-${bg.join(',')}`;
        if (checked.has(key)) return;
        checked.add(key);

        const ratio = contrastRatio(
          relativeLuminance(...fg),
          relativeLuminance(...bg),
        );
        if (ratio < 4.5) {
          issues.push({
            id: 'color-contrast',
            level: 'warning',
            title: '색상 대비 부족',
            message: `대비율 ${ratio.toFixed(2)}:1 — WCAG AA 기준(4.5:1) 미만입니다.`,
            element: el,
            selector: describeElement(el),
          });
        }
      } catch {
        // getComputedStyle 실패 무시
      }
    });
    return issues;
  }

  // 8. 제목 계층 ───────────────────────────────────────────────────────────────

  private checkHeadingHierarchy(): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    const headings = Array.from(
      this.root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')
    );
    if (headings.length === 0) return issues;

    const hasH1 = headings.some(h => h.tagName === 'H1');
    if (!hasH1) {
      issues.push({
        id: 'heading-no-h1',
        level: 'warning',
        title: 'h1 제목 없음',
        message: '문서에 h1 제목이 없습니다.',
        element: headings[0],
        selector: 'heading',
      });
    }

    let prevLevel = 0;
    for (const h of headings) {
      const level = parseInt(h.tagName[1]);
      if (prevLevel > 0 && level - prevLevel > 1) {
        issues.push({
          id: 'heading-skip',
          level: 'warning',
          title: '제목 레벨 건너뜀',
          message: `h${prevLevel} 다음에 h${level}로 ${level - prevLevel - 1}단계 건너뛰었습니다.`,
          element: h,
          selector: describeElement(h),
        });
      }
      prevLevel = level;
    }
    return issues;
  }
}
