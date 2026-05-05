# poa-editor

X-Free Editor 5의 기능을 IE 없이 현대 브라우저에서 완전 재현한 Vanilla Web Components 기반 리치 텍스트 에디터입니다.

## 특징

- **프레임워크 독립** — Vanilla Web Components (`<poa-editor>`)로 React, Vue, Angular 모두에서 사용 가능
- **Shadow DOM** — 스타일 격리로 호스트 페이지와 충돌 없음
- **실행 취소/다시 실행** — 100스텝 히스토리 관리
- **표 편집** — 셀 병합/분할, 드래그 리사이즈, 키보드 탐색
- **이미지 편집** — 자르기, 회전, 반전 (Canvas API)
- **찾기/바꾸기** — 실시간 검색, 대소문자/전체 단어 옵션
- **자동저장** — IndexedDB 기반 10개 스냅샷
- **5가지 보기 모드** — 편집 / 인쇄 / 읽기 / HTML / 전체화면
- **서식 복사** — 포맷 페인터, 목록(ul/ol), 위/아래 첨자

---

## 설치

```bash
pnpm add @sepoa-jsk/poa-editor
# 또는
npm install @sepoa-jsk/poa-editor
```

---

## 기본 사용법

### HTML (스크립트 태그)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@sepoa-jsk/poa-editor/dist/poa-editor.css">
</head>
<body>
  <poa-editor id="editor" placeholder="내용을 입력하세요..."></poa-editor>

  <script type="module">
    import '@sepoa-jsk/poa-editor';

    const editor = document.getElementById('editor');
    editor.setHTML('<p>안녕하세요!</p>');
    console.log(editor.getHTML());
  </script>
</body>
</html>
```

### ES 모듈

```ts
import '@sepoa-jsk/poa-editor';
import '@sepoa-jsk/poa-editor/style';

const editor = document.querySelector('poa-editor');
editor.setHTML('<p>Hello, <strong>world</strong>!</p>');
```

### 팩토리 함수

```ts
import { createEditor } from '@sepoa-jsk/poa-editor';
import '@sepoa-jsk/poa-editor/style';

const editor = createEditor(document.getElementById('app'), {
  placeholder: '내용을 입력하세요...',
});

editor.setHTML('<p>초기 내용</p>');
const html = editor.getHTML();
```

### React

```tsx
import '@sepoa-jsk/poa-editor';
import '@sepoa-jsk/poa-editor/style';
import { useRef, useEffect } from 'react';

function RichEditor() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const editor = ref.current as any;
    editor?.setHTML('<p>React에서 사용하기</p>');
  }, []);

  return <poa-editor ref={ref} placeholder="입력하세요..." />;
}
```

### Vue

```vue
<template>
  <poa-editor ref="editorRef" placeholder="입력하세요..." />
</template>

<script setup lang="ts">
import '@sepoa-jsk/poa-editor';
import '@sepoa-jsk/poa-editor/style';
import { ref, onMounted } from 'vue';

const editorRef = ref<HTMLElement | null>(null);

onMounted(() => {
  (editorRef.value as any)?.setHTML('<p>Vue에서 사용하기</p>');
});
</script>
```

---

## HTML 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `placeholder` | `string` | 빈 에디터 안내 문구 |
| `readonly` | `boolean` (presence) | 읽기 전용 모드 |

```html
<poa-editor placeholder="여기에 입력..." readonly></poa-editor>
```

---

## JavaScript API

### 콘텐츠

```ts
editor.setHTML(html: string): void
editor.getHTML(): string
editor.getText(): string
```

### 기록 (Undo / Redo)

```ts
editor.undo(): void
editor.redo(): void
```

### 파일

```ts
editor.openFile(): Promise<void>
editor.saveFile(): Promise<void>
```

---

## CSS Custom Properties

```css
poa-editor {
  --poa-editor-border: #ccc;    /* 테두리 색상 */
  --poa-editor-bg:     #fff;    /* 편집 영역 배경 */
  --poa-editor-color:  #222;    /* 기본 텍스트 색상 */
  --poa-editor-font:   '맑은 고딕', 'Malgun Gothic', sans-serif; /* 기본 글꼴 */
}
```

---

## 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl+B` | 굵게 |
| `Ctrl+I` | 기울임 |
| `Ctrl+U` | 밑줄 |
| `Ctrl+Z` | 실행 취소 |
| `Ctrl+Y` | 다시 실행 |
| `Ctrl+F` | 찾기 |
| `Ctrl+H` | 찾기/바꾸기 |
| `Tab` | 목록 들여쓰기 |
| `Shift+Tab` | 목록 내어쓰기 |

---

## 번들 형식

| 파일 | 형식 | 용도 |
|------|------|------|
| `dist/poa-editor.es.js` | ESM | 번들러 (Vite, Webpack, esbuild) |
| `dist/poa-editor.cjs.js` | CommonJS | Node.js, 레거시 번들러 |
| `dist/poa-editor.umd.js` | UMD | `<script>` 태그 직접 로드 |
| `dist/poa-editor.css` | CSS | 전역 스타일 (선택적) |
| `dist/index.d.ts` | TypeScript | 타입 선언 |

### CDN (UMD)

```html
<script src="https://cdn.jsdelivr.net/npm/@sepoa-jsk/poa-editor/dist/poa-editor.umd.js"></script>
<link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sepoa-jsk/poa-editor/dist/poa-editor.css">
```

> **주의:** UMD 번들 사용 시 `dompurify`와 `idb`를 별도로 로드해야 합니다.

---

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 (demo/index.html 자동 오픈)
pnpm dev

# 프로덕션 빌드
pnpm build

# 테스트
pnpm test

# 테스트 (watch 모드)
pnpm test:watch
```

---

## 브라우저 지원

| Chrome | Edge | Firefox | Safari |
|--------|------|---------|--------|
| ✓ 최신 | ✓ 최신 | ✓ 최신 | ✓ 최신 |

---

## 라이선스

MIT © JSK / Sepoasoft
