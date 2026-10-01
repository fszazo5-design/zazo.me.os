import { useState } from 'react'
import { Download, FileJson, Info } from 'lucide-react'

const files = [
  { key: 'projects', label: 'المشاريع', filename: 'projects.json' },
  { key: 'system-videos', label: 'فيديوهات الأنظمة', filename: 'system-videos.json' },
  { key: 'content-videos', label: 'فيديوهات المحتوى', filename: 'content-videos.json' },
  { key: 'stats', label: 'الإحصائيات', filename: 'stats.json' },
]

export default function AdminDashboard() {
  const [selected, setSelected] = useState(files[0])
  const [value, setValue] = useState('[]')
  const [error, setError] = useState('')

  const downloadJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(value), null, 2)
      const url = URL.createObjectURL(new Blob([`${formatted}\n`], { type: 'application/json' }))
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = selected.filename
      anchor.click()
      URL.revokeObjectURL(url)
      setError('')
    } catch {
      setError('صيغة JSON غير صحيحة. راجع الأقواس والفواصل.')
    }
  }

  return <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة ملفات المحتوى</h1><p className="mt-2 text-gray-600 dark:text-gray-400">جهّز ملف JSON ثم ارفعه إلى المسار المقابل داخل `public/data/` في GitHub.</p></div><div className="mb-6 flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200"><Info className="mt-0.5 h-5 w-5 shrink-0" />الموقع ثابت، لذلك لا يحتفظ ببيانات المستخدمين مباشرة من المتصفح ولا يضع مفاتيح GitHub السرية في الواجهة. مصدر العرض الآمن هو ملفات JSON الموجودة في المستودع.</div><div className="card p-5"><label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">الملف المستهدف</label><select value={selected.key} onChange={(e) => setSelected(files.find((file) => file.key === e.target.value))} className="input-field mb-5">{files.map((file) => <option key={file.key} value={file.key}>{file.label} — public/data/{file.filename}</option>)}</select><label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">محتوى JSON</label><textarea value={value} onChange={(e) => setValue(e.target.value)} rows={18} dir="ltr" className="input-field resize-y font-mono text-sm" placeholder={'[{"id":"..."}]'} />{error && <p className="mt-3 text-sm text-error-600">{error}</p>}<button onClick={downloadJson} className="btn-primary mt-5"><Download className="h-4 w-4" />تنزيل {selected.filename}<FileJson className="h-4 w-4" /></button></div></div>
}
