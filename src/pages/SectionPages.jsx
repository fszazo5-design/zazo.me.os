/* eslint-disable react/prop-types */
import { ArrowLeft, Bot, BriefcaseBusiness, Code2, Download, Layers3, LifeBuoy, Sparkles, Wrench } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadContent } from '../lib/content'

const pageCopy = {
  showcase: {
    icon: BriefcaseBusiness,
    eyebrow: 'مختبر الإنجاز',
    title: 'أعمالي التي تحوّل الفكرة إلى حضور',
    description: 'جولة بين تطبيقات وتجارب رقمية صُممت لتعمل بسلاسة، وتترك انطباعًا لا يختفي بعد أول نقرة.',
    accent: 'from-blue-600 to-cyan-500',
    cta: 'شاهد المشاريع',
    to: '/showcase',
  },
  brain: {
    icon: Bot,
    eyebrow: 'نبض الذكاء',
    title: 'تحدّث مع ZazoBrain',
    description: 'مساحة حوار ذكية للأفكار والأسئلة والحلول. اكتب ما يدور في بالك، ودع ZazoBrain يرتّب الفوضى إلى اتجاه واضح.',
    accent: 'from-violet-600 to-fuchsia-500',
    cta: 'ابدأ المحادثة',
    to: '/zazobrain',
  },
  sources: {
    icon: Download,
    eyebrow: 'صندوق الأدوات',
    title: 'مصادر مجانية تفتح لك الطريق',
    description: 'ملفات وقوالب وتجارب صغيرة جاهزة للتحميل؛ مختارة لتختصر وقتك وتمنح مشروعك دفعة بداية حقيقية.',
    accent: 'from-emerald-600 to-teal-400',
    cta: 'تصفّح المصادر',
    to: '/free-sources',
  },
  services: {
    icon: Wrench,
    eyebrow: 'من الفكرة إلى الإطلاق',
    title: 'خدمات تصنع فرقًا ملموسًا',
    description: 'تطوير تطبيقات، بناء واجهات، أتمتة ذكية وصناعة محتوى؛ حلول عملية بلمسة إبداعية تناسب رؤيتك.',
    accent: 'from-orange-500 to-rose-500',
    cta: 'اكتشف الخدمات',
    to: '/services',
  },
}

export function PortalCards() {
  return <section className="portal-section mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><span className="section-kicker">بوابة Zazo</span><h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">اختر المسار الذي يشبه فكرتك</h2></div>
      <p className="max-w-md text-sm leading-7 text-slate-400">كل أيقونة هنا ليست رابطًا عابرًا؛ إنها بداية صفحة كاملة صُممت لتأخذك إلى التجربة مباشرة.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{Object.entries(pageCopy).map(([key, item], index) => <PortalCard key={key} item={item} index={index} />)}</div>
  </section>
}

function PortalCard({ item, index }) {
  const Icon = item.icon
  return <Link to={item.to} className="portal-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
    <div className={`absolute -left-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-2xl transition duration-500 group-hover:opacity-50`} />
    <div className="relative flex h-full min-h-[270px] flex-col">
      <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}><Icon className="h-7 w-7" /></div>
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">0{index + 1} · {item.eyebrow}</span>
      <h3 className="mt-3 text-xl font-black leading-tight text-white">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{item.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:gap-3">{item.cta}<ArrowLeft className="h-4 w-4" /></span>
    </div>
  </Link>
}

export function BrainPage() {
  return <PageShell icon={Bot} eyebrow="ZazoBrain / مساحة الحوار" title="فكرة صغيرة؟ دعنا نوسّعها معًا." description="هذه الصفحة مهيّأة لتكون مدخل المحادثة الذكية. اربط واجهة الدردشة بخدمة الذكاء الخاصة بك من خلال API، واحتفظ بالتجربة داخل عالم Zazo." gradient="from-violet-600 to-fuchsia-500"><div className="grid gap-5 md:grid-cols-3"><InfoBox icon={Sparkles} title="يفهم السياق" text="حوّل ملاحظاتك المتناثرة إلى خطوات مرتبة قابلة للتنفيذ." /><InfoBox icon={Bot} title="يتحدث بلغتك" text="حوار طبيعي، واضح، ومصمم ليقرب التقنية من فكرتك." /><InfoBox icon={Layers3} title="يبني معك" text="من أول سؤال إلى تصور منتج يمكن أن يرى النور." /></div><Link to="/services" className="btn-primary mt-8">اطلب جلسة بناء <ArrowLeft className="h-4 w-4" /></Link></PageShell>
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
  return items.length ? <div className="mt-10 grid gap-4 sm:grid-cols-2">{items.map((item) => <a key={item.id} href={item.contentUrl || '#'} target={item.contentUrl ? '_blank' : undefined} rel={item.contentUrl ? 'noreferrer' : undefined} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.1]"><span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{kind === 'source' ? 'مصدر مفتوح' : 'خدمة متاحة'}</span><h2 className="mt-3 text-lg font-black text-white">{item.title}</h2><p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p></a>)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300">{empty}</div>
}

function PageShell({ icon: Icon, eyebrow, title, description, gradient, children }) {
  return <div className="dark-page min-h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> العودة للرئيسية</Link><div className="mb-12 max-w-3xl"><div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-2xl`}><Icon className="h-8 w-8" /></div><span className="section-kicker">{eyebrow}</span><h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">{title}</h1><p className="mt-6 text-lg leading-8 text-slate-400">{description}</p></div>{children}</div></div>
}

function InfoBox({ icon: Icon, title, text }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"><Icon className="h-6 w-6 text-cyan-300" /><h2 className="mt-6 text-lg font-black text-white">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></div>
}
