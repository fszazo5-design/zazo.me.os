const configuredBase = (import.meta.env.VITE_CONTENT_API_URL || '').replace(/\/+$/, '')
const API_ROOT = configuredBase ? `${configuredBase}/api` : '/api'

export const CONTENT_API_URL = `${API_ROOT}/content`
export const LOGIN_API_URL = `${API_ROOT}/login`
export const MEDIA_API_URL = `${API_ROOT}/media`
export const MEDIA_SIGN_API_URL = `${MEDIA_API_URL}/sign`

export async function loadContent(type) {
  const kind = type === 'projects' ? 'project' : type === 'systemVideos' ? 'system-video' : type === 'contentVideos' ? 'content-video' : type
  const response = await fetch(`${CONTENT_API_URL}?kind=${encodeURIComponent(kind)}`)
  if (!response.ok) throw new Error('تعذر تحميل المحتوى')
  const result = await response.json()
  return Array.isArray(result) ? result : Array.isArray(result.items) ? result.items : []
}

export async function loadAllContent() {
  const types = ['projects', 'systemVideos', 'contentVideos']
  const entries = await Promise.all(types.map(async (type) => [type, await loadContent(type)]))
  return Object.fromEntries(entries)
}
