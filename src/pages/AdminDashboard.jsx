import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, Info, KeyRound, Loader2, LogIn, LogOut, Plus, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react'
import { CONTENT_API_URL, LOGIN_API_URL, MEDIA_SIGN_API_URL } from '../lib/content'

const TOKEN_KEY = 'zazobrain_admin_token'
const MAX_IMAGE_BYTES = 15 * 1024 * 1024
const MAX_VIDEO_BYTES = 100 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v']
const emptyForm = { kind: 'project', title: '', description: '', category: 'android', imageUrl: '', contentUrl: '', technologies: '', topic: '', views: '', duration: '' }
const kindLabels = { project: 'مشروع / تطبيق', 'system-video': 'فيديو شرح نظام', 'content-video': 'فيديو صناعة محتوى', source: 'مصدر مجاني', service: 'خدمة' }

function getStoredToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

async function uploadToCloudinary(file, resourceType, token) {
  const signResponse = await fetch(MEDIA_SIGN_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ resourceType }),
  })
  const signing = await signResponse.json().catch(() => ({}))
  if (!signResponse.ok) {
    const error = new Error(signing.error || 'تعذر تجهيز رفع الملف إلى Cloudinary.')
    error.status = signResponse.status
    throw error
  }

  const upload = new FormData()
  upload.append('file', file)
  upload.append('api_key', signing.apiKey)
  upload.append('signature', signing.signature)
  Object.entries(signing.params || {}).forEach(([key, value]) => upload.append(key, String(value)))

  const response = await fetch(signing.uploadUrl, { method: 'POST', body: upload })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || !result.secure_url || !result.public_id) {
    throw new Error(result.error?.message || 'فشل رفع الملف إلى Cloudinary.')
  }
  return { url: result.secure_url, publicId: result.public_id, resourceType }
}

export default function AdminDashboard() {
  const [token, setToken] = useState(getStoredToken)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [videoUpload, setVideoUpload] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [videoPreview, setVideoPreview] = useState('')
  const [items, setItems] = useState([])
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loadingItems, setLoadingItems] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  useEffect(() => () => {
    if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  useEffect(() => () => {
    if (videoPreview.startsWith('blob:')) URL.revokeObjectURL(videoPreview)
  }, [videoPreview])

  const clearToken = useCallback((message = '') => {
    try {
      window.sessionStorage.removeItem(TOKEN_KEY)
    } catch {
      // Continue to the login screen even when session storage is unavailable.
    }
    setToken('')
    setLoginError(message)
  }, [])

  const loadItems = useCallback(async () => {
    setLoadingItems(true)
    try {
      const response = await fetch(CONTENT_API_URL)
      if (!response.ok) throw new Error('تعذر تحميل المحتوى المحفوظ')
      const result = await response.json()
      setItems(Array.isArray(result) ? result : Array.isArray(result.items) ? result.items : [])
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoadingItems(false)
    }
  }, [])

  useEffect(() => {
    if (token) loadItems()
    else setLoadingItems(false)
  }, [token, loadItems])

  const login = async (event) => {
    event.preventDefault()
    setLoginError('')
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.token) throw new Error(result.error || 'تعذر تسجيل الدخول. تحقق من كلمة المرور.')
      window.sessionStorage.setItem(TOKEN_KEY, result.token)
      setPassword('')
      setLoginError('')
      setToken(result.token)
    } catch (error) {
      setLoginError(error.message || 'تعذر تسجيل الدخول.')
    }
  }

  const handleImageSelection = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setStatus(null)
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      event.target.value = ''
      setStatus({ type: 'error', message: 'نوع الصورة غير مدعوم. اختر PNG أو JPEG أو WebP أو GIF.' })
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      event.target.value = ''
      setStatus({ type: 'error', message: 'حجم الصورة يتجاوز 15 ميغابايت.' })
      return
    }
    setImageFile(file)
    setImageUpload(null)
    setImagePreview(URL.createObjectURL(file))
    setForm((current) => ({ ...current, imageUrl: '' }))
  }

  const handleVideoSelection = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setStatus(null)
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      event.target.value = ''
      setStatus({ type: 'error', message: 'نوع الفيديو غير مدعوم. اختر MP4 أو MOV أو WebM.' })
      return
    }
    if (file.size > MAX_VIDEO_BYTES) {
      event.target.value = ''
      setStatus({ type: 'error', message: 'حجم الفيديو يتجاوز 100 ميغابايت.' })
      return
    }
    setVideoFile(file)
    setVideoUpload(null)
    setVideoPreview(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setImageFile(null)
    setVideoFile(null)
    setImageUpload(null)
    setVideoUpload(null)
    setImagePreview('')
    setVideoPreview('')
  }

  const submit = async (event) => {
    event.preventDefault()
    setStatus(null)
    if (!form.title.trim()) return setStatus({ type: 'error', message: 'اكتب عنوان المحتوى أولاً.' })
    setSaving(true)
    try {
      let savedImage = imageUpload
      let savedVideo = videoUpload
      if (imageFile && !savedImage) {
        savedImage = await uploadToCloudinary(imageFile, 'image', token)
        setImageUpload(savedImage)
        setImageFile(null)
        setImagePreview(savedImage.url)
        setForm((current) => ({ ...current, imageUrl: savedImage.url }))
      }
      if (form.kind !== 'project' && videoFile && !savedVideo) {
        savedVideo = await uploadToCloudinary(videoFile, 'video', token)
        setVideoUpload(savedVideo)
        setVideoFile(null)
        setVideoPreview(savedVideo.url)
      }

      const imageUrl = savedImage?.url || form.imageUrl
      const contentUrl = savedVideo?.url || form.contentUrl
      const body = {
        ...form,
        imageUrl,
        imagePublicId: savedImage?.publicId || '',
        imageResourceType: savedImage?.resourceType || '',
        contentUrl,
        videoUrl: savedVideo?.url || contentUrl,
        videoPublicId: savedVideo?.publicId || '',
        videoResourceType: savedVideo?.resourceType || '',
        technologies: form.technologies.split(',').map((item) => item.trim()).filter(Boolean),
      }
      const response = await fetch(CONTENT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      const result = await response.json().catch(() => ({}))
      if (response.status === 401) {
        clearToken('انتهت صلاحية الجلسة. سجّل الدخول مجددًا للمتابعة.')
        return
      }
      if (!response.ok) throw new Error(result.error || 'تعذر حفظ المحتوى')
      resetForm()
      setItems((current) => [result.item || result, ...current])
      setStatus({ type: 'success', message: 'تم رفع الوسائط إلى Cloudinary وحفظ روابطها في D1.' })
    } catch (error) {
      if (error.status === 401) {
        clearToken('انتهت صلاحية الجلسة. سجّل الدخول مجددًا للمتابعة.')
        return
      }
      setStatus({ type: 'error', message: error.message || 'تعذر حفظ المحتوى.' })
    } finally {
      setSaving(false)
    }
  }

  const removeItem = async (item) => {
    if (!window.confirm(`هل تريد حذف «${item.title}» نهائيًا؟`)) return
    setDeletingId(item.id)
    setStatus(null)
    try {
      const response = await fetch(CONTENT_API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: item.id }),
      })
      const result = await response.json().catch(() => ({}))
      if (response.status === 401) {
        clearToken('انتهت صلاحية الجلسة. سجّل الدخول مجددًا للمتابعة.')
        return
      }
      if (!response.ok) throw new Error(result.error || 'تعذر حذف المحتوى')
      await loadItems()
      setStatus({ type: 'success', message: result.mediaDeleted === false ? `حُذف «${item.title}»، لكن تعذر حذف أحد ملفاته من Cloudinary.` : `تم حذف «${item.title}» ووسائطه بنجاح.` })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setDeletingId(null)
    }
  }

  if (!token) {
    return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8"><section className="card w-full max-w-md space-y-6 p-6 sm:p-8"><div className="text-center"><div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"><KeyRound className="h-6 w-6" /></div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">تسجيل دخول الإدارة</h1><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">أدخل كلمة المرور للمتابعة إلى لوحة إدارة المحتوى.</p></div><form onSubmit={login} className="space-y-4"><div><label htmlFor="admin-password" className="mb-2 block text-sm font-medium">كلمة المرور</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-field" required /></div>{loginError && <p role="alert" className="rounded-lg bg-error-50 p-3 text-sm text-error-700 dark:bg-error-950 dark:text-error-300">{loginError}</p>}<button type="submit" className="btn-primary w-full"><LogIn className="h-4 w-4" />دخول</button></form></section></main>
  }

  const isVideo = form.kind === 'system-video' || form.kind === 'content-video'
  const previewImage = imagePreview || form.imageUrl
  return <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><div className="mb-8 flex items-start justify-between gap-4"><div><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300"><ShieldCheck className="h-4 w-4" />مسار إدارة خاص</div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة إدارة المحتوى</h1><p className="mt-2 text-gray-600 dark:text-gray-400">أضف المحتوى أو احذفه، وسيظهر التغيير في الموقع تلقائيًا.</p></div><button type="button" onClick={() => clearToken()} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:border-primary-400 dark:border-gray-700"><LogOut className="h-4 w-4" />خروج</button></div>

    <div className="mb-6 flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><span>الإضافة والحذف يتطلبان جلسة إدارة صالحة. تُرفع الصور والفيديوهات مباشرة إلى Cloudinary، وتُحفظ روابطها ومعرّفاتها في D1.</span></div>

    <form onSubmit={submit} className="card space-y-5 p-6"><h2 className="text-lg font-bold text-gray-900 dark:text-white">إضافة محتوى</h2>
      <div className="grid gap-5 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-medium">نوع المحتوى</label><select value={form.kind} onChange={(event) => { const kind = event.target.value; setForm((current) => ({ ...current, kind })); if (kind === 'project') { setVideoFile(null); setVideoUpload(null); setVideoPreview('') } }} className="input-field"><option value="project">مشروع / تطبيق</option><option value="system-video">فيديو شرح نظام</option><option value="content-video">فيديو صناعة محتوى</option><option value="source">مصدر مجاني</option><option value="service">خدمة</option></select></div><div><label className="mb-2 block text-sm font-medium">التخصص</label><select value={form.category} onChange={(event) => update('category', event.target.value)} className="input-field"><option value="android">أندرويد</option><option value="desktop">ديسكتاوب</option><option value="web-build">Web Build</option><option value="appetize">Appetize Android Emulator</option><option value="content-creation">صناعة محتوى</option><option value="system-video">شرح أنظمة</option></select></div></div>
      <div><label className="mb-2 block text-sm font-medium">العنوان *</label><input value={form.title} onChange={(event) => update('title', event.target.value)} className="input-field" required /></div>
      <div><label className="mb-2 block text-sm font-medium">الوصف</label><textarea value={form.description} onChange={(event) => update('description', event.target.value)} rows={3} className="input-field resize-none" /></div>

      <div className="space-y-3"><label htmlFor="image-file" className="block text-sm font-medium">رفع صورة إلى Cloudinary (اختياري)</label><input id="image-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleImageSelection} className="input-field file:ml-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700" /><p className="text-xs text-gray-500 dark:text-gray-400">الأنواع المدعومة: PNG وJPEG وWebP وGIF، حتى 15 ميغابايت.</p><div><label htmlFor="image-url" className="mb-2 block text-sm font-medium">أو رابط صورة خارجي</label><input id="image-url" type="url" value={form.imageUrl} onChange={(event) => { update('imageUrl', event.target.value); setImageFile(null); setImageUpload(null); setImagePreview('') }} dir="ltr" placeholder="https://..." className="input-field" /><p className="mt-2 text-xs text-gray-500 dark:text-gray-400">يمكن استخدام رابط خارجي بدل رفع صورة.</p></div>{previewImage && <img src={previewImage} alt="معاينة الصورة" className="h-28 w-full rounded-lg object-contain" />}</div>

      {isVideo && <div className="space-y-3"><label htmlFor="video-file" className="block text-sm font-medium">رفع فيديو إلى Cloudinary (اختياري)</label><input id="video-file" type="file" accept="video/mp4,video/quicktime,video/webm,video/x-m4v" onChange={handleVideoSelection} className="input-field file:ml-3 file:rounded-md file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700" /><p className="text-xs text-gray-500 dark:text-gray-400">الأنواع المدعومة: MP4 وMOV وWebM، حتى 100 ميغابايت. يمكن تركه فارغًا واستخدام رابط فيديو أدناه.</p>{videoPreview && <video src={videoPreview} controls className="max-h-64 w-full rounded-lg bg-black" />}</div>}

      <div><label className="mb-2 block text-sm font-medium">{isVideo ? 'رابط الفيديو أو رابط العرض / التجربة' : form.category === 'appetize' ? 'رابط Appetize Embed' : form.category === 'web-build' ? 'رابط Web Build (Vercel)' : 'رابط العرض / التجربة'}</label><input type="url" value={form.contentUrl} onChange={(event) => { update('contentUrl', event.target.value); setVideoFile(null); setVideoUpload(null); setVideoPreview('') }} dir="ltr" placeholder={form.category === 'appetize' ? 'https://appetize.io/embed/...' : 'https://...'} className="input-field" />{form.category === 'appetize' && <p className="mt-2 text-xs text-gray-500">سيتم حفظ رابط Appetize كما هو.</p>}</div>
      {!isVideo && <div><label className="mb-2 block text-sm font-medium">التقنيات (بفواصل)</label><input value={form.technologies} onChange={(event) => update('technologies', event.target.value)} dir="ltr" placeholder="React, Node.js" className="input-field" /></div>}
      {isVideo && <div className="grid gap-5 sm:grid-cols-3"><div><label className="mb-2 block text-sm font-medium">الموضوع</label><input value={form.topic} onChange={(event) => update('topic', event.target.value)} className="input-field" /></div><div><label className="mb-2 block text-sm font-medium">المشاهدات</label><input value={form.views} onChange={(event) => update('views', event.target.value)} className="input-field" /></div><div><label className="mb-2 block text-sm font-medium">المدة</label><input value={form.duration} onChange={(event) => update('duration', event.target.value)} className="input-field" /></div></div>}
      {status && <div role="status" className={`flex items-start gap-2 rounded-lg p-3 text-sm ${status.type === 'success' ? 'bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-300' : 'bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-300'}`}>{status.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <Info className="h-5 w-5 shrink-0" />}{status.message}</div>}
      <button disabled={saving} className="btn-primary disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}{saving ? 'جاري الرفع والحفظ…' : 'حفظ المحتوى'}</button>
    </form>

    <section className="mt-8 card p-6"><div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-gray-900 dark:text-white">المحتوى المحفوظ</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">احذف أي مشروع أو فيديو مباشرة من لوحة الإدارة.</p></div><button type="button" onClick={loadItems} disabled={loadingItems} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:border-primary-400 dark:border-gray-700"><RefreshCw className={`h-4 w-4 ${loadingItems ? 'animate-spin' : ''}`} />تحديث</button></div>{loadingItems ? <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary-500" /></div> : items.length === 0 ? <p className="py-8 text-center text-sm text-gray-500">لا يوجد محتوى محفوظ حتى الآن.</p> : <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800"><div className="min-w-0"><div className="mb-1 flex flex-wrap items-center gap-2"><span className="rounded-full bg-primary-50 px-2 py-1 text-[11px] font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300">{kindLabels[item.kind] || item.kind}</span><span className="text-xs text-gray-500">{item.category || 'بدون تخصص'}</span></div><h3 className="truncate font-semibold text-gray-900 dark:text-white">{item.title}</h3>{item.contentUrl && <p dir="ltr" className="mt-1 truncate text-xs text-gray-500">{item.contentUrl}</p>}</div><button type="button" onClick={() => removeItem(item)} disabled={deletingId === item.id} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-sm font-semibold text-error-700 transition hover:bg-error-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-error-950 dark:text-error-300" aria-label={`حذف ${item.title}`}>{deletingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}حذف</button></div>)}</div>}</section>
  </div></main>
}
