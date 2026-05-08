import type { TemplateNode } from './TemplateManager.js';
import { getUserId } from '../../core/UserSession.js';

const BASE_URL = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL
  ?? 'http://localhost:8080/api/v1';

// ── 서버 DTO 타입 ────────────────────────────────────────────────────────────

interface ApiResp<T> {
  success: boolean;
  data: T | null;
  message: string | null;
}

interface ServerFolder {
  id: number;
  parentId: number | null;
  name: string;
  isPublic: boolean;
  orderIndex: number;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ServerTemplate {
  id: number;
  folderId: number | null;
  name: string;
  content: string | null;
  isPublic: boolean;
  isTemp: boolean;
  orderIndex: number;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FolderCreateDto {
  parentId: number | null;
  name: string;
  isPublic: boolean;
  orderIndex: number;
}

export interface FolderUpdateDto {
  parentId: number | null;
  name: string;
  isPublic: boolean;
  orderIndex: number;
}

export interface TemplateCreateDto {
  folderId: number | null;
  name: string;
  content: string;
  isPublic: boolean;
  isTemp: boolean;
  orderIndex: number;
}

export interface TemplateUpdateDto {
  folderId: number | null;
  name: string;
  content?: string;
  isPublic: boolean;
  orderIndex: number;
}

// ── ID 변환: 서버 BIGINT ↔ 프론트엔드 string ─────────────────────────────────

/** 서버 ID → 프론트엔드 string ID */
export function toClientId(serverId: number): string {
  return `s-${serverId}`;
}

/** 프론트엔드 string ID → 서버 BIGINT (null이면 서버 미동기화 항목) */
export function toServerId(clientId: string): number | null {
  if (!clientId.startsWith('s-')) return null;
  const n = Number(clientId.slice(2));
  return Number.isFinite(n) ? n : null;
}

// ── DTO → TemplateNode 변환 ──────────────────────────────────────────────────

function folderToNode(f: ServerFolder): TemplateNode {
  return {
    id:        toClientId(f.id),
    type:      'folder',
    name:      f.name,
    parentId:  f.parentId !== null ? toClientId(f.parentId) : null,
    isPublic:  f.isPublic,
    createdBy: f.createdBy ?? null,
    createdAt: new Date(f.createdAt).getTime(),
    updatedAt: new Date(f.updatedAt).getTime(),
    order:     f.orderIndex,
  };
}

function templateToNode(t: ServerTemplate): TemplateNode {
  return {
    id:        toClientId(t.id),
    type:      'template',
    name:      t.name,
    parentId:  t.folderId !== null ? toClientId(t.folderId) : null,
    content:   t.content ?? '',
    isPublic:  t.isPublic,
    ...(t.isTemp ? { isTemp: true as const } : {}),
    createdBy: t.createdBy ?? null,
    createdAt: new Date(t.createdAt).getTime(),
    updatedAt: new Date(t.updatedAt).getTime(),
    order:     t.orderIndex,
  };
}

// ── fetch 헬퍼 ───────────────────────────────────────────────────────────────

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Poa-User-Id': getUserId(),
      ...((init?.headers as Record<string, string>) ?? {}),
    },
  });
  if (res.status === 204) return undefined as unknown as T;
  const body = await res.json() as ApiResp<T>;
  if (!body.success) throw new Error(body.message ?? 'API 오류');
  return body.data as T;
}

// ── API 클라이언트 ────────────────────────────────────────────────────────────

export const TemplateApiClient = {

  // 폴더 ──────────────────────────────────────────────────────────────────────

  async getFolders(): Promise<TemplateNode[]> {
    const data = await request<ServerFolder[]>('/folders');
    return data.map(folderToNode);
  },

  async createFolder(dto: FolderCreateDto): Promise<TemplateNode> {
    const data = await request<ServerFolder>('/folders', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return folderToNode(data);
  },

  async updateFolder(id: number, dto: FolderUpdateDto): Promise<TemplateNode> {
    const data = await request<ServerFolder>(`/folders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return folderToNode(data);
  },

  async deleteFolder(id: number): Promise<void> {
    await request<void>(`/folders/${id}`, { method: 'DELETE' });
  },

  // 템플릿 ────────────────────────────────────────────────────────────────────

  async getTemplates(folderId?: number): Promise<TemplateNode[]> {
    const qs = folderId !== undefined ? `?folderId=${folderId}` : '';
    const data = await request<ServerTemplate[]>(`/templates${qs}`);
    return data.map(templateToNode);
  },

  async getTemplate(id: number): Promise<TemplateNode> {
    const data = await request<ServerTemplate>(`/templates/${id}`);
    return templateToNode(data);
  },

  async createTemplate(dto: TemplateCreateDto): Promise<TemplateNode> {
    const data = await request<ServerTemplate>('/templates', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return templateToNode(data);
  },

  async updateTemplate(id: number, dto: TemplateUpdateDto): Promise<TemplateNode> {
    const data = await request<ServerTemplate>(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return templateToNode(data);
  },

  async deleteTemplate(id: number): Promise<void> {
    await request<void>(`/templates/${id}`, { method: 'DELETE' });
  },

  async deleteTempTemplates(): Promise<void> {
    await request<void>('/templates/temp', { method: 'DELETE' });
  },

  /** 폴더 + 템플릿 전체를 TemplateNode 배열로 반환 */
  async getAllNodes(): Promise<TemplateNode[]> {
    const [folders, templates] = await Promise.all([
      this.getFolders(),
      this.getTemplates(),
    ]);
    return [...folders, ...templates];
  },
};
