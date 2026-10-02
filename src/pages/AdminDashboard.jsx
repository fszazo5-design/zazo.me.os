import { useEffect, useState } from 'react'
import { CheckCircle2, Database, Info, Loader2, Plus, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react'
import { CONTENT_API_URL } from '../lib/content'

const emptyForm = { kind: 'project', title: '', description: '', category: 'android', imageUrl: '', contentUrl: '', technologies: '', topic: '', views: '', duration: '' }
const kindLabels = { project: 'مشروع / تطبيق', 'system-video': 'فيديو شرح نظام', 'content-video': 'فيديو صناعة محتوى' }

export default function AdminDashboard() {
  const [form, setForm] = useState(emptyForm)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loadingItems, setLoadingItems] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const loadItems = async () => {
    setLoadingItems(true)
    try {
      const response = await fetch(CONTENT_API_URL)
      if (!response.ok) throw new Error('تعذر تحميل المحتوى المحفوظ')
      setItems(await response.json())
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoadingItems(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  const submit = async (event) => {
    event.preventDefault(); setStatus(null)
    if (!form.title.trim()) return setStatus({ type: 'error', message: 'اكتب عنوان المحتوى أولاً.' })
    setSaving(true)
    try {
      const response = await fetch(CONTENT_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, technologies: form.technologies.split(',').map((item) => item.trim()).filter(Boolean) }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'تعذر حفظ المحتوى')
      setForm(emptyForm)
      setItems((current) => [result, ...current])
      setStatus({ type: 'success', message: 'تم حفظ المحتوى في Neon وظهر في قائمة الإدارة.' })
    } catch (error) { setStatus({ type: 'error', message: error.message }) } finally { setSaving(false) }
  }

  const removeItem = async (item) => {
    if (!window.confirm(`هل تريد حذف «${item.title}» نهائيًا؟`)) return
    setDeletingId(item.id); setStatus(null)
    try {
      const response = await fetch(CONTENT_API_URL, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'تعذر حذف المحتوى')
      setItems((current) => current.filter((entry) => String(entry.id) !== String(item.id)))
      setStatus({ type: 'success', message: `تم حذف «${item.title}» من Neon.` })
    } catch (error) { setStatus({ type: 'error', message: error.message }) } finally { setDeletingId(null) }
  }

  const isVideo = form.kind !== 'project'
  return <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><div className="mb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300"><ShieldCheck className="h-4 w-4" />مسار إدارة خاص</div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة إدارة المحتوى</h1><p className="mt-2 text-gray-600 dark:text-gray-400">أضف المحتوى أو احذفه من Neon، وسيظهر التغيير في الموقع تلقائيًا.</p></div><div className="mb-6 flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200"><Database className="mt-0.5 h-5 w-5 shrink-0" /><span>تأكد من إعداد <strong>DATABASE_URL</strong> في Vercel وتشغيل مخطط <code>neon/schema.sql</code> مرة واحدة.</span></div><form onSubmit={submit} className="card space-y-5 p-6"><h2 className="text-lg font-bold text-gray-900 dark:text-white">إضافة محتوى</h2><div className="grid gap-5 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-medium">نوع المحتوى</label><select value={form.kind} onChange={(e) => update('kind', e.target.value)} className="input-field"><option value="project">مشروع / تطبيق</option><option value="system-video">فيديو شرح نظام</option><option value="content-video">فيديو صناعة محتوى</option></select></div><div><label className="mb-2 block text-sm font-medium">التخصص</label><select value={form.category} onChange={(e) => update('category', e.target.value)} className="input-field"><option value="android">أندرويد</option><option value="desktop">ديسكتوب</option><option value="web-build">Web Build</option><option value="appetize">Appetize Android Emulator</option><option value="content-creation">صناعة محتوى</option><option value="system-video">شرح أنظمة</option></select></div></div><div><label className="mb-2 block text-sm font-medium">العنوان *</label><input value={form.title} onChange={(e) => update('title', e.target.value)} className="input-field" required /></div><div><label className="mb-2 block text-sm font-medium">الوصف</label><textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} className="input-field resize-none" /></div><div><label className="mb-2 block text-sm font-medium">رابط الصورة</label><input type="url" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} dir="ltr" placeholder="https://..." className="input-field" /></div><div><label className="mb-2 block text-sm font-medium">{isVideo ? 'رابط الفيديو' : form.category === 'appetize' ? 'رابط Appetize Embed' : form.category === 'web-build' ? 'رابط Web Build (Vercel)' : 'رابط العرض / التجربة'}</label><input type="url" value={form.contentUrl} onChange={(e) => update('contentUrl', e.target.value)} dir="ltr" placeholder={form.category === 'appetize' ? 'https://appetize.io/embed/...' : 'https://...'} className="input-field" />{form.category === 'appetize' && <p className="mt-2 text-xs text-gray-500">سيتم حفظ رابط Appetize كما هو.</p>}</div>{!isVideo && <div><label className="mb-2 block text-sm font-medium">التقنيات (بفواصل)</label><input value={form.technologies} onChange={(e) => update('technologies', e.target.value)} dir="ltr" placeholder="React, Node.js" className="input-field" /></div>}{isVideo && <div className="grid gap-5 sm:grid-cols-3"><div><label className="mb-2 block text-sm font-medium">الموضوع</label><input value={form.topic} onChange={(e) => update('topic', e.target.value)} className="input-field" /></div><div><label className="mb-2 block text-sm font-medium">المشاهدات</label><input value={form.views} onChange={(e) => update('views', e.target.value)} className="input-field" /></div><div><label className="mb-2 block text-sm font-medium">المدة</label><input value={form.duration} onChange={(e) => update('duration', e.target.value)} className="input-field" /></div></div>}{status && <div className={`flex items-start gap-2 rounded-lg p-3 text-sm ${status.type === 'success' ? 'bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300' : 'bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300'}`}>{status.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <Info className="h-5 w-5 shrink-0" />}{status.message}</div>}<button disabled={saving} className="btn-primary disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}حفظ المحتوى في Neon</button></form>

    <section className="mt-8 card p-6"><div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-gray-900 dark:text-white">المحتوى المحفوظ</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">احذف أي مشروع أو فيديو مباشرة من قاعدة Neon.</p></div><button type="button" onClick={loadItems} disabled={loadingItems} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:border-primary-400 dark:border-gray-700"><RefreshCw className={`h-4 w-4 ${loadingItems ? 'animate-spin' : ''}`} />تحديث</button></div>{loadingItems ? <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary-500" /></div> : items.length === 0 ? <p className="py-8 text-center text-sm text-gray-500">لا يوجد محتوى محفوظ حتى الآن.</p> : <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800"><div className="min-w-0"><div className="mb-1 flex flex-wrap items-center gap-2"><span className="rounded-full bg-primary-50 px-2 py-1 text-[11px] font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300">{kindLabels[item.kind] || item.kind}</span><span className="text-xs text-gray-500">{item.category || 'بدون تخصص'}</span></div><h3 className="truncate font-semibold text-gray-900 dark:text-white">{item.title}</h3>{item.contentUrl && <p dir="ltr" className="mt-1 truncate text-xs text-gray-500">{item.contentUrl}</p>}</div><button type="button" onClick={() => removeItem(item)} disabled={deletingId === item.id} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-sm font-semibold text-error-700 transition hover:bg-error-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-error-950 dark:text-error-300" aria-label={`حذف ${item.title}`}>{deletingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}حذف</button></div>)}</div>}</section></div></main>
}
