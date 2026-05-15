const TYPE_CONFIG = {
    success: { color: '#16A34A', icon: '✓' },
    error: { color: '#EF4444', icon: '✕' },
    info: { color: '#3B82F6', icon: 'ℹ' },
};
/**
 * 에디터 우측 하단 스택 토스트 알림.
 * document.body에 고정 위치 컨테이너를 추가하며, destroy()로 정리한다.
 */
export class PoaToast {
    container;
    constructor() {
        this.container = document.createElement('div');
        const s = this.container.style;
        s.position = 'fixed';
        s.bottom = '16px';
        s.right = '16px';
        s.zIndex = '99999';
        s.display = 'flex';
        s.flexDirection = 'column';
        s.gap = '8px';
        s.pointerEvents = 'none';
        s.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        document.body.appendChild(this.container);
    }
    show(message, type = 'info', duration = 2000) {
        const { color, icon } = TYPE_CONFIG[type];
        const toast = document.createElement('div');
        const ts = toast.style;
        ts.background = '#1F2937';
        ts.color = '#FFFFFF';
        ts.borderRadius = '8px';
        ts.padding = '10px 16px';
        ts.fontSize = '13px';
        ts.minWidth = '200px';
        ts.display = 'flex';
        ts.alignItems = 'center';
        ts.gap = '8px';
        ts.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        ts.borderLeft = `4px solid ${color}`;
        ts.opacity = '0';
        ts.transform = 'translateY(20px)';
        ts.transition = 'opacity 0.2s ease, transform 0.2s ease';
        ts.pointerEvents = 'auto';
        const iconEl = document.createElement('span');
        iconEl.textContent = icon;
        iconEl.style.color = color;
        iconEl.style.fontWeight = '600';
        iconEl.style.flexShrink = '0';
        iconEl.style.fontSize = '14px';
        const msgEl = document.createElement('span');
        msgEl.textContent = message;
        toast.appendChild(iconEl);
        toast.appendChild(msgEl);
        this.container.appendChild(toast);
        // 진입 애니메이션 (double rAF — 트랜지션 발화 보장)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0)';
            });
        });
        // 퇴장 애니메이션 + DOM 정리
        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    destroy() {
        this.container.remove();
    }
}
