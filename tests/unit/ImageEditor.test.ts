import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ImageEditor } from '../../src/modules/edit/ImageEditor';

const MOCK_DATA_URL = 'data:image/png;base64,result==';

function mockCanvas(ctx: Partial<CanvasRenderingContext2D> = {}): void {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    drawImage: vi.fn(),
    ...ctx,
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue(MOCK_DATA_URL);
}

function mockLoadImage(naturalWidth = 100, naturalHeight = 80): void {
  // loadImage는 public이므로 spy 가능
}

describe('ImageEditor', () => {
  let editor: ImageEditor;

  beforeEach(() => {
    editor = new ImageEditor();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rotate 90°: 캔버스 크기가 가로/세로 교환됨', async () => {
    const mockCtx = { translate: vi.fn(), rotate: vi.fn(), drawImage: vi.fn() };
    mockCanvas(mockCtx);

    const fakeImg = { naturalWidth: 100, naturalHeight: 80 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    const canvasSpy = vi.spyOn(document, 'createElement');
    const result = await editor.rotate('data:image/png;base64,input', 90);

    expect(result).toBe(MOCK_DATA_URL);
    // 90° 회전 시 translate 호출: 중심점 = (80/2, 100/2) = (40, 50)
    expect(mockCtx.translate).toHaveBeenCalledWith(40, 50);
    expect(mockCtx.rotate).toHaveBeenCalledWith(Math.PI / 2);
    canvasSpy.mockRestore();
  });

  it('rotate 180°: 캔버스 크기 그대로', async () => {
    const mockCtx = { translate: vi.fn(), rotate: vi.fn(), drawImage: vi.fn() };
    mockCanvas(mockCtx);

    const fakeImg = { naturalWidth: 100, naturalHeight: 80 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    await editor.rotate('data:image/png;base64,input', 180);
    expect(mockCtx.translate).toHaveBeenCalledWith(50, 40);
    expect(mockCtx.rotate).toHaveBeenCalledWith(Math.PI);
  });

  it('flip horizontal: scale(-1, 1) 호출', async () => {
    const mockCtx = { translate: vi.fn(), scale: vi.fn(), drawImage: vi.fn() };
    mockCanvas(mockCtx);

    const fakeImg = { naturalWidth: 100, naturalHeight: 80 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    const result = await editor.flip('data:image/png;base64,input', 'horizontal');
    expect(result).toBe(MOCK_DATA_URL);
    expect(mockCtx.scale).toHaveBeenCalledWith(-1, 1);
    expect(mockCtx.translate).toHaveBeenCalledWith(100, 0);
  });

  it('flip vertical: scale(1, -1) 호출', async () => {
    const mockCtx = { translate: vi.fn(), scale: vi.fn(), drawImage: vi.fn() };
    mockCanvas(mockCtx);

    const fakeImg = { naturalWidth: 100, naturalHeight: 80 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    await editor.flip('data:image/png;base64,input', 'vertical');
    expect(mockCtx.scale).toHaveBeenCalledWith(1, -1);
    expect(mockCtx.translate).toHaveBeenCalledWith(0, 80);
  });

  it('crop: 지정 rect 크기로 canvas 생성', async () => {
    const mockCtx = { drawImage: vi.fn() };
    mockCanvas(mockCtx);

    const fakeImg = { naturalWidth: 200, naturalHeight: 150 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    const result = await editor.crop('data:image/png;base64,input', { x: 10, y: 20, width: 50, height: 40 });
    expect(result).toBe(MOCK_DATA_URL);
    expect(mockCtx.drawImage).toHaveBeenCalledWith(
      fakeImg, 10, 20, 50, 40, 0, 0, 50, 40,
    );
  });

  it('getContext가 null이면 rotate에서 에러 발생', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const fakeImg = { naturalWidth: 100, naturalHeight: 80 };
    vi.spyOn(editor, 'loadImage').mockResolvedValue(fakeImg as HTMLImageElement);

    await expect(editor.rotate('data:image/png;base64,x', 90))
      .rejects.toThrow('Canvas 2D context를 가져올 수 없습니다.');
  });

  it('loadImage: 이미지 로드 실패 시 reject', async () => {
    // jsdom에서는 onerror가 자동 발생하지 않으므로 Image를 모킹해 즉시 오류를 발생시킨다
    const OriginalImage = globalThis.Image;
    globalThis.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_: string) { setTimeout(() => this.onerror?.(), 0); }
      get src(): string { return ''; }
    } as unknown as typeof Image;

    await expect(editor.loadImage('data:image/png;bad')).rejects.toThrow('이미지 로드 실패');
    globalThis.Image = OriginalImage;
  });
});
