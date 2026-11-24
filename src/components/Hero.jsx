import { useEffect, useState } from 'react'
import { CONTENT_API_URL } from '../lib/content'

export default function Hero() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    fetch(`${CONTENT_API_URL}?kind=stat`).then((response) => response.ok ? response.json() : []).then((result) => setStats(Array.isArray(result) ? result : result.items || [])).catch(() => setStats([]))
  }, [])

  return <section className="hero-mark overflow-hidden pb-8 pt-8">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="logo-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11172a] shadow-2xl shadow-violet-950/30">
        <div className="logo-glow" />
        <img src="/zazo.jpg" alt="شعار ZazoBrain" className="relative mx-auto block max-h-[420px] w-full object-contain object-center sm:max-h-[500px]" />
      </div>
    </div>
    {stats.length > 0 && <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">{stats.map((stat) => <div key={stat.id} className="stat-card p-5 text-center"><div className="text-2xl font-black text-white">{stat.value}</div><div className="mt-1 text-xs text-slate-400">{stat.title}</div></div>)}</div>}
  </section>
}
