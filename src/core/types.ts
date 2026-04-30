/** 에디터 초기화 설정 */
export interface EditorConfig {
  placeholder?: string;
  maxLength?: number;
  readonly?: boolean;
  /** 자동저장 간격 (ms), 기본값 300000 (5분) */
  autoSaveInterval?: number;
}

/** 커맨드 패턴 기본 인터페이스 */
export interface Command {
  readonly name: string;
  execute(): void;
  undo(): void;
}

/** 인라인 서식 태그 타입 */
export type FormatTag = 'strong' | 'em' | 'u' | 's';

/** 서식 이름 → HTML 태그 매핑 */
export const FORMAT_TAG_MAP = {
  bold: 'strong',
  italic: 'em',
  underline: 'u',
  strike: 's',
} as const satisfies Record<string, FormatTag>;

export type FormatName = keyof typeof FORMAT_TAG_MAP;
