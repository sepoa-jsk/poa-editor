export const MAX_LOGO_BYTES = 200 * 1024;
const STORAGE_KEY = 'poa-signatures';
const MAX_COUNT = 10;
function genId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function esc(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
export function buildSignatureHtml(sig) {
    const { layout, fields: f, logo, headerColor = '#2563eb' } = sig;
    const nameEl = f.displayName ? `<strong style="font-size:15px;color:#111;">${esc(f.displayName)}</strong>` : '';
    const titleDept = [f.title, f.department].filter(Boolean).map(esc).join(' | ');
    const compEl = f.company ? `<span style="color:#555;">${esc(f.company)}</span>` : '';
    const phoneEl = f.phone ? `<span style="color:#888;font-size:12px;">T.</span>&nbsp;${esc(f.phone)}` : '';
    const emailEl = f.email ? `<span style="color:#888;font-size:12px;">E.</span>&nbsp;${esc(f.email)}` : '';
    const webEl = f.website ? `<span style="color:#888;font-size:12px;">W.</span>&nbsp;${esc(f.website)}` : '';
    const bodyLines = [
        titleDept ? `<span style="color:#555;">${titleDept}</span>` : '',
        compEl, phoneEl, emailEl, webEl,
    ].filter(Boolean);
    const logoImg = logo
        ? `<img src="${esc(logo)}" alt="" style="max-width:80px;max-height:60px;display:block;">`
        : '';
    const BASE = 'font-size:14px;line-height:1.6;border-collapse:collapse;'
        + 'font-family:Arial,Helvetica,sans-serif;';
    const textBlock = () => [nameEl, ...bodyLines].filter(Boolean).join('<br>');
    switch (layout) {
        case 1:
            return `<table class="poa-signature" style="${BASE}"><tbody><tr>`
                + `<td style="padding:8px 0;vertical-align:top;">${textBlock()}</td>`
                + `</tr></tbody></table>`;
        case 2:
            if (!logo)
                return buildSignatureHtml({ ...sig, layout: 1 });
            return `<table class="poa-signature" style="${BASE}"><tbody><tr>`
                + `<td style="padding:0 14px 0 0;vertical-align:middle;border-right:2px solid #e5e7eb;">${logoImg}</td>`
                + `<td style="padding:0 0 0 14px;vertical-align:middle;">${textBlock()}</td>`
                + `</tr></tbody></table>`;
        case 3:
            if (!logo)
                return buildSignatureHtml({ ...sig, layout: 1 });
            return `<table class="poa-signature" style="${BASE}"><tbody>`
                + `<tr><td style="text-align:center;padding-bottom:6px;">${logoImg}</td></tr>`
                + `<tr><td style="padding:4px 0;">${textBlock()}</td></tr>`
                + `</tbody></table>`;
        case 4:
            return `<table class="poa-signature" style="${BASE}"><tbody><tr>`
                + `<td style="padding:8px 0;vertical-align:top;">`
                + `${nameEl ? nameEl + '<br>' : ''}`
                + `<hr style="border:none;border-top:1px solid #aaa;margin:4px 0;">`
                + `${bodyLines.join('<br>')}`
                + `</td></tr></tbody></table>`;
        case 5: {
            const leftBlock = [nameEl, f.department ? `<span style="color:#555;">${esc(f.department)}</span>` : ''].filter(Boolean).join('<br>');
            const rightBlock = [f.title ? `<span style="color:#555;">${esc(f.title)}</span>` : '', compEl].filter(Boolean).join('<br>');
            const bottom = [phoneEl, emailEl].filter(Boolean).join('&nbsp;|&nbsp;');
            return `<table class="poa-signature" style="${BASE}"><tbody>`
                + `<tr>`
                + `<td style="padding:4px 14px 4px 0;border-right:1px solid #ddd;vertical-align:top;">${leftBlock || '&nbsp;'}</td>`
                + `<td style="padding:4px 0 4px 14px;vertical-align:top;">${rightBlock || '&nbsp;'}</td>`
                + `</tr>`
                + (bottom ? `<tr><td colspan="2" style="padding:6px 0 4px;border-top:1px solid #eee;font-size:13px;">${bottom}</td></tr>` : '')
                + `</tbody></table>`;
        }
        case 6: {
            const hdrParts = [
                f.displayName ? `<strong style="color:#fff;">${esc(f.displayName)}</strong>` : '',
                f.title ? `<span style="color:rgba(255,255,255,.85);">${esc(f.title)}</span>` : '',
            ].filter(Boolean).join('&nbsp;&nbsp;');
            const body6 = [
                f.department ? `<span style="color:#555;">${esc(f.department)}</span>` : '',
                compEl, phoneEl, emailEl, webEl,
            ].filter(Boolean);
            return `<table class="poa-signature" style="${BASE}border:1px solid ${esc(headerColor)};"><tbody>`
                + `<tr><td style="background:${esc(headerColor)};padding:8px 16px;">${hdrParts || '&nbsp;'}</td></tr>`
                + `<tr><td style="padding:8px 16px;">${body6.join('<br>') || '&nbsp;'}</td></tr>`
                + `</tbody></table>`;
        }
        default:
            return '';
    }
}
export class SignatureManager {
    sigs = [];
    constructor() { this._load(); }
    _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this.sigs = raw ? JSON.parse(raw) : [];
        }
        catch {
            this.sigs = [];
        }
    }
    _persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.sigs));
        }
        catch { /* full */ }
    }
    getAll() { return [...this.sigs]; }
    getById(id) {
        return this.sigs.find(s => s.id === id) ?? null;
    }
    add(data) {
        if (this.sigs.length >= MAX_COUNT)
            throw new Error(`최대 ${MAX_COUNT}개까지 저장할 수 있습니다.`);
        const sig = { ...data, id: genId(), createdAt: Date.now(), updatedAt: Date.now() };
        this.sigs.push(sig);
        this._persist();
        return sig;
    }
    update(id, data) {
        const sig = this.sigs.find(s => s.id === id);
        if (!sig)
            return false;
        Object.assign(sig, data, { updatedAt: Date.now() });
        this._persist();
        return true;
    }
    delete(id) {
        const idx = this.sigs.findIndex(s => s.id === id);
        if (idx < 0)
            return false;
        this.sigs.splice(idx, 1);
        this._persist();
        return true;
    }
    isFull() { return this.sigs.length >= MAX_COUNT; }
}
