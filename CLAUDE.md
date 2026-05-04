# CLAUDE.md — poa-editor Phase 1 개발 지침
# TypeScript + Vanilla Web Components 기반 웹 에디터

## 프로젝트 개요
- **목표**: X-Free Editor 5 기능을 IE 없이 현대 브라우저에서 완전 재현
- **언어**: TypeScript 5.x (strict: true)
- **컴포넌트**: Vanilla Web Components (Custom Elements v1)
- **빌드**: Vite 5 + vite-plugin-dts
- **테스트**: Vitest (unit) + Playwright (E2E)
- **패키지 관리**: pnpm
- **prefix**: `poa-` (예: `<poa-editor>`, `<poa-toolbar>`)
- **개발 기간**: 26주 (11개 스프린트)

## 주요 의존성
| 분류 | 패키지 | 용도 |
|------|--------|------|
| 보안 | dompurify | 외부 HTML 정제, XSS 방어 |
| 저장 | idb | IndexedDB 래퍼, 자동저장 이력 |
| 이미지 | Canvas API + OffscreenCanvas | 자르기·회전·반전 (외부 의존성 없음) |
| 클립보드 | Clipboard API | 비동기 붙여넣기 |
| 파일 | File System Access API | 로컬 파일 열기/저장 |
| 뷰 | CodeMirror 6 | HTML 모드 구문 강조 (선택적) |

## 아키텍처 규칙
1. **Core Engine은 DOM에 직접 접근 금지** — 순수 TypeScript 클래스만 허용
2. **모든 DOM 조작은 Module Layer에서 수행** — Core의 Command를 받아 실행
3. **모듈 간 통신은 `eventBus.ts`를 통해서만 수행** (직접 import 금지)
4. **Web Component는 Shadow DOM 사용**, 스타일 누출 방지
5. **외부 사용자 입력(클립보드/파일/URL)은 반드시 DOMPurify 정제 후 삽입**
6. **상위 레이어는 하위 레이어에만 의존** — 역방향 의존 금지

## 레이어 구조
```
Public API Layer  src/index.ts              외부 소비자 진입점 (타입 + 팩토리만 노출)
Component Layer   src/components/           <poa-editor>, <poa-toolbar>, dialogs
Module Layer      src/modules/              edit / insert / table / format / file / view
Core Engine       src/core/                 EditorCore, CommandManager, HistoryManager, SelectionManager
Utils             src/utils/                dom.ts, color.ts, eventBus.ts
```

## 폴더 구조
```
poa-editor/
├── src/
│   ├── core/
│   │   ├── commands/
│   │   │   ├── BaseCommand.ts        추상 커맨드 인터페이스
│   │   │   ├── FormatCommand.ts      Bold/Italic/Underline/Strike
│   │   │   ├── InsertCommand.ts      이미지/링크/표/기호 삽입
│   │   │   └── TableCommand.ts       셀 병합/분할/행열 CRUD
│   │   ├── history/
│   │   │   ├── HistoryManager.ts     100스텝 스택 관리
│   │   │   └── Snapshot.ts           DOM 직렬화/복원
│   │   ├── selection/
│   │   │   └── SelectionManager.ts
│   │   ├── EditorCore.ts
│   │   └── types.ts                  공용 타입 정의
│   ├── components/
│   │   ├── PoaEditor.ts              <poa-editor> 루트
│   │   ├── Toolbar.ts                <poa-toolbar>
│   │   ├── StatusBar.ts              글자수·페이지 상태
│   │   └── dialogs/
│   │       ├── ImageDialog.ts
│   │       ├── LinkDialog.ts
│   │       ├── TableDialog.ts
│   │       ├── FindReplaceDialog.ts
│   │       └── ImageEditDialog.ts
│   ├── modules/
│   │   ├── edit/
│   │   │   ├── ClipboardHandler.ts
│   │   │   ├── FindReplace.ts
│   │   │   └── ImageEditor.ts        Canvas 기반
│   │   ├── insert/
│   │   │   ├── ImageInserter.ts
│   │   │   ├── MultiImageUploader.ts
│   │   │   ├── LinkInserter.ts
│   │   │   └── BookmarkManager.ts
│   │   ├── table/
│   │   │   ├── TableBuilder.ts
│   │   │   ├── CellMerger.ts
│   │   │   └── TableNavigator.ts
│   │   ├── format/
│   │   │   ├── FormatPainter.ts
│   │   │   └── ListManager.ts
│   │   ├── file/
│   │   │   ├── FileManager.ts
│   │   │   └── AutoSave.ts           IndexedDB
│   │   └── view/
│   │       ├── ViewManager.ts
│   │       └── PageView.ts
│   ├── utils/
│   │   ├── dom.ts                    DOMPurify 래퍼, 타입 가드
│   │   ├── color.ts                  색상 대비율 계산 (WCAG)
│   │   └── eventBus.ts               모듈 간 이벤트 통신
│   └── index.ts                      Public API 진입점
├── tests/
│   ├── unit/                         Vitest
│   └── e2e/                          Playwright
├── demo/                             개발용 데모 페이지
├── CLAUDE.md
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.json
└── package.json
```

## 파일 작성 규칙
- **단일 책임**: 1파일 = 1클래스 또는 1함수 그룹
- **파일 크기 상한**: 300줄 초과 시 분리 검토
- **export**: named export만 사용 (`default export` 금지)
- **타입**: `any` 사용 금지 — `unknown` 또는 구체 타입 사용
- **주석**: JSDoc 형식, 한국어 허용

## 구현 우선순위 (Phase 1 스프린트)
| 스프린트 | 주차 | 구현 항목 | 상태 |
|----------|------|-----------|------|
| S1-S2 | 1-2주 | EditorCore + CommandManager + FormatCommand | ✅ |
| S3-S4 | 3-4주 | HistoryManager (Undo/Redo 100스텝) | ✅ |
| S5-S6 | 5-6주 | `<poa-toolbar>` Web Component + 기본 서식 | ✅ |
| S7-S8 | 7-8주 | FileManager + AutoSave (IndexedDB) | ✅ |
| S9-S10 | 9-10주 | ClipboardHandler + FindReplace + ImageEditor | ✅ |
| S11-S13 | 11-13주 | ImageInserter + MultiImageUploader | ✅ |
| S14-S17 | 14-17주 | TableBuilder + CellMerger + TableNavigator + TableResizer + TableSelector + TableHandle + TableContextMenu + TablePresets + CellSplitDialog | ✅ |
| S18-S19 | 18-19주 | LinkInserter + BookmarkManager | [ ] |
| S20-S22 | 20-22주 | ViewManager (5-Mode) + PageView | [ ] |
| S23-S24 | 23-24주 | FormatPainter + ListManager + 통합 QA | [ ] |
| S25-S26 | 25-26주 | 빌드·배포·문서화 | [ ] |

## 금지 사항
- React / Vue / Angular 등 UI 프레임워크 도입 금지
- jQuery 사용 금지
- `document.execCommand()` 사용 금지 (deprecated) — Selection API 사용
- `innerHTML` 직접 할당 금지 — `DOMPurify.sanitize()` 래퍼 사용
- `eval()` 및 `Function()` 생성자 사용 금지

## 테스트 기준
- 유닛 테스트 커버리지: Core Engine **90% 이상**
- E2E 시나리오 커버리지: Phase 1 기능 **80% 이상**
- 크로스브라우저: Chrome / Edge / Firefox / Safari 최신 버전
- Lighthouse 접근성 점수: **85 이상**

## 스프린트 작업 요청 템플릿
```
[스프린트 ID]를 구현해줘.
- 구현 대상: [파일 목록]
- 의존 파일: [이미 완성된 파일 목록]
- 완료 조건: [테스트/동작 기준]
- 주의사항: [특이 사항]
```

## 브랜치 전략
- `main`: 배포 브랜치 (직접 push 금지)
- `develop`: 통합 브랜치
- `feature/[sprint-id]-[기능명]`: 스프린트별 작업 브랜치
  - 예) `feature/S1-editor-core`, `feature/S7-autosave`

## 커밋 메시지 컨벤션
```
feat(scope): 한국어 설명    # 새 기능
fix(scope): 한국어 설명     # 버그 수정
test(scope): 한국어 설명    # 테스트 추가
refactor(scope): 설명       # 리팩터링

예) feat(history): HistoryManager Undo/Redo 100스텝 구현
```

## 핵심 코드 패턴 레퍼런스

### Command 패턴
```typescript
// src/core/commands/BaseCommand.ts
export interface Command {
  readonly name: string;
  execute(): void;
  undo(): void;
}
```

### HistoryManager
```typescript
// src/core/history/HistoryManager.ts
export class HistoryManager {
  private stack: Command[] = [];
  private pointer = -1;
  private readonly maxSize = 100;

  push(cmd: Command): void {
    this.stack.splice(this.pointer + 1); // 분기 제거
    this.stack.push(cmd);
    if (this.stack.length > this.maxSize) this.stack.shift();
    else this.pointer++;
  }
  undo() { if (this.canUndo()) this.stack[this.pointer--].undo(); }
  redo() { if (this.canRedo()) this.stack[++this.pointer].execute(); }
  canUndo() { return this.pointer >= 0; }
  canRedo() { return this.pointer < this.stack.length - 1; }
}
```

### AutoSave (IndexedDB + idb)
```typescript
// src/modules/file/AutoSave.ts
import { openDB } from 'idb';

const DB_NAME = 'poa-editor-autosave';
const STORE = 'snapshots';
const MAX_ENTRIES = 10;

export async function saveSnapshot(html: string): Promise<void> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) { db.createObjectStore(STORE, { autoIncrement: true }); }
  });
  const tx = db.transaction(STORE, 'readwrite');
  await tx.store.put({ html, savedAt: Date.now() });
  const keys = await tx.store.getAllKeys();
  if (keys.length > MAX_ENTRIES) await tx.store.delete(keys[0]);
  await tx.done;
}
```

### ClipboardHandler (DOMPurify 정제)
```typescript
// src/modules/edit/ClipboardHandler.ts
import DOMPurify from 'dompurify';

export function registerPasteHandler(root: HTMLElement): void {
  root.addEventListener('paste', async (e) => {
    e.preventDefault();
    const html = e.clipboardData?.getData('text/html');
    const text = e.clipboardData?.getData('text/plain');
    const clean = html
      ? DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
      : (text ?? '');
    // Selection API를 사용하여 삽입 (execCommand 금지)
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const fragment = range.createContextualFragment(clean);
    range.insertNode(fragment);
  });
}
```
