/**
 * DOM innerHTML을 gzip으로 압축 직렬화 / 복원하는 유틸리티.
 *
 * - 직렬화: CompressionStream(gzip) 사용. 미지원 환경(jsdom 등)은 UTF-8 인코딩으로 폴백.
 * - 복원: gzip 매직 바이트(0x1f 0x8b) 감지 → DecompressionStream 사용, 미감지 시 UTF-8 디코딩.
 * - 자동저장(AutoSave)과 Undo/Redo 양쪽에서 공유 사용.
 */
export class Snapshot {
  /**
   * HTML 문자열을 gzip 압축 Uint8Array로 직렬화한다.
   * CompressionStream 미지원 환경에서는 UTF-8 바이트를 그대로 반환.
   */
  static async serialize(html: string): Promise<Uint8Array> {
    const bytes = new TextEncoder().encode(html);

    if (typeof CompressionStream === 'undefined') {
      return bytes;
    }

    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    const reader = cs.readable.getReader();

    await writer.write(bytes);
    await writer.close();

    return Snapshot.collectStream(reader);
  }

  /**
   * Uint8Array를 HTML 문자열로 복원한다.
   * gzip 매직 바이트 미감지 또는 DecompressionStream 미지원 시 UTF-8 디코딩으로 폴백.
   */
  static async deserialize(data: Uint8Array): Promise<string> {
    const isGzip = data.length >= 2 && data[0] === 0x1f && data[1] === 0x8b;

    if (!isGzip || typeof DecompressionStream === 'undefined') {
      return new TextDecoder().decode(data);
    }

    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    const reader = ds.readable.getReader();

    await writer.write(new Uint8Array(data));
    await writer.close();

    const result = await Snapshot.collectStream(reader);
    return new TextDecoder().decode(result);
  }

  private static async collectStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
  ): Promise<Uint8Array> {
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const totalLen = chunks.reduce((sum, c) => sum + c.length, 0);
    const out = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }
}
