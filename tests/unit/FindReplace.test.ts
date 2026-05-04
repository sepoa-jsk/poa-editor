import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FindReplace } from '../../src/modules/edit/FindReplace';

function makeRoot(html: string): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('FindReplace', () => {
  let root: HTMLDivElement;
  let fr: FindReplace;

  beforeEach(() => {
    // 'hello' 3개(Hello, hello, HELLO), 'World' 1개
    root = makeRoot('<p>Hello World hello</p><p>HELLO end</p>');
    fr = new FindReplace(root);
  });

  afterEach(() => {
    fr.clearMarks();
    root.remove();
  });

  it('find: 대소문자 무시 검색이 기본값', () => {
    const state = fr.find('hello');
    expect(state.count).toBe(3);
    expect(state.current).toBe(0);
  });

  it('find: 대소문자 구분 옵션', () => {
    const state = fr.find('hello', { caseSensitive: true });
    expect(state.count).toBe(1);
  });

  it('find: 전체 단어 옵션', () => {
    const state = fr.find('World', { wholeWord: true });
    // "World" 1개 — 부분 매칭 없음
    expect(state.count).toBe(1);
  });

  it('find: 빈 쿼리는 count 0 반환', () => {
    const state = fr.find('');
    expect(state.count).toBe(0);
  });

  it('find: 존재하지 않는 쿼리는 count 0 반환', () => {
    const state = fr.find('zzz');
    expect(state.count).toBe(0);
    expect(state.current).toBe(-1);
  });

  it('find 후 <mark> 요소가 삽입됨', () => {
    fr.find('hello');
    const marks = root.querySelectorAll('mark[data-poa-mark]');
    expect(marks.length).toBeGreaterThan(0);
  });

  it('next: 인덱스가 순환하며 증가', () => {
    fr.find('hello');
    const s1 = fr.next();
    expect(s1.current).toBe(1);
    const s2 = fr.next();
    expect(s2.current).toBe(2);
    // 마지막에서 next → 처음으로 순환
    const s3 = fr.next();
    expect(s3.current).toBe(0);
  });

  it('prev: 처음에서 prev → 마지막으로 순환', () => {
    fr.find('hello');
    const s = fr.prev();
    expect(s.current).toBe(s.count - 1);
  });

  it('replaceCurrent: 현재 매칭을 교체', () => {
    fr.find('hello', { caseSensitive: true });
    fr.find('hello', { caseSensitive: true });
    fr.replaceCurrent('Hi');
    expect(root.textContent).toContain('Hi');
    expect(root.querySelectorAll('mark[data-poa-mark]').length).toBe(0);
  });

  it('replaceAll: 모든 매칭을 교체하고 횟수 반환', () => {
    const count = fr.replaceAll('hello', '안녕');
    expect(count).toBe(3);
    expect(root.textContent).not.toMatch(/hello/i);
    expect(root.querySelectorAll('mark[data-poa-mark]').length).toBe(0);
  });

  it('clearMarks: <mark> 제거 후 원본 텍스트 복원', () => {
    fr.find('hello');
    fr.clearMarks();
    expect(root.querySelectorAll('mark').length).toBe(0);
    expect(root.textContent).toContain('Hello');
    expect(root.textContent).toContain('World');
  });
});
