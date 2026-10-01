import { useEffect, useState } from 'react'
import { Layers, Loader2, Monitor, Smartphone } from 'lucide-react'
import { loadContent } from '../lib/content'

export default function Showcase() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => { loadContent('projects').then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false)) }, [])
  const filtered = category === 'all' ? projects : projects.filter((item) => item.category === category)

  return <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-12 text-center"><h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">معرض المشاريع</h1><p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">المشاريع المعروضة هنا تأتي من `public/data/projects.json`.</p></div>
    <div className="mb-10 flex justify-center gap-3"><button onClick={() => setCategory('all')} className={`rounded-full px-5 py-2.5 text-sm font-medium ${category === 'all' ? 'bg-primary-600 text-white' : 'border border-gray-200 dark:border-gray-800'}`}><Layers className="mr-2 inline h-4 w-4" />الكل</button><button onClick={() => setCategory('android')} className={`rounded-full px-5 py-2.5 text-sm font-medium ${category === 'android' ? 'bg-primary-600 text-white' : 'border border-gray-200 dark:border-gray-800'}`}><Smartphone className="mr-2 inline h-4 w-4" />أندرويد</button><button onClick={() => setCategory('desktop')} className={`rounded-full px-5 py-2.5 text-sm font-medium ${category === 'desktop' ? 'bg-primary-600 text-white' : 'border border-gray-200 dark:border-gray-800'}`}><Monitor className="mr-2 inline h-4 w-4" />ديسكتاوب</button></div>
    {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div> : filtered.length === 0 ? <div className="card py-20 text-center"><Layers className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-gray-500 dark:text-gray-400">لا توجد مشاريع منشورة بعد.</p></div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((project) => <article key={project.id} className="card overflow-hidden"><div className="h-48 bg-gray-100 dark:bg-gray-800">{project.image && <img src={project.image} alt={project.title} className="h-full w-full object-cover" />}</div><div className="p-5"><h2 className="font-bold text-gray-900 dark:text-white">{project.title}</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p></div></article>)}</div>}
  </div>
}
