const CONTENT_ENDPOINTS = { projects: 'project', systemVideos: 'system-video', contentVideos: 'content-video' }
export async function loadContent(type) {
  const kind = CONTENT_ENDPOINTS[type] || type
  const response = await fetch(`/api/content?kind=${encodeURIComponent(kind)}`)
  if (!response.ok) throw new Error('تعذر تحميل المحتوى من Neon')
  return response.json()
}
export async function loadAllContent() {
  const entries = await Promise.all(Object.keys(CONTENT_ENDPOINTS).map(async (type) => [type, await loadContent(type)]))
  return Object.fromEntries(entries)
}
