import type { Command } from '../types';

/** 모든 커맨드의 추상 기반 클래스 */
export abstract class BaseCommand implements Command {
  readonly name: string;

  protected constructor(name: string) {
    this.name = name;
  }

  abstract execute(): void;
  abstract undo(): void;
}
