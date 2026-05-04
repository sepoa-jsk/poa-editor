export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type RotateDegrees = 90 | 180 | 270;
export type FlipDirection = 'horizontal' | 'vertical';

/**
 * Canvas API 기반 이미지 편집 유틸리티.
 * 외부 라이브러리 없이 rotate / flip / crop 을 data URL 형태로 반환한다.
 */
export class ImageEditor {
  /** 이미지를 degrees(90|180|270)만큼 시계 방향으로 회전 */
  async rotate(dataUrl: string, degrees: RotateDegrees): Promise<string> {
    const img = await this.loadImage(dataUrl);
    const swap = degrees === 90 || degrees === 270;
    const w = swap ? img.naturalHeight : img.naturalWidth;
    const h = swap ? img.naturalWidth : img.naturalHeight;
    const canvas = this.createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context를 가져올 수 없습니다.');
    ctx.translate(w / 2, h / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    return canvas.toDataURL('image/png');
  }

  /** 이미지를 수평(horizontal) 또는 수직(vertical) 반전 */
  async flip(dataUrl: string, direction: FlipDirection): Promise<string> {
    const img = await this.loadImage(dataUrl);
    const canvas = this.createCanvas(img.naturalWidth, img.naturalHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context를 가져올 수 없습니다.');
    if (direction === 'horizontal') {
      ctx.translate(img.naturalWidth, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, img.naturalHeight);
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  }

  /** rect 영역만큼 이미지를 잘라 반환 */
  async crop(dataUrl: string, rect: CropRect): Promise<string> {
    const img = await this.loadImage(dataUrl);
    const canvas = this.createCanvas(rect.width, rect.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context를 가져올 수 없습니다.');
    ctx.drawImage(
      img,
      rect.x, rect.y, rect.width, rect.height,
      0, 0, rect.width, rect.height,
    );
    return canvas.toDataURL('image/png');
  }

  private createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  loadImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('이미지 로드 실패'));
      img.src = dataUrl;
    });
  }
}
