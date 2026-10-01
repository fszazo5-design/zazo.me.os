import React, { useState, useEffect, useCallback } from 'react'
import { Smartphone, Monitor, Layers, Star, Play, TestTube2, Code, Eye, X, ShieldCheck, Loader2, Film, Video } from 'lucide-react'
import { projects as mockProjects, categories } from '../data/mockData'
import { supabase } from '../lib/supabase'
import TestDriveModal from '../components/TestDriveModal'

const iconMap = { smartphone: Smartphone, monitor: Monitor, layers: Layers, film: Film, video: Video }

const videoCategories = ['content-creation', 'system-video']

function extractYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
  return match ? match[1] : null
}

/** Normalize a Supabase row into the shape the UI expects (matches mock data keys) */
function normalizeRow(row) {
  const techs = row.technologies
    ? row.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    category: row.category,
    technologies: techs,
    emulatorUrl: row.emulator_url || '',
    sandboxUrl: row.sandbox_url || '',
    videoUrl: row.video_url || '',
    imageUrl: row.image_url || '',
    image: row.image_url || '',
    rating: null,
    downloads: null,
    gradient: 'from-primary-600 to-primary-800',
  }
}

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [testProject, setTestProject] = useState(null)
  const [watchProject, setWatchProject] = useState(null)
  const [dbProjects, setDbProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) {
      setDbProjects(data.map(normalizeRow))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Merge: DB projects first, then mock projects as showcase examples
  const allProjects = [...dbProjects, ...mockProjects]

  const filtered = activeCategory === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory)

  const categoryList = [
    ...categories,
    { id: 'content-creation', label: 'صناعة محتوى', icon: 'film' },
    { id: 'system-video', label: 'فيديوهات أنظمة', icon: 'video' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          معرض المشاريع
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          استكشف تطبيقات أندرويد وأنظمة الديسكتاوب والفيديوهات التي قمت بتطويرها، وجرّبها مباشرة من متصفحك.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {categoryList.map((cat) => {
          const Icon = iconMap[cat.icon] || Layers
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'border border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      )}

      {/* Projects grid */}
      {!loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const isVideo = videoCategories.includes(project.category)
            const catIcon = isVideo ? (project.category === 'content-creation' ? Film : Video) : (project.category === 'android' ? Smartphone : Monitor)
            const catLabel = isVideo
              ? (project.category === 'content-creation' ? 'صناعة محتوى' : 'فيديو نظام')
              : (project.category === 'android' ? 'أندرويد' : 'ديسكتاوب')

            return (
              <div
                key={`${project.id}-${i}`}
                className="card group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <catIcon className="h-12 w-12 text-white/30" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${isVideo ? 'bg-accent-500/90 text-white' : project.category === 'android' ? 'bg-success-500/90 text-white' : 'bg-primary-500/90 text-white'}`}>
                      {React.createElement(catIcon, { className: 'h-3 w-3' })}
                      {catLabel}
                    </span>
                  </div>
                  {project.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur">
                      <Star className="h-3 w-3 fill-warning-400 text-warning-400" />
                      {project.rating}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          <Code className="h-3 w-3" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    {!isVideo && (
                      <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        تجربة أونلاين
                      </span>
                    )}
                    {isVideo && (
                      <span className="inline-flex items-center gap-1 text-accent-600 dark:text-accent-400">
                        <Eye className="h-3.5 w-3.5" />
                        مشاهدة فقط
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    {!isVideo ? (
                      <>
                        <button
                          onClick={() => setTestProject(project)}
                          className="btn-primary flex-1 text-xs"
                        >
                          <TestTube2 className="h-4 w-4" />
                          {project.category === 'android' ? 'اختبار التطبيق' : 'تجربة النظام'}
                        </button>
                        {project.videoUrl && (
                          <button
                            onClick={() => setWatchProject(project)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:text-primary-400"
                            aria-label="Watch video"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => setWatchProject(project)}
                        className="btn-primary flex-1 text-xs"
                      >
                        <Play className="h-4 w-4" />
                        مشاهدة الفيديو
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center">
          <Layers className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">لا توجد مشاريع في هذا التصنيف بعد.</p>
        </div>
      )}

      {/* Test Drive Modal */}
      {testProject && (
        <TestDriveModal project={testProject} onClose={() => setTestProject(null)} />
      )}

      {/* Video Watch Modal */}
      {watchProject && (
        <VideoWatchModal project={watchProject} onClose={() => setWatchProject(null)} />
      )}
    </div>
  )
}

function VideoWatchModal({ project, onClose }) {
  const youtubeId = extractYouTubeId(project.videoUrl)
  const hasVideo = youtubeId || project.videoUrl

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-scale-in dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              <Play className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">مشاهدة فيديو</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video player */}
        <div className="bg-black">
          {hasVideo ? (
            youtubeId ? (
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title={project.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="aspect-video w-full"
              />
            )
          ) : (
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-center">
              <Play className="h-10 w-10 text-gray-600" />
              <p className="text-sm text-gray-400">لم يتم إضافة فيديو لهذا المشروع بعد</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">{project.description}</p>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
            <Eye className="h-3.5 w-3.5" />
            مشاهدة فقط
          </span>
        </div>
      </div>
    </div>
  )
}
