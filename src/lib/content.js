const CONTENT_FILES = {
  projects: '/data/projects.json',
  systemVideos: '/data/system-videos.json',
  contentVideos: '/data/content-videos.json',
  stats: '/data/stats.json',
  categories: '/data/categories.json',
}

export async function loadContent(type) {
  const response = await fetch(CONTENT_FILES[type])
  if (!response.ok) throw new Error(`تعذر تحميل ${type}`)
  return response.json()
}

export async function loadAllContent() {
  const entries = await Promise.all(
    Object.keys(CONTENT_FILES).map(async (type) => [type, await loadContent(type)])
  )
  return Object.fromEntries(entries)
}
