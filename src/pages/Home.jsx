import { Link } from 'react-router-dom'
import { ArrowLeft, Smartphone, Monitor, Video, Film, TestTube2 } from 'lucide-react'
import Hero from '../components/Hero'
import { projects, systemVideos, contentVideos } from '../data/mockData'

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const featuredSystemVideos = systemVideos.slice(0, 3)
  const featuredContent = contentVideos.slice(0, 4)

  return (
    <div>
      <Hero />

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">مشاريع مختارة</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">أبرز تطبيقات أندرويد وأنظمة الديسكتاوب</p>
          </div>
          <Link to="/showcase" className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400 sm:flex">
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Link
              key={project.id}
              to="/showcase"
              className="card group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-44 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className={`badge ${project.category === 'android' ? 'bg-success-500/90 text-white' : 'bg-primary-500/90 text-white'}`}>
                    {project.category === 'android' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                    {project.category === 'android' ? 'أندرويد' : 'ديسكتاوب'}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400">
                  <TestTube2 className="h-3.5 w-3.5" />
                  متاح للتجربة المباشرة
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/showcase" className="btn-secondary">
            عرض كل المشاريع
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* System Videos preview */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                <Video className="h-3.5 w-3.5" />
                شروحات
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">شرح الأنظمة</h2>
            </div>
            <Link to="/system-videos" className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400 sm:flex">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSystemVideos.map((video, i) => (
              <Link
                key={video.id}
                to="/system-videos"
                className="card group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl">
                      <Video className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white">{video.duration}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{video.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{video.views} مشاهدة</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Creation preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-950 dark:text-accent-300">
              <Film className="h-3.5 w-3.5" />
              Reels
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">صناعة المحتوى</h2>
          </div>
          <Link to="/content-videos" className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400 sm:flex">
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredContent.map((video, i) => (
            <Link
              key={video.id}
              to="/content-videos"
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gray-900 shadow-md transition-all hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-xl">
                  <Film className="h-5 w-5 text-accent-600" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <p className="line-clamp-2 text-xs font-medium text-white">{video.title}</p>
                <p className="mt-1 text-[10px] text-white/70">{video.views} مشاهدة</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 text-center sm:p-16">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">هل لديك مشروع في ذهنك؟</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">لنتحوّل من الفكرة إلى التطبيق. جرّب مشاريعي السابقة وتواصل معي لبدء مشروعك القادم.</p>
            <Link to="/showcase" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all hover:shadow-xl active:scale-95">
              استكشف المشاريع
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
