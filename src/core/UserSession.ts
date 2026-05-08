const USER_ID_KEY   = 'poa-user-id';
const USER_NAME_KEY = 'poa-user-name';
const ROLE_KEY      = 'poa-role';

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  }
  // HTTP(비보안) 컨텍스트 fallback
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

export function getUserId(): string {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

export function setUserId(id: string): void {
  localStorage.setItem(USER_ID_KEY, id);
}

export function getUserName(): string {
  return localStorage.getItem(USER_NAME_KEY) ?? '사용자';
}

export function setUserName(name: string): void {
  localStorage.setItem(USER_NAME_KEY, name.trim() || '사용자');
}

export function isAdmin(): boolean {
  return getUserId() === 'admin' || localStorage.getItem(ROLE_KEY) === 'admin';
}

export function setRole(role: string): void {
  localStorage.setItem(ROLE_KEY, role);
}

/** URL에 ?role=admin 파라미터가 있으면 자동으로 admin 역할 설정 */
export function initRoleFromUrl(): void {
  const role = new URLSearchParams(window.location.search).get('role');
  if (role) setRole(role);
}
