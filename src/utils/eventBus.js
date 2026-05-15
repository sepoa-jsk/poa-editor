/** 모듈 간 이벤트 통신 버스. 직접 import 대신 이 인스턴스를 통해 통신한다. */
class EventBus {
    listeners = new Map();
    on(event, handler) {
        if (!this.listeners.has(event))
            this.listeners.set(event, new Set());
        this.listeners.get(event).add(handler);
    }
    off(event, handler) {
        this.listeners.get(event)?.delete(handler);
    }
    emit(event, payload) {
        this.listeners.get(event)?.forEach((h) => h(payload));
    }
}
export const eventBus = new EventBus();
/** eventBus 이벤트 이름 상수 */
export const BusEvent = {
    FILE_NEW: 'file:new',
    FILE_OPENED: 'file:opened', // payload: { name: string; html: string }
    FILE_SAVED: 'file:saved', // payload: { name: string }
    FILE_DIRTY: 'file:dirty', // payload: boolean
    AUTOSAVE_SAVED: 'autosave:saved', // payload: { savedAt: number }
    AUTOSAVE_RESTORED: 'autosave:restored', // payload: { html: string }
    /** 메뉴바 탭 변경 — payload: { tab: MenuTab } */
    MENUBAR_CHANGE: 'menubar:change',
    /** 뷰 모드 변경 — payload: { mode: ViewMode } */
    VIEW_CHANGE: 'view:change',
    /** 환경설정 변경 — payload: PoaSettings */
    SETTINGS_CHANGED: 'settings:changed',
    /** 페이지 수 변경 — payload: { total: number } */
    PAGE_UPDATED: 'page:updated',
    /** 문서 제목/저장 상태 변경 — payload: { title: string; dirty: boolean } */
    DOC_TITLE_CHANGE: 'doc:title-change',
};
