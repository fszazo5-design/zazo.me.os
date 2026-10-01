import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Film, Layers, Loader2, Video } from 'lucide-react'
import Hero from '../components/Hero'
import { loadAllContent } from '../lib/content'

export default function Home() {
  const [content, setContent] = useState({ projects: [], systemVideos: [], contentVideos: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllContent()
      .then(setContent)
      .catch(() => setContent({ projects: [], systemVideos: [], contentVideos: [] }))
      .finally(() => setLoading(false))
  }, [])

  const { projects, systemVideos, contentVideos } = content

  return (
    <div>
      <Hero />
      {loading ? <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div> : (
        <>
          <ContentSection title="مشاريع مختارة" subtitle="المحتوى المنشور من ملفات المستودع" items={projects.slice(0, 3)} empty="لا توجد مشاريع منشورة بعد." link="/showcase" type="project" />
          <ContentSection title="شرح الأنظمة" subtitle="فيديوهات الشرح المنشورة" items={systemVideos.slice(0, 3)} empty="لا توجد فيديوهات أنظمة منشورة بعد." link="/system-videos" type="video" muted />
          <ContentSection title="صناعة المحتوى" subtitle="المحتوى التقني المنشور" items={contentVideos.slice(0, 4)} empty="لا توجد فيديوهات محتوى منشورة بعد." link="/content-videos" type="content" />
        </>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 text-center sm:p-16">
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">هل لديك مشروع في ذهنك؟</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">لنتحوّل من الفكرة إلى التطبيق.</p>
            <Link to="/showcase" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all hover:shadow-xl">استكشف المشاريع <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function ContentSection({ title, subtitle, items, empty, link, type, muted }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${muted ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}>
      <div className="mb-8 flex items-end justify-between"><div><h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">{title}</h2><p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p></div><Link to={link} className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:underline sm:flex">عرض الكل <ArrowLeft className="h-4 w-4" /></Link></div>
      {items.length === 0 ? <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center"><Layers className="h-10 w-10 text-gray-300" /><p className="text-sm text-gray-500 dark:text-gray-400">{empty}</p></div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Link key={item.id} to={link} className="card group overflow-hidden"><div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">{(item.image || item.thumbnail) && <img src={item.image || item.thumbnail} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-white">{type === 'content' ? <Film className="h-4 w-4" /> : <Video className="h-4 w-4" />}{item.duration || 'عرض التفاصيل'}</div></div><div className="p-5"><h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{item.description || item.topic || 'محتوى منشور من ملفات JSON.'}</p></div></Link>)}</div>}
    </section>
  )
}
