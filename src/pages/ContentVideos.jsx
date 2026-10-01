import { useEffect, useState } from 'react'
import { Film, Loader2 } from 'lucide-react'
import { loadContent } from '../lib/content'

export default function ContentVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { loadContent('contentVideos').then(setVideos).catch(() => setVideos([])).finally(() => setLoading(false)) }, [])
  return <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-12 text-center"><Film className="mx-auto mb-4 h-10 w-10 text-accent-500" /><h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">فيديوهات صناعة المحتوى</h1><p className="mt-4 text-gray-600 dark:text-gray-400">المحتوى المنشور من `public/data/content-videos.json`.</p></div>{loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div> : videos.length === 0 ? <div className="card py-20 text-center text-gray-500 dark:text-gray-400">لا توجد فيديوهات منشورة بعد.</div> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{videos.map((video) => <article key={video.id} className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gray-900"><img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3"><p className="text-xs font-medium text-white">{video.title}</p><p className="mt-1 text-[10px] text-white/70">{video.views || ''}</p></div></article>)}</div>}</div>
}
