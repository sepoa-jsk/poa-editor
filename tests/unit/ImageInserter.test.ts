import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ImageInserter, ALLOWED_IMG_EXTENSIONS } from '../../src/modules/insert/ImageInserter';

describe('ImageInserter', () => {
  let root: HTMLDivElement;
  let inserter: ImageInserter;

  beforeEach(() => {
    root = document.createElement('div');
    root.contentEditable = 'true';
    document.body.appendChild(root);
    inserter = new ImageInserter(root);
  });

  afterEach(() => {
    root.remove();
  });

  // ── validateExtension ────────────────────────────────────────────────

  it('허용 확장자는 에러 없이 통과한다', () => {
    for (const ext of ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']) {
      expect(() => inserter.validateExtension(`photo.${ext}`)).not.toThrow();
    }
  });

  it('비허용 확장자는 에러를 던진다', () => {
    expect(() => inserter.validateExtension('photo.bmp')).toThrow('지원하지 않는 파일 형식');
    expect(() => inserter.validateExtension('doc.pdf')).toThrow('지원하지 않는 파일 형식');
  });

  it('ALLOWED_IMG_EXTENSIONS는 6개 확장자를 포함한다', () => {
    expect(ALLOWED_IMG_EXTENSIONS.size).toBe(6);
    expect(ALLOWED_IMG_EXTENSIONS.has('svg')).toBe(true);
  });

  // ── insertFromUrl ────────────────────────────────────────────────────

  it('alt가 비어있으면 에러를 던진다', () => {
    expect(() =>
      inserter.insertFromUrl({ src: 'http://example.com/a.png', alt: '' })
    ).toThrow('alt 텍스트는 필수');
  });

  it('alt가 공백만이어도 에러를 던진다', () => {
    expect(() =>
      inserter.insertFromUrl({ src: 'http://example.com/a.png', alt: '   ' })
    ).toThrow('alt 텍스트는 필수');
  });

  it('정상 attrs로 img 요소가 root에 삽입된다', () => {
    // root에 포커스 + range 설정
    const range = document.createRange();
    range.selectNodeContents(root);
    range.collapse(false);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);

    inserter.insertFromUrl({
      src: 'https://example.com/img.png',
      alt: '테스트 이미지',
      title: '툴팁',
      width: '200px',
      id: 'my-img',
    });

    const img = root.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.src).toContain('img.png');
    expect(img!.alt).toBe('테스트 이미지');
    expect(img!.title).toBe('툴팁');
    expect(img!.style.width).toBe('200px');
    expect(img!.id).toBe('my-img');
  });

  it('saveSelection 후 insertFromUrl이 저장된 위치에 삽입한다', () => {
    root.innerHTML = '<p>앞 뒤</p>';
    const p = root.querySelector('p')!;
    const range = document.createRange();
    range.setStart(p.firstChild!, 1); // '앞' 뒤
    range.collapse(true);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);

    inserter.saveSelection();

    // 다른 곳으로 포커스 이동 시뮬레이션
    sel.removeAllRanges();

    inserter.insertFromUrl({ src: 'https://x.com/a.gif', alt: 'gif' });
    expect(root.querySelector('img')).not.toBeNull();
  });

  it('align left → img.style.float이 left로 설정된다', () => {
    const range = document.createRange();
    range.selectNodeContents(root);
    range.collapse(false);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);

    inserter.insertFromUrl({ src: 'http://x.com/a.png', alt: 'img', align: 'left' });
    const img = root.querySelector('img')!;
    expect(img.style.float).toBe('left');
  });

  it('className이 img.className으로 설정된다', () => {
    const range = document.createRange();
    range.selectNodeContents(root);
    range.collapse(false);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);

    inserter.insertFromUrl({ src: 'http://x.com/a.png', alt: 'img', className: 'hero-img' });
    expect(root.querySelector('img')!.className).toBe('hero-img');
  });
});
