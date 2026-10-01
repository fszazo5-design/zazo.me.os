/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Globe2, Layers, Loader2, Maximize2, Monitor, Play, RefreshCw, Smartphone, X } from 'lucide-react'
import { loadContent } from '../lib/content'

export default function Showcase() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [preview, setPreview] = useState(null)
  const [frameKey, setFrameKey] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => { loadContent('projects').then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false)) }, [])
  const filtered = category === 'all' ? projects : projects.filter((item) => item.category === category)
  const isAndroid = preview?.category === 'android'
  const isWebBuild = preview?.category === 'web-build'
  const isAppetize = preview?.category === 'appetize' || preview?.contentUrl?.startsWith('https://appetize.io/embed/')

  const openPreview = (project) => {
    setFrameKey((key) => key + 1)
    setPreview(project)
  }
  const reloadPreview = () => setFrameKey((key) => key + 1)
  const maximizePreview = () => frameRef.current?.requestFullscreen?.()

  return <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-12 text-center"><h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">معرض المشاريع</h1><p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">شغّل روابط المحاكاة داخل تجربة PWA مشابهة للتطبيق الحقيقي.</p></div>
    <div className="mb-10 flex flex-wrap justify-center gap-3"><FilterButton active={category === 'all'} onClick={() => setCategory('all')}><Layers className="mr-2 inline h-4 w-4" />الكل</FilterButton><FilterButton active={category === 'android'} onClick={() => setCategory('android')}><Smartphone className="mr-2 inline h-4 w-4" />أندرويد</FilterButton><FilterButton active={category === 'desktop'} onClick={() => setCategory('desktop')}><Monitor className="mr-2 inline h-4 w-4" />ديسكتوب</FilterButton><FilterButton active={category === 'web-build'} onClick={() => setCategory('web-build')}><Globe2 className="mr-2 inline h-4 w-4" />Web Build</FilterButton><FilterButton active={category === 'appetize'} onClick={() => setCategory('appetize')}><Smartphone className="mr-2 inline h-4 w-4" />Appetize</FilterButton></div>
    {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div> : filtered.length === 0 ? <div className="card py-20 text-center"><Layers className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-gray-500 dark:text-gray-400">لا توجد مشاريع منشورة بعد.</p></div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <article key={project.id} className="card overflow-hidden"><div className="h-48 bg-gray-100 dark:bg-gray-800">{project.image && <img src={project.image} alt={project.title} className="h-full w-full object-cover" />}</div><div className="p-5"><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">{project.category === 'android' ? <Smartphone className="h-4 w-4" /> : project.category === 'web-build' ? <Globe2 className="h-4 w-4" /> : project.category === 'appetize' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}{project.category === 'android' ? 'محاكاة أندرويد' : project.category === 'web-build' ? 'Web Build' : project.category === 'appetize' ? 'Appetize Android Emulator' : 'محاكاة ديسكتوب'}</div><h2 className="font-bold text-gray-900 dark:text-white">{project.title}</h2><p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>{project.contentUrl ? <div className="mt-5 flex gap-2"><button onClick={() => openPreview(project)} className="btn-simulator flex-1"><Play className="h-4 w-4 fill-white" />{project.category === 'appetize' ? 'تشغيل محاكي Android' : 'تشغيل Web Build'}</button><a href={project.contentUrl} target="_blank" rel="noopener noreferrer" className="btn-external" aria-label="فتح رابط المحاكاة"><ExternalLink className="h-4 w-4" /></a></div> : <p className="mt-5 text-xs text-gray-400">لم تتم إضافة رابط المحاكاة لهذا المشروع.</p>}</div></article>)}</div>}
    {preview && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4" onClick={() => setPreview(null)}><div className="absolute inset-0 bg-gray-950/85 backdrop-blur-sm" /><div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gray-950 shadow-2xl" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-l from-primary-950 to-gray-950 px-4 py-3 text-white"><div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500"><span className="text-sm font-black">Z</span></div><div className="min-w-0"><h2 className="truncate text-sm font-bold">{preview.title}</h2><p className="flex items-center gap-1 text-[11px] text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{isAppetize ? 'Appetize Android Emulator' : `PWA Desktop · ${isWebBuild ? 'Web Build' : `محاكاة ${isAndroid ? 'Android' : 'Desktop'}`}`}</p></div></div><button onClick={() => setPreview(null)} className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="إغلاق"><X className="h-5 w-5" /></button></div>
      <div className="bg-gray-200 p-2 dark:bg-gray-800 sm:p-5"><div ref={frameRef} className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 bg-white shadow-inner dark:border-gray-700"><div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-l from-primary-500 via-secondary-500 to-primary-500" /><iframe key={frameKey} src={preview.contentUrl} title={`معاينة PWA Desktop ${preview.title}`} className="h-full w-full border-0" allow="fullscreen; autoplay; clipboard-read; clipboard-write" allowFullScreen /></div></div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-gray-950 px-4 py-3 text-white"><div className="flex items-center gap-1"><button onClick={reloadPreview} className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="إعادة تحميل"><RefreshCw className="h-4 w-4" /></button><button onClick={maximizePreview} className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="ملء الشاشة"><Maximize2 className="h-4 w-4" /></button></div><a href={preview.contentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20"><ExternalLink className="h-3.5 w-3.5" />فتح التطبيق</a></div>
      <p className="bg-gray-950 px-4 pb-4 text-center text-[11px] text-white/45">يتم عرض رابط Appetize Embed كما هو داخل متصفح المحاكاة. إذا منع Appetize التضمين، استخدم «فتح التطبيق».</p>
    </div></div>}
  </div>
}

function FilterButton({ active, onClick, children }) {
  return <button onClick={onClick} className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${active ? 'bg-gradient-to-l from-primary-600 to-secondary-600 text-white shadow-md shadow-primary-600/20' : 'border border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-700'}`}>{children}</button>
}
