import { useState } from 'react'
import { Bot, MessageCircle, Phone, X, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'

const MESSENGER_URL = 'https://m.me/ahmd.alrwby.117154'
const WHATSAPP_URL = 'https://wa.me/201091288031'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Expanded options */}
      {open && (
        <div className="flex flex-col gap-2.5 animate-fade-in-up">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl dark:bg-gray-900 dark:ring-gray-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-100 text-success-600 dark:bg-success-950 dark:text-success-400">
              <Phone className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">واتساب</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">+20 109 128 8031</span>
            </span>
          </a>
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl dark:bg-gray-900 dark:ring-gray-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">ماسنجر</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">محادثة مباشرة</span>
            </span>
          </a>
        </div>
      )}

      <Link
        to="/zazobrain"
        className="group flex items-center gap-3 rounded-2xl border border-violet-300/30 bg-gradient-to-l from-violet-600 to-blue-600 px-4 py-3 text-white shadow-2xl shadow-violet-600/30 transition-all hover:-translate-y-1 hover:shadow-violet-600/45 focus:outline-none focus:ring-2 focus:ring-violet-300"
        aria-label="تحدث مع عقل زازو"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
          <Bot className="h-5 w-5 transition-transform group-hover:scale-110" />
        </span>
        <span className="flex flex-col text-right">
          <span className="text-sm font-black">تحدث مع عقل زازو</span>
          <span className="text-[11px] text-white/75">اسأل، استكشف، وابدأ فكرتك</span>
        </span>
      </Link>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-2xl shadow-primary-600/40 transition-all hover:scale-105 active:scale-95"
        aria-label={open ? 'إغلاق خيارات التواصل' : 'فتح خيارات التواصل'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
      </button>
    </div>
  )
}
