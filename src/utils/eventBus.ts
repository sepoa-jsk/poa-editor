type Handler<T = unknown> = (payload: T) => void;

/** 모듈 간 이벤트 통신 버스. 직접 import 대신 이 인스턴스를 통해 통신한다. */
class EventBus {
  private readonly listeners = new Map<string, Set<Handler>>();

  on<T>(event: string, handler: Handler<T>): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    (this.listeners.get(event) as Set<Handler>).add(handler as Handler);
  }

  off<T>(event: string, handler: Handler<T>): void {
    (this.listeners.get(event) as Set<Handler> | undefined)?.delete(handler as Handler);
  }

  emit<T>(event: string, payload: T): void {
    (this.listeners.get(event) as Set<Handler> | undefined)?.forEach((h) => h(payload));
  }
}

export const eventBus = new EventBus();

/** eventBus 이벤트 이름 상수 */
export const BusEvent = {
  FILE_NEW:    'file:new',
  FILE_OPENED: 'file:opened',   // payload: { name: string; html: string }
  FILE_SAVED:  'file:saved',    // payload: { name: string }
  FILE_DIRTY:  'file:dirty',    // payload: boolean
  AUTOSAVE_SAVED:    'autosave:saved',    // payload: { savedAt: number }
  AUTOSAVE_RESTORED: 'autosave:restored', // payload: { html: string }
  /** 메뉴바 탭 변경 — payload: { tab: MenuTab } */
  MENUBAR_CHANGE: 'menubar:change',
} as const;
