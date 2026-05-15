import { getUserId } from '../../core/UserSession.js';
const BASE_URL = import.meta.env?.VITE_API_URL
    ?? 'http://localhost:8080/api/v1';
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
export const DocumentApiClient = {
    async getDocuments() {
        return request('/documents');
    },
    async getDocument(docKey) {
        return request(`/documents/${docKey}`);
    },
    async createDocument(title, content) {
        return request('/documents', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
        });
    },
    async updateDocument(docKey, title, content) {
        return request(`/documents/${docKey}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
        });
    },
    async deleteDocument(docKey) {
        await request(`/documents/${docKey}`, { method: 'DELETE' });
    },
};
