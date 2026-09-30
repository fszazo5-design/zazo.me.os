import { useEffect, useState } from 'react'
import { X, Smartphone, Monitor, Play, RotateCcw, Maximize2, Loader2 } from 'lucide-react'

export default function TestDriveModal({ project, onClose }) {
  const [loading, setLoading] = useState(true)
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setBooted(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!project) return null

  const isAndroid = project.category === 'android'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-scale-in dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isAndroid ? 'bg-success-50 text-success-600 dark:bg-success-950 dark:text-success-400' : 'bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400'}`}>
              {isAndroid ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAndroid ? 'محاكي أندرويد — Appetize.io' : 'بيئة ديسكتاوب افتراضية — noVNC'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Rotate">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Emulator area */}
        <div className="relative bg-gray-950 p-6" style={{ minHeight: '480px' }}>
          {loading ? (
            <div className="flex h-[480px] flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary-400" />
              <p className="text-sm text-gray-400">جاري تشغيل {isAndroid ? 'المحاكي' : 'البيئة الافتراضية'}...</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400" />
                تهيئة البيئة
              </div>
            </div>
          ) : isAndroid ? (
            /* Android phone frame */
            <div className="mx-auto flex max-w-[300px] flex-col items-center">
              <div className="relative rounded-[2.5rem] border-4 border-gray-700 bg-black p-2 shadow-2xl">
                <div className="relative h-[500px] w-[260px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-primary-600 to-primary-800">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-6 w-20 -translate-x-1/2 rounded-b-2xl bg-black" />
                  {/* Screen content */}
                  <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                      <p className="text-xs text-white/80">{project.downloads} تحميل</p>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="h-2 rounded-full bg-white/20" />
                      <div className="h-2 w-3/4 rounded-full bg-white/20" />
                      <div className="h-2 w-1/2 rounded-full bg-white/20" />
                    </div>
                    <button className="mt-2 rounded-full bg-white px-6 py-2 text-xs font-semibold text-primary-700">
                      ابدأ التجربة
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-400">معاينة حية عبر محاكي Appetize.io</p>
            </div>
          ) : (
            /* Desktop VM frame */
            <div className="mx-auto max-w-2xl">
              <div className="rounded-xl border border-gray-700 bg-gray-800 shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-error-500" />
                    <span className="h-3 w-3 rounded-full bg-warning-500" />
                    <span className="h-3 w-3 rounded-full bg-success-500" />
                  </div>
                  <span className="ml-3 text-xs text-gray-400">{project.title} — Desktop</span>
                </div>
                {/* Screen content */}
                <div className="flex h-[400px] flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/20 backdrop-blur">
                    <Monitor className="h-8 w-8 text-primary-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    <p className="text-sm text-gray-400">{project.description.slice(0, 60)}...</p>
                  </div>
                  <div className="grid w-full max-w-xs grid-cols-3 gap-2">
                    {['الفواتير', 'التقارير', 'الإعدادات'].map((item) => (
                      <div key={item} className="rounded-lg border border-gray-700 bg-gray-800 px-2 py-3 text-xs text-gray-300">
                        {item}
                      </div>
                    ))}
                  </div>
                  <button className="rounded-lg bg-primary-600 px-6 py-2 text-xs font-semibold text-white">
                    تسجيل الدخول
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">معاينة حية عبر noVNC Stream</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        {booted && (
          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="badge bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-400">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                يعمل الآن
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">جلسة تجريبية — تُغلق تلقائياً</span>
            </div>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              فتح في نافذة كاملة
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
