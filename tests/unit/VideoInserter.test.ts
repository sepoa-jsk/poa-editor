import { describe, it, expect } from 'vitest';
import {
  parseEmbedUrl,
  buildVideoHtml,
  buildEmbedHtml,
} from '../../src/modules/insert/VideoInserter.js';

// ── 1. parseEmbedUrl() ────────────────────────────────────────────────────────

describe('parseEmbedUrl()', () => {
  it('YouTube watch URL → embed URL + 썸네일', () => {
    const res = parseEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(res?.embedUrl).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    expect(res?.provider).toBe('youtube');
    expect(res?.thumbnailUrl).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg');
  });

  it('YouTube 단축 URL (youtu.be) → embed URL', () => {
    const res = parseEmbedUrl('https://youtu.be/dQw4w9WgXcQ');
    expect(res?.embedUrl).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    expect(res?.provider).toBe('youtube');
  });

  it('YouTube URL + 추가 파라미터 → 정확한 ID 추출', () => {
    const res = parseEmbedUrl('https://www.youtube.com/watch?v=abc12345678&t=30s');
    expect(res?.embedUrl).toBe('https://www.youtube.com/embed/abc12345678');
  });

  it('Vimeo URL → embed URL', () => {
    const res = parseEmbedUrl('https://vimeo.com/123456789');
    expect(res?.embedUrl).toBe('https://player.vimeo.com/video/123456789');
    expect(res?.provider).toBe('vimeo');
  });

  it('Dailymotion URL → embed URL', () => {
    const res = parseEmbedUrl('https://www.dailymotion.com/video/x7tgd2h');
    expect(res?.embedUrl).toBe('https://www.dailymotion.com/embed/video/x7tgd2h');
    expect(res?.provider).toBe('dailymotion');
  });

  it('지원하지 않는 URL → null', () => {
    expect(parseEmbedUrl('https://example.com/video')).toBeNull();
  });

  it('빈 문자열 → null', () => {
    expect(parseEmbedUrl('')).toBeNull();
  });
});

// ── 2. buildVideoHtml() ───────────────────────────────────────────────────────

describe('buildVideoHtml()', () => {
  it('기본 비디오 HTML 구조', () => {
    const html = buildVideoHtml({ src: 'https://example.com/v.mp4', type: 'video/mp4' });
    expect(html).toContain('<figure class="poa-media">');
    expect(html).toContain('<video');
    expect(html).toContain('<source src="https://example.com/v.mp4" type="video/mp4">');
    expect(html).toContain('</video>');
    expect(html).toContain('</figure>');
  });

  it('controls 기본값 true', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4' });
    expect(html).toContain('controls');
  });

  it('controls=false 시 controls 속성 없음', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4', controls: false });
    expect(html).not.toContain('controls');
  });

  it('autoplay 설정 시 muted 강제 포함', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4', autoplay: true });
    expect(html).toContain('autoplay');
    expect(html).toContain('muted');
  });

  it('autoplay 없어도 muted=true 독립 설정 가능', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4', muted: true });
    expect(html).toContain('muted');
    expect(html).not.toContain('autoplay');
  });

  it('loop 속성 포함', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4', loop: true });
    expect(html).toContain('loop');
  });

  it('poster URL 포함', () => {
    const html = buildVideoHtml({
      src: 'a.mp4', type: 'video/mp4',
      poster: 'https://example.com/poster.jpg',
    });
    expect(html).toContain('poster="https://example.com/poster.jpg"');
  });

  it('track 자막 태그 포함', () => {
    const html = buildVideoHtml({
      src: 'a.mp4', type: 'video/mp4',
      trackSrc: 'https://example.com/ko.vtt', trackSrclang: 'ko',
    });
    expect(html).toContain('<track');
    expect(html).toContain('kind="captions"');
    expect(html).toContain('srclang="ko"');
    expect(html).toContain('src="https://example.com/ko.vtt"');
  });

  it('track 없으면 track 태그 없음', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4' });
    expect(html).not.toContain('<track');
  });

  it('width / height 기본값 640×360', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4' });
    expect(html).toContain('width="640"');
    expect(html).toContain('height="360"');
  });

  it('width / height 지정값 반영', () => {
    const html = buildVideoHtml({ src: 'a.mp4', type: 'video/mp4', width: 1280, height: 720 });
    expect(html).toContain('width="1280"');
    expect(html).toContain('height="720"');
  });

  it('webm type 반영', () => {
    const html = buildVideoHtml({ src: 'a.webm', type: 'video/webm' });
    expect(html).toContain('type="video/webm"');
  });
});

// ── 3. buildEmbedHtml() ───────────────────────────────────────────────────────

describe('buildEmbedHtml()', () => {
  const EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  it('기본 iframe 구조', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL });
    expect(html).toContain('<figure class="poa-media">');
    expect(html).toContain('<iframe');
    expect(html).toContain(`src="${EMBED_URL}"`);
    expect(html).toContain('</iframe>');
    expect(html).toContain('</figure>');
  });

  it('sandbox 속성 자동 주입', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL });
    expect(html).toContain('sandbox=');
    expect(html).toContain('allow-scripts');
    expect(html).toContain('allow-same-origin');
    expect(html).toContain('allow-presentation');
  });

  it('allowfullscreen 포함', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL });
    expect(html).toContain('allowfullscreen');
  });

  it('frameborder="0" 포함', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL });
    expect(html).toContain('frameborder="0"');
  });

  it('width / height 기본값 640×360', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL });
    expect(html).toContain('width="640"');
    expect(html).toContain('height="360"');
  });

  it('width / height 지정값 반영', () => {
    const html = buildEmbedHtml({ embedUrl: EMBED_URL, width: 800, height: 450 });
    expect(html).toContain('width="800"');
    expect(html).toContain('height="450"');
  });
});
