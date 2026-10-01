import { useEffect, useState } from 'react'
import { X, Smartphone, Monitor, RotateCcw, Loader2, ShieldCheck } from 'lucide-react'

function buildAppetizeUrl(raw) {
  if (!raw) return null
  const trimmed = raw.trim()
  if (trimmed === 'demo') return 'https://appetize.io/embed/demo'
  if (/^https?:\/\//.test(trimmed)) {
    if (trimmed.includes('/embed/')) return trimmed
    const match = trimmed.match(/appetize\.io\/app\/([\w-]+)/)
    if (match) return `https://appetize.io/embed/${match[1]}`
    return trimmed
  }
  return `https://appetize.io/embed/${trimmed}`
}

export default function TestDriveModal({ project, onClose }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [project])

  if (!project) return null

  const isAndroid = project.category === 'android'
  const isDesktop = project.category === 'desktop'

  const appetizeUrl = isAndroid ? buildAppetizeUrl(project.emulatorUrl) : null
  const sandboxUrl = isDesktop ? (project.sandboxUrl || null) : null
  const hasEmbed = (isAndroid && appetizeUrl) || (isDesktop && sandboxUrl)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />

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
                {isAndroid ? 'محاكي أندرويد تفاعلي — Appetize.io' : 'بيئة ديسكتاوب تفاعلية — Interactive Demo'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Restart session">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Emulator / Sandbox area */}
        <div className="relative bg-gray-950" style={{ minHeight: '500px' }}>
          {loading ? (
            <div className="flex h-[500px] flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary-400" />
              <p className="text-sm text-gray-400">جاري تشغيل {isAndroid ? 'المحاكي' : 'البيئة التفاعلية'}...</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400" />
                تهيئة البيئة
              </div>
            </div>
          ) : hasEmbed ? (
            isAndroid ? (
              <div className="flex flex-col items-center justify-center p-6">
                <iframe
                  src={`${appetizeUrl}?device=pixel7&orientation=portrait&scale=auto`}
                  title={`${project.title} — Android Emulator`}
                  className="border-0"
                  style={{ width: '100%', maxWidth: '380px', height: '620px', borderRadius: '1.5rem' }}
                  allow="autoplay; clipboard-write; fullscreen"
                  loading="lazy"
                />
                <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-success-400" />
                  تجربة تفاعلية فقط — لا يتوفر تحميل للتطبيق لحماية الكود
                </p>
              </div>
            ) : (
              <div className="p-6">
                <iframe
                  src={sandboxUrl}
                  title={`${project.title} — Interactive Desktop Demo`}
                  className="w-full border-0"
                  style={{ height: '500px', borderRadius: '0.75rem' }}
                  allow="autoplay; clipboard-write; fullscreen; accelerometer; gyroscope"
                  loading="lazy"
                />
                <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-success-400" />
                  تجربة تفاعلية فقط — لا يتوفر تحميل لملفات البرنامج التنفيذية
                </p>
              </div>
            )
          ) : (
            <div className="flex h-[500px] flex-col items-center justify-center gap-4 px-6 text-center">
              {isAndroid ? (
                <div className="relative rounded-[2.5rem] border-4 border-gray-700 bg-black p-2 shadow-2xl">
                  <div className="relative h-[420px] w-[230px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-primary-600 to-primary-800">
                    <div className="absolute left-1/2 top-0 z-10 h-6 w-16 -translate-x-1/2 rounded-b-2xl bg-black" />
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-base font-bold text-white">{project.title}</h4>
                      <p className="text-xs text-white/70">لم يتم توفير رابط المحاكي لهذا المشروع بعد</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-md rounded-xl border border-gray-700 bg-gray-800 shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-gray-700 px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-error-500" />
                      <span className="h-3 w-3 rounded-full bg-warning-500" />
                      <span className="h-3 w-3 rounded-full bg-success-500" />
                    </div>
                    <span className="ml-3 text-xs text-gray-400">{project.title}</span>
                  </div>
                  <div className="flex h-[300px] flex-col items-center justify-center gap-4 bg-gray-900 p-6 text-center">
                    <Monitor className="h-10 w-10 text-gray-500" />
                    <p className="text-sm text-gray-400">لم يتم توفير رابط البيئة التفاعلية لهذا المشروع بعد</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="badge bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-500" />
              {loading ? 'جاري التشغيل' : 'يعمل الآن'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">جلسة تجريبية — تجربة تفاعلية فقط</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            محمي
          </span>
        </div>
      </div>
    </div>
  )
}
