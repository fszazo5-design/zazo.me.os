/* global process */
import { neon } from '@neondatabase/serverless'

function database() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured')
  return neon(process.env.DATABASE_URL)
}

function normalize(row) {
  const item = {
    id: row.id,
    title: row.title,
    description: row.description || '',
    category: row.category || '',
    image: row.image_url || '',
    thumbnail: row.image_url || '',
    contentUrl: row.content_url || '',
    videoUrl: row.content_url || '',
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    topic: row.topic || '',
    views: row.views || '',
    duration: row.duration || '',
    date: row.created_at,
  }
  return item
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300')
  try {
    const sql = database()
    if (request.method === 'GET') {
      const kind = String(request.query?.kind || '').trim()
      const rows = kind
        ? await sql`SELECT * FROM portfolio_content WHERE kind = ${kind} ORDER BY created_at DESC`
        : await sql`SELECT * FROM portfolio_content ORDER BY created_at DESC`
      return response.status(200).json(rows.map(normalize))
    }

    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
    if (!process.env.ADMIN_SECRET || request.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
      return response.status(401).json({ error: 'رمز لوحة التحكم غير صحيح' })
    }

    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body
    const allowedKinds = ['project', 'system-video', 'content-video']
    if (!body?.kind || !allowedKinds.includes(body.kind) || !body.title?.trim()) {
      return response.status(400).json({ error: 'kind و title مطلوبان' })
    }
    const technologies = Array.isArray(body.technologies) ? body.technologies : []
    const [row] = await sql`
      INSERT INTO portfolio_content
        (kind, title, description, category, image_url, content_url, technologies, topic, views, duration)
      VALUES
        (${body.kind}, ${body.title.trim()}, ${body.description?.trim() || ''}, ${body.category?.trim() || ''},
         ${body.imageUrl?.trim() || ''}, ${body.contentUrl?.trim() || ''}, ${JSON.stringify(technologies)}::jsonb,
         ${body.topic?.trim() || ''}, ${body.views?.trim() || ''}, ${body.duration?.trim() || ''})
      RETURNING *
    `
    return response.status(201).json(normalize(row))
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'تعذر الاتصال بقاعدة Neon أو حفظ المحتوى' })
  }
}
