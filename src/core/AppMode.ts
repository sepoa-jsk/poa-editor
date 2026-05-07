export type AppMode = 'admin' | 'user';

export function getAppMode(): AppMode {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'user' ? 'user' : 'admin';
}

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
