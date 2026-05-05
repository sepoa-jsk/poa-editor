import DOMPurify from 'dompurify';

export type VideoMimeType = 'video/mp4' | 'video/webm' | 'video/ogg';
export type EmbedProvider  = 'youtube' | 'vimeo' | 'dailymotion' | 'unknown';

export interface VideoAttributes {
  src:           string;
  type:          VideoMimeType;
  poster?:       string;
  width?:        number;
  height?:       number;
  controls?:     boolean;
  autoplay?:     boolean;
  loop?:         boolean;
  muted?:        boolean;
  trackSrc?:     string;
  trackSrclang?: string;
}

export interface EmbedAttributes {
  embedUrl: string;
  width?:   number;
  height?:  number;
}

export interface ParsedEmbed {
  embedUrl:      string;
  provider:      EmbedProvider;
  thumbnailUrl?: string;
}

// ── DOMPurify 설정: iframe + 미디어 관련 속성 화이트리스트 ──────────────────────

const PURIFY_CONFIG = {
  ADD_TAGS: ['iframe', 'video', 'source', 'track', 'figure'],
  ADD_ATTR: [
    'controls', 'autoplay', 'loop', 'muted', 'poster',
    'type', 'srclang', 'kind', 'label',
    'frameborder', 'allowfullscreen', 'sandbox',
    'width', 'height',
  ],
};

const TRACK_LANG_LABELS: Record<string, string> = {
  ko: '한국어', en: 'English', ja: '日本語', zh: '中文',
  fr: 'Français', de: 'Deutsch', es: 'Español',
};

// ── 공개 유틸 함수 ────────────────────────────────────────────────────────────

/**
 * YouTube / Vimeo / Dailymotion URL → embed URL로 변환한다.
 * 변환 불가능한 URL이면 null 반환.
 */
export function parseEmbedUrl(url: string): ParsedEmbed | null {
  const s = url.trim();

  // YouTube watch: https://www.youtube.com/watch?v=ID
  // YouTube short: https://youtu.be/ID
  let m = s.match(/(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (m) {
    const id = m[1];
    return {
      embedUrl:     `https://www.youtube.com/embed/${id}`,
      provider:     'youtube',
      thumbnailUrl: `https://img.youtube.com/vi/${id}/0.jpg`,
    };
  }

  // Vimeo: https://vimeo.com/ID
  m = s.match(/vimeo\.com\/(\d+)/);
  if (m) {
    return {
      embedUrl:  `https://player.vimeo.com/video/${m[1]}`,
      provider:  'vimeo',
    };
  }

  // Dailymotion: https://www.dailymotion.com/video/ID
  m = s.match(/dailymotion\.com\/video\/([A-Za-z0-9]+)/);
  if (m) {
    return {
      embedUrl:  `https://www.dailymotion.com/embed/video/${m[1]}`,
      provider:  'dailymotion',
    };
  }

  return null;
}

/**
 * VideoAttributes 로 <figure class="poa-media"><video …> HTML 문자열을 생성한다.
 * autoplay 설정 시 브라우저 정책에 따라 muted 가 자동으로 강제된다.
 */
export function buildVideoHtml(attrs: VideoAttributes): string {
  const w = attrs.width  ?? 640;
  const h = attrs.height ?? 360;

  // 브라우저 정책: autoplay 는 muted 와 함께만 허용
  const muted    = attrs.muted ?? (attrs.autoplay ?? false);
  const controls = attrs.controls ?? true;
  const autoplay = attrs.autoplay ?? false;
  const loop     = attrs.loop     ?? false;

  const boolAttrs = [
    controls ? 'controls' : '',
    autoplay ? 'autoplay' : '',
    loop     ? 'loop'     : '',
    muted    ? 'muted'    : '',
  ].filter(Boolean).join(' ');

  const posterAttr = attrs.poster ? ` poster="${attrs.poster}"` : '';

  const lang      = attrs.trackSrclang ?? 'ko';
  const langLabel = TRACK_LANG_LABELS[lang] ?? lang;
  const trackHtml = attrs.trackSrc
    ? `\n    <track kind="captions" src="${attrs.trackSrc}" srclang="${lang}" label="${langLabel}">`
    : '';

  return (
    `<figure class="poa-media">\n` +
    `  <video width="${w}" height="${h}"${posterAttr} ${boolAttrs}>\n` +
    `    <source src="${attrs.src}" type="${attrs.type}">${trackHtml}\n` +
    `    브라우저가 video 태그를 지원하지 않습니다.\n` +
    `  </video>\n` +
    `</figure>`
  );
}

/**
 * EmbedAttributes 로 <figure class="poa-media"><iframe …> HTML 문자열을 생성한다.
 * sandbox 속성이 자동으로 주입된다.
 */
export function buildEmbedHtml(attrs: EmbedAttributes): string {
  const w = attrs.width  ?? 640;
  const h = attrs.height ?? 360;

  return (
    `<figure class="poa-media">\n` +
    `  <iframe\n` +
    `    width="${w}" height="${h}"\n` +
    `    src="${attrs.embedUrl}"\n` +
    `    frameborder="0"\n` +
    `    allowfullscreen\n` +
    `    sandbox="allow-scripts allow-same-origin allow-presentation"\n` +
    `  ></iframe>\n` +
    `</figure>`
  );
}

// ── 메인 클래스 ────────────────────────────────────────────────────────────────

/** contenteditable 영역에 비디오/임베드 HTML을 삽입한다 */
export class VideoInserter {
  constructor(private readonly contentEl: HTMLElement) {}

  /** DOMPurify로 정제 후 커서 위치에 삽입 */
  insert(html: string): void {
    const clean = String(DOMPurify.sanitize(html, PURIFY_CONFIG));

    const sel = window.getSelection();
    if (!sel?.rangeCount || !this.contentEl.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      this.contentEl.insertAdjacentHTML('beforeend', clean);
      return;
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();
    const frag = range.createContextualFragment(clean);
    range.insertNode(frag);
    range.collapse(false);
  }
}
