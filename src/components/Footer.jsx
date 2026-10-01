import { Link } from 'react-router-dom'
import { Code2, MessageCircle, Phone } from 'lucide-react'

const MESSENGER_URL = 'https://m.me/ahmd.alrwby.117154'
const WHATSAPP_URL = 'https://wa.me/201091288031'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Dev<span className="text-primary-500">Portfolio</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              منصة لعرض أعمالي في تطوير التطبيقات والأنظمة وصناعة المحتوى التقني.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/showcase', label: 'المشاريع' },
                { to: '/system-videos', label: 'شرح الأنظمة' },
                { to: '/content-videos', label: 'صناعة المحتوى' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">تواصل معي</h3>
            <div className="flex gap-3">
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:text-blue-400"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-success-400 hover:bg-success-50 hover:text-success-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-success-500 dark:hover:bg-success-950 dark:hover:text-success-400"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4 space-y-2">
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <MessageCircle className="h-4 w-4" />
                مراسلة عبر ماسنجر
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-success-600 dark:text-gray-400 dark:hover:text-success-400"
              >
                <Phone className="h-4 w-4" />
                واتساب: +20 109 128 8031
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} DevPortfolio. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
