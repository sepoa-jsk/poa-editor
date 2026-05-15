const USER_ID_KEY = 'poa-user-id';
const USER_NAME_KEY = 'poa-user-name';
const ROLE_KEY = 'poa-role';
function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    }
    // HTTP(비보안) 컨텍스트 fallback
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}
export function getUserId() {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
        id = generateId();
        localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
}
export function setUserId(id) {
    localStorage.setItem(USER_ID_KEY, id);
}
export function getUserName() {
    return localStorage.getItem(USER_NAME_KEY) ?? '사용자';
}
export function setUserName(name) {
    localStorage.setItem(USER_NAME_KEY, name.trim() || '사용자');
}
export function isAdmin() {
    return getUserId() === 'admin' || localStorage.getItem(ROLE_KEY) === 'admin';
}
export function setRole(role) {
    localStorage.setItem(ROLE_KEY, role);
}
/** URL role 파라미터로 역할 설정; 파라미터 없으면 localStorage 역할 초기화 (URL이 권위 원천) */
export function initRoleFromUrl() {
    const role = new URLSearchParams(window.location.search).get('role');
    if (role) {
        setRole(role);
    }
    else {
        localStorage.removeItem(ROLE_KEY);
    }
}
