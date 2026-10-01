import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Monitor, Phone, Smartphone, Sparkles, Video } from 'lucide-react'

const MESSENGER_URL = 'https://m.me/ahmd.alrwby.117154'
const WHATSAPP_URL = 'https://wa.me/201091288031'

export default function Hero() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    fetch('/api/content?kind=stat').then((response) => response.ok ? response.json() : []).then(setStats).catch(() => setStats([]))
  }, [])

  return <section className="overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pb-16 dark:from-primary-950/30 dark:via-gray-950 dark:to-gray-950">
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <img src="/zazo.jpg" alt="Zazo brand" className="mx-auto block max-h-[420px] w-full object-contain object-center sm:max-h-[500px]" />
      </div>
    </div>
    <div className="mx-auto max-w-5xl px-4 pt-10 text-center sm:px-6 lg:px-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300"><Sparkles className="h-4 w-4" />Zazo Brand</div>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl dark:text-white">أبني تطبيقات وأنظمة<span className="block bg-gradient-to-l from-primary-600 to-secondary-600 bg-clip-text text-transparent">تجعل الأفكار تعمل</span></h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">مطور برمجيات متخصص في تطبيقات أندرويد وأنظمة الديسكتاوب وصناعة المحتوى التقني.</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3"><Link to="/showcase" className="btn-primary">استكشف المشاريع<ArrowLeft className="h-4 w-4" /></Link><Link to="/system-videos" className="btn-secondary"><Video className="h-4 w-4" />شاهد العروض</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-success-600 px-4 py-2.5 text-sm font-semibold text-white"><Phone className="h-4 w-4" />واتساب</a><a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" />ماسنجر</a></div>
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"><div className="flex flex-col items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-200"><Smartphone className="h-5 w-5 text-primary-500" />أندرويد</div><div className="flex flex-col items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-200"><Monitor className="h-5 w-5 text-primary-500" />ديسكتاوب</div><div className="flex flex-col items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-200"><Video className="h-5 w-5 text-primary-500" />محتوى تقني</div></div>
    </div>
    {stats.length > 0 && <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">{stats.map((stat) => <div key={stat.id} className="card p-5 text-center"><div className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div><div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.title}</div></div>)}</div>}
  </section>
}
