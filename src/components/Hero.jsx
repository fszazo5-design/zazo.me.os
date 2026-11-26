import { useEffect, useState } from 'react'
import { CONTENT_API_URL } from '../lib/content'

export function StatsBar() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    fetch(`${CONTENT_API_URL}?kind=stat`).then((response) => response.ok ? response.json() : []).then((result) => setStats(Array.isArray(result) ? result : result.items || [])).catch(() => setStats([]))
  }, [])
  if (!stats.length) return null
  return <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 px-4 pb-8 sm:grid-cols-4 sm:px-6 lg:px-8">{stats.map((stat) => <div key={stat.id} className="stat-card p-5 text-center"><div className="text-2xl font-black text-gray-900">{stat.value}</div><div className="mt-1 text-xs text-gray-500">{stat.title}</div></div>)}</div>
}

export default function Hero() {
  return <section className="hero-mark overflow-hidden pb-8 pt-8">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="logo-frame relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-gray-200/70">
        <div className="logo-glow" />
        <img src="/zazo.jpg" alt="شعار ZazoBrain" className="relative mx-auto block max-h-[420px] w-full object-contain object-center sm:max-h-[500px]" />
      </div>
    </div>
  </section>
}
