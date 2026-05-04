import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MultiImageUploader, MULTI_ALLOWED_EXTENSIONS } from '../../src/modules/insert/MultiImageUploader';

function makeFile(name: string, sizeBytes = 1024): File {
  const blob = new Blob(['x'.repeat(sizeBytes)], { type: 'image/png' });
  return new File([blob], name, { type: 'image/png' });
}

describe('MultiImageUploader', () => {
  let uploader: MultiImageUploader;

  beforeEach(() => {
    uploader = new MultiImageUploader();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // ── validateFiles ────────────────────────────────────────────────────

  it('MULTI_ALLOWED_EXTENSIONS에 svg가 포함된다', () => {
    expect(MULTI_ALLOWED_EXTENSIONS.has('svg')).toBe(true);
  });

  it('허용 확장자 파일은 valid 배열에 포함된다', () => {
    const files = [makeFile('a.jpg'), makeFile('b.png'), makeFile('c.gif')];
    const { valid, errors } = uploader.validateFiles(files);
    expect(valid).toHaveLength(3);
    expect(errors).toHaveLength(0);
  });

  it('비허용 확장자 파일은 errors에 포함된다', () => {
    const files = [makeFile('a.bmp'), makeFile('b.png')];
    const { valid, errors } = uploader.validateFiles(files);
    expect(valid).toHaveLength(1); // b.png만 유효
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('a.bmp');
  });

  it('총 용량 초과 시 errors에 포함되고 이후 파일은 제외된다', () => {
    const MAX = 100; // 100바이트
    const files = [makeFile('a.png', 60), makeFile('b.png', 60)]; // 합계 120 > 100
    const { valid, errors } = uploader.validateFiles(files, MAX);
    expect(valid).toHaveLength(1); // a.png만 포함
    expect(errors.some((e) => e.includes('초과'))).toBe(true);
  });

  it('빈 배열은 valid/errors 모두 비어있다', () => {
    const { valid, errors } = uploader.validateFiles([]);
    expect(valid).toHaveLength(0);
    expect(errors).toHaveLength(0);
  });

  // ── upload ───────────────────────────────────────────────────────────

  it('업로드 성공 시 status=done 이고 url이 설정된다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'https://cdn.example.com/a.png' }),
    }));

    const files = [makeFile('a.png')];
    const results = await uploader.upload(files, { uploadUrl: '/api/upload' });

    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('done');
    expect(results[0].url).toBe('https://cdn.example.com/a.png');
  });

  it('업로드 실패 시 status=error 이고 다른 파일에 영향 없음 (Promise.allSettled)', async () => {
    let callCount = 0;
    vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return { ok: false, status: 500, json: async () => ({}) };
      return { ok: true, json: async () => ({ url: 'https://cdn.example.com/b.png' }) };
    }));

    const files = [makeFile('a.png'), makeFile('b.png')];
    const results = await uploader.upload(files, { uploadUrl: '/api/upload' });

    expect(results[0].status).toBe('error');
    expect(results[1].status).toBe('done');
    expect(results[1].url).toBe('https://cdn.example.com/b.png');
  });

  it('onProgress 콜백이 최소 2회 호출된다 (시작·종료)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'https://cdn.example.com/c.png' }),
    }));

    const calls: number[] = [];
    await uploader.upload([makeFile('c.png')], {
      uploadUrl: '/api/upload',
      onProgress: (items) => calls.push(items.length),
    });

    expect(calls.length).toBeGreaterThanOrEqual(2);
  });

  it('서버가 url을 반환하지 않으면 status=error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}), // url 없음
    }));

    const results = await uploader.upload([makeFile('x.png')], { uploadUrl: '/api/upload' });
    expect(results[0].status).toBe('error');
    expect(results[0].error).toContain('URL을 반환하지 않았습니다');
  });

  it('fieldName 옵션이 FormData에 반영된다', async () => {
    let capturedFormData: FormData | null = null;
    vi.stubGlobal('fetch', vi.fn().mockImplementation(async (_url: string, init: RequestInit) => {
      capturedFormData = init.body as FormData;
      return { ok: true, json: async () => ({ url: 'http://x.com/img.png' }) };
    }));

    await uploader.upload([makeFile('img.png')], {
      uploadUrl: '/upload',
      fieldName: 'image',
    });

    expect(capturedFormData?.has('image')).toBe(true);
  });
});
