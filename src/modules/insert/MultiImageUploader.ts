export interface UploadItem {
  file: File;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  url?: string;
  error?: string;
}

export interface MultiUploadOptions {
  uploadUrl: string;
  fieldName?: string;
  headers?: Record<string, string>;
  maxTotalBytes?: number;
  onProgress?: (items: ReadonlyArray<UploadItem>) => void;
}

export interface ValidationResult {
  valid: File[];
  errors: string[];
}

export const MULTI_ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
const DEFAULT_MAX_BYTES = 20 * 1024 * 1024; // 20 MB

/**
 * 다중 이미지 업로드 관리자.
 * - 확장자 화이트리스트 · 총 용량 20MB 검증 후 Promise.allSettled로 병렬 업로드.
 * - 각 항목의 상태(pending/uploading/done/error)를 onProgress 콜백으로 보고한다.
 */
export class MultiImageUploader {
  private items: UploadItem[] = [];

  /** 파일 목록을 사전 검증하고 valid/errors를 반환한다 */
  validateFiles(files: File[], maxTotalBytes = DEFAULT_MAX_BYTES): ValidationResult {
    const valid: File[] = [];
    const errors: string[] = [];
    let totalSize = 0;

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!MULTI_ALLOWED_EXTENSIONS.has(ext)) {
        errors.push(`${file.name}: 지원하지 않는 형식 (허용: jpg/jpeg/png/gif/webp/svg)`);
        continue;
      }
      if (totalSize + file.size > maxTotalBytes) {
        const limitMB = Math.round(maxTotalBytes / 1024 / 1024);
        errors.push(`총 업로드 용량이 ${limitMB}MB를 초과합니다. (${file.name} 이후 파일 제외)`);
        break;
      }
      totalSize += file.size;
      valid.push(file);
    }

    return { valid, errors };
  }

  /** 파일 목록을 병렬 업로드하고 최종 UploadItem 배열을 반환한다 */
  async upload(files: File[], options: MultiUploadOptions): Promise<UploadItem[]> {
    this.items = files.map((file) => ({
      file,
      status: 'pending' as const,
      progress: 0,
    }));
    options.onProgress?.(this.snapshot());

    const results = await Promise.allSettled(
      files.map((file, index) => this.uploadOne(file, index, options)),
    );

    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        this.items[i].status = 'done';
        this.items[i].url = result.value;
        this.items[i].progress = 100;
      } else {
        this.items[i].status = 'error';
        this.items[i].error =
          result.reason instanceof Error ? result.reason.message : '업로드 실패';
      }
    });

    options.onProgress?.(this.snapshot());
    return this.snapshot();
  }

  private async uploadOne(
    file: File,
    index: number,
    options: MultiUploadOptions,
  ): Promise<string> {
    this.items[index].status = 'uploading';
    options.onProgress?.(this.snapshot());

    const formData = new FormData();
    formData.append(options.fieldName ?? 'file', file);

    const res = await fetch(options.uploadUrl, {
      method: 'POST',
      headers: options.headers,
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { url?: string };
    if (!json.url) throw new Error('서버에서 URL을 반환하지 않았습니다.');

    this.items[index].progress = 100;
    options.onProgress?.(this.snapshot());
    return json.url;
  }

  private snapshot(): UploadItem[] {
    return this.items.map((item) => ({ ...item }));
  }
}
