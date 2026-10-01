import { useEffect, useState } from 'react'
import { Search, Video, Loader2 } from 'lucide-react'
import { loadContent } from '../lib/content'

export default function SystemVideos() {
  const [videos, setVideos] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => { loadContent('systemVideos').then(setVideos).catch(() => setVideos([])).finally(() => setLoading(false)) }, [])
  const filtered = videos.filter((item) => `${item.title} ${item.description}`.includes(search))
  return <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-12 text-center"><Video className="mx-auto mb-4 h-10 w-10 text-primary-500" /><h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">فيديوهات شرح الأنظمة</h1><p className="mt-4 text-gray-600 dark:text-gray-400">المحتوى المنشور من Neon.</p></div><div className="mx-auto mb-8 max-w-md"><div className="relative"><Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن فيديو..." className="input-field pr-11" /></div></div>{loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div> : filtered.length === 0 ? <div className="card py-20 text-center text-gray-500 dark:text-gray-400">لا توجد فيديوهات منشورة بعد.</div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((video) => <article key={video.id} className="card overflow-hidden"><img src={video.thumbnail} alt={video.title} className="h-52 w-full object-cover" /><div className="p-5"><h2 className="font-bold text-gray-900 dark:text-white">{video.title}</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{video.description}</p></div></article>)}</div>}</div>
}
