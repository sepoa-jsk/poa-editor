export type AppMode = 'admin' | 'user';

export function getAppMode(): AppMode {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') === 'user' ? 'user' : 'admin';
}

export function getTemplateId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('template');
}

export function buildUserModeUrl(templateId: string): string {
  return `${window.location.origin}/?mode=user&template=${encodeURIComponent(templateId)}`;
}
