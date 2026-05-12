export type AppMode = 'admin' | 'user' | 'write';

export function getAppMode(): AppMode {
  const params = new URLSearchParams(window.location.search);
  if (params.get('role') === 'admin') return 'admin';
  const mode = params.get('mode');
  if (mode === 'user')  return 'user';
  if (mode === 'write') return 'write';
  return 'write'; // 기본값: 신규작성 모드
}

export function isAdmin(): boolean     { return getAppMode() === 'admin'; }
export function isWriteMode(): boolean { return getAppMode() === 'write'; }
export function isUserMode(): boolean  { return getAppMode() === 'user'; }

export function getTemplateId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('template');
}

function getBaseUrl(): string {
  const { origin, pathname } = window.location;
  const cleanPath = pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\/[^/]*\.[^/]*$/, '/');
  const base = origin + cleanPath;
  return base.endsWith('/') ? base : base + '/';
}

export function buildUserModeUrl(templateId: string): string {
  return getBaseUrl() + '?mode=user&template=' + encodeURIComponent(templateId);
}

export function getEditorSize(): { width: string; height: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    width:  params.get('width')  ?? '100%',
    height: params.get('height') ?? '100%',
  };
}
