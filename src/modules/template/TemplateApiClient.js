import { getUserId } from '../../core/UserSession.js';
const BASE_URL = import.meta.env?.VITE_API_URL
    ?? 'http://localhost:8080/api/v1';
// ── ID 변환: 서버 BIGINT ↔ 프론트엔드 string ─────────────────────────────────
/** 서버 ID → 프론트엔드 string ID */
export function toClientId(serverId) {
    return `s-${serverId}`;
}
/** 프론트엔드 string ID → 서버 BIGINT (null이면 서버 미동기화 항목) */
export function toServerId(clientId) {
    if (!clientId.startsWith('s-'))
        return null;
    const n = Number(clientId.slice(2));
    return Number.isFinite(n) ? n : null;
}
// ── DTO → TemplateNode 변환 ──────────────────────────────────────────────────
function folderToNode(f) {
    return {
        id: toClientId(f.id),
        type: 'folder',
        name: f.name,
        parentId: f.parentId !== null ? toClientId(f.parentId) : null,
        isPublic: f.isPublic,
        createdBy: f.createdBy ?? null,
        createdAt: new Date(f.createdAt).getTime(),
        updatedAt: new Date(f.updatedAt).getTime(),
        order: f.orderIndex,
    };
}
function templateToNode(t) {
    return {
        id: toClientId(t.id),
        type: 'template',
        name: t.name,
        parentId: t.folderId !== null ? toClientId(t.folderId) : null,
        content: t.content ?? '',
        isPublic: t.isPublic,
        ...(t.isTemp ? { isTemp: true } : {}),
        createdBy: t.createdBy ?? null,
        createdAt: new Date(t.createdAt).getTime(),
        updatedAt: new Date(t.updatedAt).getTime(),
        order: t.orderIndex,
    };
}
// ── fetch 헬퍼 ───────────────────────────────────────────────────────────────
async function request(path, init) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            'Poa-User-Id': getUserId(),
            ...(init?.headers ?? {}),
        },
    });
    if (res.status === 204)
        return undefined;
    const body = await res.json();
    if (!body.success)
        throw new Error(body.message ?? 'API 오류');
    return body.data;
}
// ── API 클라이언트 ────────────────────────────────────────────────────────────
export const TemplateApiClient = {
    // 폴더 ──────────────────────────────────────────────────────────────────────
    async getFolders() {
        const data = await request('/folders');
        return data.map(folderToNode);
    },
    async createFolder(dto) {
        const data = await request('/folders', {
            method: 'POST',
            body: JSON.stringify(dto),
        });
        return folderToNode(data);
    },
    async updateFolder(id, dto) {
        const data = await request(`/folders/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dto),
        });
        return folderToNode(data);
    },
    async deleteFolder(id) {
        await request(`/folders/${id}`, { method: 'DELETE' });
    },
    // 템플릿 ────────────────────────────────────────────────────────────────────
    async getTemplates(folderId) {
        const qs = folderId !== undefined ? `?folderId=${folderId}` : '';
        const data = await request(`/templates${qs}`);
        return data.map(templateToNode);
    },
    async getTemplate(id) {
        const data = await request(`/templates/${id}`);
        return templateToNode(data);
    },
    async createTemplate(dto) {
        const data = await request('/templates', {
            method: 'POST',
            body: JSON.stringify(dto),
        });
        return templateToNode(data);
    },
    async updateTemplate(id, dto) {
        const data = await request(`/templates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dto),
        });
        return templateToNode(data);
    },
    async deleteTemplate(id) {
        await request(`/templates/${id}`, { method: 'DELETE' });
    },
    async deleteTempTemplates() {
        await request('/templates/temp', { method: 'DELETE' });
    },
    /** 관리자 전용: 임시/테스트 데이터 일괄 삭제 (1회 재시도) */
    async adminCleanup() {
        const doCleanup = () => request('/admin/cleanup', { method: 'DELETE' });
        try {
            await doCleanup();
        }
        catch (e) {
            console.error('서버 정리 오류 (1차 시도):', e);
            await new Promise(r => setTimeout(r, 500));
            await doCleanup();
        }
    },
    /** 폴더 + 템플릿 전체를 TemplateNode 배열로 반환 */
    async getAllNodes() {
        const [folders, templates] = await Promise.all([
            this.getFolders(),
            this.getTemplates(),
        ]);
        return [...folders, ...templates];
    },
};
