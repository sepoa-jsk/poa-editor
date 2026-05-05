# Changelog

모든 주목할 만한 변경 사항은 이 파일에 기록됩니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르며,
버전 관리는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

---

## [1.0.0] — 2026-05-05

Phase 1 완료: X-Free Editor 5 기능 완전 재현.

### Added

#### S1–S2: EditorCore + CommandManager + FormatCommand
- `EditorCore` — contenteditable 기반 편집 엔진
- `CommandManager` — Command 패턴 실행/취소 인터페이스
- `FormatCommand` — Bold / Italic / Underline / Strike 서식 명령
- `SelectionManager` — Selection API 기반 선택 영역 관리

#### S3–S4: HistoryManager (Undo/Redo 100스텝)
- `HistoryManager` — 최대 100스텝 스택 관리, 분기 자동 제거
- `Snapshot` — DOM 직렬화/복원, DOMPurify 기반 XSS 방어

#### S5–S6: `<poa-toolbar>` + `<poa-editor>` Web Component
- `PoaToolbar` — 글꼴/크기/색상/정렬/들여쓰기/줄간격/자간 14종 폰트
- `PoaEditor` — Shadow DOM 기반 에디터 루트 컴포넌트
- `PoaMenuBar` — 메뉴 탭 (파일/편집/서식/삽입/보기/도움말)
- `PoaContextToolbar` — 선택 컨텍스트 툴바
- `PoaStatusBar` — 글자 수·페이지 상태 표시

#### S7–S8: FileManager + AutoSave
- `FileManager` — File System Access API 기반 열기/저장/새 문서
- `AutoSave` — IndexedDB(`idb`) 기반 10개 스냅샷 자동저장
- `PoaSettingsDialog` — 자동저장 복원 다이얼로그

#### S9–S10: ClipboardHandler + FindReplace + ImageEditor
- `ClipboardHandler` — 붙여넣기 DOMPurify 정제, 이미지 클립보드 지원
- `FindReplace` — TreeWalker 기반 실시간 검색·강조·교체, 정규식 옵션
- `ImageEditor` — Canvas API 자르기·회전·반전
- `PoaFindReplaceDialog` — 인라인 슬라이드 찾기/바꾸기 바

#### S11–S13: ImageInserter + MultiImageUploader
- `ImageInserter` — URL 삽입, 파일 업로드, 드래그앤드롭
- `MultiImageUploader` — 다중 이미지 유효성 검증·진행 상태 관리
- `PoaImageDialog` — 이미지 삽입 다이얼로그
- `ImageResizer` — 이미지 드래그 리사이즈 핸들
- `PoaImageToolbar` — 이미지 컨텍스트 툴바 (정렬/크기)

#### S14–S17: 표 편집 풀 기능
- `TableBuilder` — 행/열 수·헤더 위치·셀 크기 지정 삽입
- `CellMerger` — 다중 셀 병합/수평 분할/수직 분할
- `TableNavigator` — 키보드 탐색, Tab/Shift+Tab 셀 이동
- `TableResizer` — 드래그 열 너비 조절
- `TableSelector` — 다중 셀 드래그 선택
- `TableHandle` — 표 이동·선택 핸들
- `TableContextMenu` — 우클릭 컨텍스트 메뉴
- `TableWholeResizer` — 전체 표 너비 조절
- `TableInlineToolbar` — 표 선택 시 인라인 툴바
- `PoaTableDialog` — 표 삽입 다이얼로그
- `PoaCellSplitDialog` — 셀 나누기 다이얼로그
- 표 프리셋 (`TABLE_PRESETS`, `applyPreset`)

#### S18–S19: 링크 + 북마크
- `LinkInserter` — 하이퍼링크 삽입/수정, URL 유효성 검사
- `BookmarkManager` — 문서 내 앵커(책갈피) 관리
- `PoaLinkDialog` — 링크 삽입/편집 다이얼로그

#### S20–S22: ViewManager (5가지 보기 모드) + PageView
- `ViewManager` — 편집 / 인쇄 / 읽기 / HTML / 전체화면 5가지 모드
- `PageView` — A4 페이지 레이아웃, 눈금자 (Canvas 렌더링)
- `PoaContextToolbar` — 보기 모드별 컨텍스트 툴바 전환

#### S23–S24: FormatPainter + ListManager
- `FormatPainter` — 서식 복사/붙여넣기/제거, 연속 모드
- `ListManager` — 글머리 기호(ul)/번호(ol) 토글, 들여쓰기/내어쓰기
- 위/아래 첨자 (`sup`/`sub`) 토글

#### S25–S26: 빌드·배포·문서화
- Vite 라이브러리 모드: ESM / CJS / UMD 3가지 번들
- vite-plugin-dts: `dist/index.d.ts` 통합 타입 선언
- `package.json` exports 맵, peerDependencies
- `createEditor()` 팩토리 함수
- `Toast` / `ConfirmDialog` — 브라우저 `alert()`/`confirm()` 완전 제거
- CSS Custom Properties 외부 노출
- README.md / CHANGELOG.md 작성

---

[1.0.0]: https://github.com/sepoasoft/poa-editor/releases/tag/v1.0.0
