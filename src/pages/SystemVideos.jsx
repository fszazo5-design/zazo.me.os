import { useState } from 'react'
import { Play, Eye, Clock, Calendar, X, Search, Video } from 'lucide-react'
import { systemVideos } from '../data/mockData'

export default function SystemVideos() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = systemVideos.filter((v) =>
    v.title.includes(search) || v.description.includes(search)
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300">
          <Video className="h-4 w-4" />
          شروحات تقنية
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          فيديوهات شرح الأنظمة
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          شروحات تفصيلية لكل نظام، تشرح كيفية التثبيت والاستخدام واستغلال جميع الميزات.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن فيديو..."
            className="input-field pr-11"
          />
        </div>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video, i) => (
          <div
            key={video.id}
            className="card group cursor-pointer overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setActiveVideo(video)}
          >
            {/* Thumbnail */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="h-6 w-6 fill-primary-600 text-primary-600" />
                </div>
              </div>
              {/* Duration */}
              <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                {video.duration}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {video.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {video.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {video.views}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {video.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {video.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Video className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">لا توجد فيديوهات مطابقة لبحثك.</p>
        </div>
      )}

      {/* Video player modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setActiveVideo(null)}>
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3">
              <h3 className="text-sm font-semibold text-white">{activeVideo.title}</h3>
              <button onClick={() => setActiveVideo(null)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-gray-300">{activeVideo.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {activeVideo.views} مشاهدة
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeVideo.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
