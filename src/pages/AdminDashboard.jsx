import { useState } from 'react'
import {
  Lock, Plus, Trash2, Edit3, X, Upload, Link2, Video,
  Smartphone, Monitor, Film, Save, Eye, EyeOff, Check, AlertCircle
} from 'lucide-react'

const categoryOptions = [
  { value: 'android', label: 'تطبيق أندرويد', icon: Smartphone },
  { value: 'desktop', label: 'برنامج ديسكتاوب', icon: Monitor },
  { value: 'content-creation', label: 'صناعة محتوى', icon: Film },
  { value: 'system-video', label: 'فيديو نظام', icon: Video },
]

const initialItems = [
  { id: 1, title: 'Smart Inventory Manager', category: 'android', apkUrl: 'https://example.com/app.apk', videoUrl: 'https://youtube.com/watch?v=123', description: 'نظام إدارة مخزون' },
  { id: 2, title: 'Desktop POS System', category: 'desktop', apkUrl: '', videoUrl: 'https://youtube.com/watch?v=456', description: 'نظام نقاط بيع' },
]

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')

  const [items, setItems] = useState(initialItems)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'android',
    apkUrl: '',
    videoUrl: '',
    cloudUrl: '',
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('كلمة المرور غير صحيحة. جرّب: admin123')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'android', apkUrl: '', videoUrl: '', cloudUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      showToast('يرجى إدخال عنوان المشروع', 'error')
      return
    }
    if (editingId) {
      setItems((prev) => prev.map((it) => (it.id === editingId ? { ...it, ...formData } : it)))
      showToast('تم تحديث المشروع بنجاح')
    } else {
      setItems((prev) => [...prev, { id: Date.now(), ...formData }])
      showToast('تم إضافة المشروع بنجاح')
    }
    resetForm()
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      apkUrl: item.apkUrl || '',
      videoUrl: item.videoUrl || '',
      cloudUrl: item.cloudUrl || '',
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    showToast('تم حذف المشروع')
  }

  // Login screen
  if (!authed) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card p-8 animate-fade-in-up">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Lock className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">لوحة التحكم</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">سجّل الدخول لإدارة المشاريع والفيديوهات</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-11"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700 dark:bg-error-950 dark:text-error-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {authError}
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                <Lock className="h-4 w-4" />
                دخول
              </button>
            </form>

            <p className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              كلمة المرور التجريبية: <span className="font-mono font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الأعمال</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">أضف وعدّل واحذف المشاريع والفيديوهات</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); setFormData({ title: '', description: '', category: 'android', apkUrl: '', videoUrl: '', cloudUrl: '' }) }}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" />
          إضافة مشروع
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'إجمالي المشاريع', value: items.length, icon: Plus },
          { label: 'تطبيقات أندرويد', value: items.filter((i) => i.category === 'android').length, icon: Smartphone },
          { label: 'برامج ديسكتاوب', value: items.filter((i) => i.category === 'desktop').length, icon: Monitor },
          { label: 'فيديوهات', value: items.filter((i) => i.category === 'content-creation' || i.category === 'system-video').length, icon: Video },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Items table */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">المشاريع الحالية</h2>
        </div>
        {items.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد مشاريع بعد. ابدأ بإضافة مشروع جديد.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {items.map((item) => {
              const cat = categoryOptions.find((c) => c.value === item.category)
              const CatIcon = cat?.icon || Smartphone
              return (
                <div key={item.id} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                      <CatIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">{cat?.label}</p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1.5">
                    <button onClick={() => handleEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950 dark:hover:text-primary-400">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-950 dark:hover:text-error-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={resetForm}>
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl animate-scale-in dark:border-gray-800 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {editingId ? 'تعديل مشروع' : 'إضافة مشروع جديد'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان المشروع *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: Smart Inventory Manager"
                  className="input-field"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">وصف المشروع</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="وصف مختصر للمشروع وميزاته..."
                  className="input-field resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">التصنيف</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {categoryOptions.map((opt) => {
                    const Icon = opt.icon
                    const isActive = formData.category === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: opt.value })}
                        className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${
                          isActive
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* APK / Cloud URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Upload className="h-4 w-4" />
                    رابط ملف APK أو رابط النظام السحابي
                  </span>
                </label>
                <input
                  type="url"
                  value={formData.apkUrl}
                  onChange={(e) => setFormData({ ...formData, apkUrl: e.target.value })}
                  placeholder="https://example.com/app.apk"
                  className="input-field"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Link2 className="h-4 w-4" />
                    رابط فيديو الشرح أو المحتوى
                  </span>
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-field"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">
                  <Save className="h-4 w-4" />
                  {editingId ? 'حفظ التعديلات' : 'إضافة المشروع'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 animate-fade-in-up">
          <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl ${
            toast.type === 'error'
              ? 'bg-error-600 text-white'
              : 'bg-success-600 text-white'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}
