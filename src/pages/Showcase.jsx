import { useState } from 'react'
import { Smartphone, Monitor, Layers, Star, Download, Play, TestTube2, Code } from 'lucide-react'
import { projects, categories } from '../data/mockData'
import TestDriveModal from '../components/TestDriveModal'

const iconMap = { smartphone: Smartphone, monitor: Monitor, layers: Layers }

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [testProject, setTestProject] = useState(null)

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          معرض المشاريع
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          استكشف تطبيقات أندرويد وأنظمة الديسكتاوب التي قمت بتطويرها، وجرّبها مباشرة من متصفحك.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => {
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

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className="card group overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
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
              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur">
                <Star className="h-3 w-3 fill-warning-400 text-warning-400" />
                {project.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Code className="h-3 w-3" />
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  {project.downloads}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {project.rating} / 5
                </span>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setTestProject(project)}
                  className="btn-primary flex-1 text-xs"
                >
                  <TestTube2 className="h-4 w-4" />
                  اختبار التطبيق
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary-700 dark:hover:text-primary-400">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Test Drive Modal */}
      {testProject && (
        <TestDriveModal project={testProject} onClose={() => setTestProject(null)} />
      )}
    </div>
  )
}
