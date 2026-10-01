import { useState } from 'react'
import { CheckCircle2, FileJson, GitBranch, Info, Loader2, UploadCloud } from 'lucide-react'
import { githubRepository, uploadJsonFile } from '../lib/github'

const files = [
  { key: 'projects', label: 'المشاريع', filename: 'projects.json' },
  { key: 'system-videos', label: 'فيديوهات الأنظمة', filename: 'system-videos.json' },
  { key: 'content-videos', label: 'فيديوهات المحتوى', filename: 'content-videos.json' },
  { key: 'stats', label: 'الإحصائيات', filename: 'stats.json' },
]

export default function AdminDashboard() {
  const [selected, setSelected] = useState(files[0])
  const [value, setValue] = useState('[]')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  const uploadToGithub = async () => {
    setStatus(null)
    let parsed
    try {
      parsed = JSON.parse(value)
    } catch {
      setStatus({ type: 'error', message: 'صيغة JSON غير صحيحة. راجع الأقواس والفواصل.' })
      return
    }
    if (!Array.isArray(parsed)) {
      setStatus({ type: 'error', message: 'يجب أن يكون محتوى الملف مصفوفة JSON تبدأ بـ [ وتنتهي بـ ].' })
      return
    }

    setSaving(true)
    try {
      const result = await uploadJsonFile({ filename: selected.filename, content: parsed, token })
      setStatus({ type: 'success', message: `تم رفع ${selected.filename} إلى GitHub بنجاح. رقم التعديل: ${result.commit?.sha?.slice(0, 7) || 'تم الحفظ'}` })
      setToken('')
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  return <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة ملفات المحتوى</h1><p className="mt-2 text-gray-600 dark:text-gray-400">أي حفظ من هنا يحدّث ملف JSON المناسب داخل مستودع GitHub، ثم يقرأ الموقع البيانات الجديدة تلقائيًا.</p></div>
    <div className="mb-6 flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200"><Info className="mt-0.5 h-5 w-5 shrink-0" /><span>المستودع المستهدف: <strong dir="ltr">{githubRepository}</strong>. استخدم Fine-grained Token بصلاحية <strong>Contents: Read and write</strong> لهذا المستودع فقط. لا يتم حفظ الرمز في localStorage أو ملفات المشروع، ويُمسح بعد الرفع.</span></div>
    <div className="card p-5">
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">الملف المستهدف</label>
      <select value={selected.key} onChange={(e) => { setSelected(files.find((file) => file.key === e.target.value)); setStatus(null) }} className="input-field mb-5">{files.map((file) => <option key={file.key} value={file.key}>{file.label} — public/data/{file.filename}</option>)}</select>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">محتوى JSON</label>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={16} dir="ltr" className="input-field resize-y font-mono text-sm" placeholder={'[{"id":"..."}]'} />
      <label className="mt-5 mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Fine-grained Token</label>
      <input type="password" value={token} onChange={(e) => setToken(e.target.value)} dir="ltr" autoComplete="off" className="input-field font-mono" placeholder="github_pat_..." />
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">يُستخدم الرمز أثناء الطلب فقط ولا يتم تخزينه في المتصفح.</p>
      {status && <div className={`mt-4 flex items-start gap-2 rounded-lg p-3 text-sm ${status.type === 'success' ? 'bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300' : 'bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300'}`}>{status.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <Info className="h-5 w-5 shrink-0" />}{status.message}</div>}
      <button onClick={uploadToGithub} disabled={saving || !token.trim()} className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}رفع وحفظ في GitHub<GitBranch className="h-4 w-4" /><FileJson className="h-4 w-4" /></button>
    </div>
  </div>
}
