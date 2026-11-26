/* eslint-disable react/prop-types */
import { ArrowLeft, Bot, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, Download, Layers3, LifeBuoy, LoaderCircle, Send, Sparkles, Wrench } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { askZazo, loadContent } from '../lib/content'

const pageCopy = {
  showcase: {
    icon: BriefcaseBusiness,
    eyebrow: 'مختبر الإنجاز',
    title: 'أعمالي التي تحوّل الفكرة إلى حضور',
    description: 'جولة بين تطبيقات وتجارب رقمية صُممت لتعمل بسلاسة، وتترك انطباعًا لا يختفي بعد أول نقرة.',
    accent: 'from-blue-600 to-cyan-500',
    image: '/cards/works.webp',
    cta: 'شاهد المشاريع',
    to: '/showcase',
  },
  brain: {
    icon: Bot,
    eyebrow: 'نبض الذكاء',
    title: 'تحدّث مع ZazoBrain',
    description: 'مساحة حوار ذكية للأفكار والأسئلة والحلول. اكتب ما يدور في بالك، ودع ZazoBrain يرتّب الفوضى إلى اتجاه واضح.',
    accent: 'from-violet-600 to-fuchsia-500',
    image: '/cards/brain.webp',
    cta: 'ابدأ المحادثة',
    to: '/zazobrain',
  },
  sources: {
    icon: Download,
    eyebrow: 'صندوق الأدوات',
    title: 'مصادر مجانية تفتح لك الطريق',
    description: 'ملفات وقوالب وتجارب صغيرة جاهزة للتحميل؛ مختارة لتختصر وقتك وتمنح مشروعك دفعة بداية حقيقية.',
    accent: 'from-emerald-600 to-teal-400',
    image: '/cards/sources.webp',
    cta: 'تصفّح المصادر',
    to: '/free-sources',
  },
  services: {
    icon: Wrench,
    eyebrow: 'من الفكرة إلى الإطلاق',
    title: 'خدمات تصنع فرقًا ملموسًا',
    description: 'تطوير تطبيقات، بناء واجهات، أتمتة ذكية وصناعة محتوى؛ حلول عملية بلمسة إبداعية تناسب رؤيتك.',
    accent: 'from-orange-500 to-rose-500',
    image: '/cards/services.webp',
    cta: 'اكتشف الخدمات',
    to: '/services',
  },
}

export function PortalCards() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const timer = window.setInterval(() => {
      if (pausedRef.current) return
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) return
      const next = track.scrollLeft + 320
      track.scrollTo({ left: next >= maxScroll - 4 ? 0 : next, behavior: 'smooth' })
    }, 3600)
    return () => window.clearInterval(timer)
  }, [])
  const move = (amount) => trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }
  return <section className="portal-section mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><span className="section-kicker">بوابة Zazo</span><h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">اختر المسار الذي يشبه فكرتك</h2></div>
      <div className="flex items-center gap-4"><p className="max-w-md text-sm leading-7 text-gray-500">استكشف مسارات Zazo واختَر الصفحة المناسبة لفكرتك.</p><div className="hidden gap-2 sm:flex"><button type="button" onClick={() => move(-340)} aria-label="الكروت السابقة" className="carousel-control"><ChevronRight className="h-5 w-5" /></button><button type="button" onClick={() => move(340)} aria-label="الكروت التالية" className="carousel-control"><ChevronLeft className="h-5 w-5" /></button></div></div>
    </div>
    <div ref={trackRef} dir="ltr" onMouseEnter={pause} onMouseLeave={resume} onFocus={pause} onBlur={resume} onTouchStart={pause} onTouchEnd={resume} className="portal-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]">{Object.entries(pageCopy).map(([key, item], index) => <PortalCard key={key} item={item} index={index} />)}</div>
  </section>
}

function PortalCard({ item, index }) {
  const Icon = item.icon
  return <Link dir="rtl" to={item.to} className="portal-card group relative min-w-[min(82vw,310px)] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm sm:min-w-[310px]">
    <div className={`absolute -left-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-2xl transition duration-500 group-hover:opacity-50`} />
    <div className="relative flex h-full min-h-[270px] flex-col">
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"><img src={item.image} alt="" className="h-36 w-full object-cover transition duration-500 group-hover:scale-105" /><div className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}><Icon className="h-6 w-6" /></div></div>
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">0{index + 1} · {item.eyebrow}</span>
      <h3 className="mt-3 text-xl font-black leading-tight text-gray-900">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">{item.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 transition group-hover:gap-3">{item.cta}<ArrowLeft className="h-4 w-4" /></span>
    </div>
  </Link>
}

export function BrainPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'أهلًا بيك! أنا ZazoBrain. اسألني عن الخدمات أو الأسعار أو فكرة مشروعك، وهساعدك بالمعلومات المتاحة.' }])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event) => {
    event.preventDefault()
    const value = question.trim()
    if (!value || loading) return
    setQuestion('')
    setMessages((items) => [...items, { role: 'user', text: value }])
    setLoading(true)
    try {
      const result = await askZazo(value, messages)
      setMessages((items) => [...items, { role: 'assistant', text: result.answer }])
    } catch (error) {
      setMessages((items) => [...items, { role: 'assistant', text: error.message || 'حصلت مشكلة مؤقتة. جرّب تاني بعد لحظات.' }])
    } finally { setLoading(false) }
  }
  return <PageShell icon={Bot} eyebrow="ZazoBrain / مساحة الحوار" title="فكرة صغيرة؟ دعنا نوسّعها معًا." description="اسأل عن الخدمات والأسعار وبداية مشروعك. الشات يبحث في قاعدة المعرفة الخاصة بـ Zazo ثم يصيغ لك ردًا مصريًا واضحًا." gradient="from-violet-600 to-fuchsia-500">
    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-200/60">
      <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"><Bot className="h-5 w-5" /></span><div><p className="font-black text-gray-900">ZazoBrain</p><p className="text-xs text-gray-500">مساعد المبيعات والخدمات</p></div><span className="mr-auto flex items-center gap-1.5 text-xs text-emerald-600"><span className="h-2 w-2 rounded-full bg-emerald-400" /> متاح</span></div>
      <div className="flex min-h-[330px] flex-col gap-4 bg-gray-50 p-5" dir="rtl">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'self-start bg-violet-500 text-white' : 'self-end border border-gray-200 bg-white text-gray-700 shadow-sm'}`}>{message.text}</div>)}{loading && <div className="self-end rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500"><LoaderCircle className="inline h-4 w-4 animate-spin" /> جاري التفكير...</div>}</div>
      <form onSubmit={submit} className="flex gap-2 border-t border-gray-200 bg-white p-4" dir="rtl"><input value={question} onChange={(event) => setQuestion(event.target.value)} disabled={loading} placeholder="اكتب سؤالك هنا..." className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-violet-400" /><button type="submit" disabled={loading || !question.trim()} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500 text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40" aria-label="إرسال السؤال"><Send className="h-5 w-5" /></button></form>
    </div>
    <div className="mt-8 grid gap-5 md:grid-cols-3"><InfoBox icon={Sparkles} title="يعتمد على المعرفة" text="يبحث في المعلومات التي أضفتها قبل صياغة الرد." /><InfoBox icon={Bot} title="يتحدث بلغتك" text="ردود مصرية مهذبة ومباشرة بدون وعود أو أرقام مخترعة." /><InfoBox icon={Layers3} title="يبني معك" text="اسأل خطوة بخطوة عن الفكرة والمتطلبات المناسبة." /></div>
  </PageShell>
}

export function SourcesPage() {
  const [sources, setSources] = useState([])
  useEffect(() => { loadContent('sources').then(setSources).catch(() => setSources([])) }, [])
  return <PageShell icon={Download} eyebrow="المكتبة المفتوحة" title="حمّل، عدّل، وابنِ شيئًا أجمل." description="مكتبة مصادر مجانية ستتوسع مع الوقت: قوالب واجهات، مكونات صغيرة، وأفكار جاهزة لتمنح مشروعك أول نبضة." gradient="from-emerald-600 to-teal-400"><div className="grid gap-5 md:grid-cols-3"><InfoBox icon={Code2} title="قوالب نظيفة" text="بدايات عملية دون زحام أو كود زائد." /><InfoBox icon={Download} title="تحميل مباشر" text="مصادر مفتوحة للاستخدام والتجربة والتعلم." /><InfoBox icon={Sparkles} title="تحديثات مستمرة" text="كل إضافة جديدة تجد طريقها إلى هذه المكتبة." /></div><ContentCards items={sources} empty="ستظهر هنا ملفات التحميل التي تُدار من لوحة الإدارة بمجرد نشر أول مصدر مجاني." kind="source" /></PageShell>
}

export function ServicesPage() {
  const [services, setServices] = useState([])
  useEffect(() => { loadContent('services').then(setServices).catch(() => setServices([])) }, [])
  return <PageShell icon={Wrench} eyebrow="الخدمات الإبداعية" title="نبني لك حضورًا يعمل، لا مجرد شكل جميل." description="اختر نقطة البداية، وسأحوّلها إلى خطة واضحة وتجربة رقمية تليق بما تريد أن تصنعه." gradient="from-orange-500 to-rose-500"><div className="grid gap-5 md:grid-cols-3"><InfoBox icon={Code2} title="تطبيقات ومنتجات" text="Android وiOS وDesktop وتجارب Web قابلة للنمو." /><InfoBox icon={Layers3} title="واجهات وهوية" text="تصميم واجهة مرتبة، سريعة، وتعرف كيف تحكي قصتك." /><InfoBox icon={LifeBuoy} title="دعم وتطوير" text="تحسينات مستمرة، أتمتة، وربط الخدمات في نظام واحد." /></div><ContentCards items={services} empty="ستظهر هنا الخدمات المنشورة من لوحة الإدارة." kind="service" /><a href="https://wa.me/201091288031" target="_blank" rel="noreferrer" className="btn-primary mt-8">لنبدأ الحديث <ArrowLeft className="h-4 w-4" /></a></PageShell>
}

function ContentCards({ items, empty, kind }) {
  return items.length ? <div className="mt-10 grid gap-4 sm:grid-cols-2">{items.map((item) => <a key={item.id} href={item.contentUrl || '#'} target={item.contentUrl ? '_blank' : undefined} rel={item.contentUrl ? 'noreferrer' : undefined} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">{kind === 'source' ? 'مصدر مفتوح' : 'خدمة متاحة'}</span><h2 className="mt-3 text-lg font-black text-gray-900">{item.title}</h2><p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p></a>)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm leading-7 text-gray-600">{empty}</div>
}

function PageShell({ icon: Icon, eyebrow, title, description, gradient, children }) {
  return <div className="dark-page min-h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900"><ArrowLeft className="h-4 w-4" /> العودة للرئيسية</Link><div className="mb-12 max-w-3xl"><div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-2xl`}><Icon className="h-8 w-8" /></div><span className="section-kicker">{eyebrow}</span><h1 className="mt-4 text-4xl font-black leading-tight text-gray-900 sm:text-6xl">{title}</h1><p className="mt-6 text-lg leading-8 text-gray-600">{description}</p></div>{children}</div></div>
}

function InfoBox({ icon: Icon, title, text }) {
  return <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><Icon className="h-6 w-6 text-primary-600" /><h2 className="mt-6 text-lg font-black text-gray-900">{title}</h2><p className="mt-3 text-sm leading-7 text-gray-600">{text}</p></div>
}
