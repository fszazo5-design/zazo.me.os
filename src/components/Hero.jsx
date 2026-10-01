import { Link } from 'react-router-dom'
import { ArrowLeft, Play, Sparkles, Smartphone, Monitor, Video, MessageCircle, Phone } from 'lucide-react'
import { stats } from '../data/mockData'

const MESSENGER_URL = 'https://m.me/ahmd.alrwby.117154'
const WHATSAPP_URL = 'https://wa.me/201091288031'

const iconMap = { briefcase: Sparkles, users: Sparkles, smartphone: Smartphone, award: Sparkles }

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 via-white to-white dark:from-primary-950/40 dark:via-gray-950 dark:to-gray-950" />
      <div className="absolute -top-40 right-1/2 -z-10 h-96 w-96 translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute top-20 left-0 -z-10 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 animate-fade-in dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
            <Sparkles className="h-4 w-4" />
            مطور تطبيقات وأنظمة وصانع محتوى تقني
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white animate-fade-in-up">
            أبني تطبيقات وأنظمة
            <span className="block bg-gradient-to-l from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              تجعل الأفكار تعمل
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            مطور برمجيات متخصص في تطبيقات أندرويد وأنظمة الديسكتاوب، مع شغف لصناعة محتوى تقني يبسّط المفاهيم المعقدة.
            استكشف مشاريعي وجرّبها مباشرة من المتصفح.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/showcase" className="btn-primary w-full sm:w-auto">
              استكشف المشاريع
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/system-videos" className="btn-secondary w-full sm:w-auto">
              <Play className="h-4 w-4" />
              شاهد العروض
            </Link>
          </div>

          {/* Contact buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 animate-fade-in-up sm:flex-row" style={{ animationDelay: '0.25s' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-success-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-success-600/25 transition-all hover:bg-success-700 hover:shadow-xl w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              تواصل عبر واتساب
            </a>
            <a
              href={MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              مراسلة عبر ماسنجر
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Smartphone, label: 'تطبيقات أندرويد', to: '/showcase' },
              { icon: Monitor, label: 'برامج ديسكتاوب', to: '/showcase' },
              { icon: Video, label: 'صناعة محتوى', to: '/content-videos' },
            ].map(({ icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary-700"
              >
                <Icon className="h-4 w-4 text-primary-500" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Sparkles
            return (
              <div
                key={stat.label}
                className="card p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
