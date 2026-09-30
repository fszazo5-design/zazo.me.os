import { useState } from 'react'
import { Play, Eye, X, Film, TrendingUp, Hash } from 'lucide-react'
import { contentVideos } from '../data/mockData'

export default function ContentVideos() {
  const [activeVideo, setActiveVideo] = useState(null)

  const totalViews = contentVideos.reduce((sum, v) => {
    const num = parseInt(v.views.replace('K', '000').replace('M', '000000'))
    return sum + num
  }, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:bg-accent-950 dark:text-accent-300">
          <Film className="h-4 w-4" />
          صناعة المحتوى
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          فيديوهات صناعة المحتوى
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          محتوى تقني قصير ومركّز يبسّط المفاهيم البرمجية ويشارك خبراتي في عالم التطوير.
        </p>
      </div>

      {/* Quick stats */}
      <div className="mb-10 grid grid-cols-3 gap-4 sm:gap-6">
        <div className="card p-5 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
            <Film className="h-5 w-5" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{contentVideos.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">فيديو</div>
        </div>
        <div className="card p-5 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-950 dark:text-success-400">
            <Eye className="h-5 w-5" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{(totalViews / 1000).toFixed(0)}K+</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي المشاهدات</div>
        </div>
        <div className="card p-5 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">+15%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">نمو شهري</div>
        </div>
      </div>

      {/* Reels-style grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {contentVideos.map((video, i) => (
          <div
            key={video.id}
            className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl bg-gray-900 shadow-md transition-all duration-300 hover:shadow-xl animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setActiveVideo(video)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur">
                <Play className="h-5 w-5 fill-accent-600 text-accent-600" />
              </div>
            </div>

            {/* Top badge - topic */}
            <div className="absolute top-2 right-2">
              <span className="badge bg-black/50 text-white backdrop-blur">
                <Hash className="h-2.5 w-2.5" />
                {video.topic}
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 right-0 left-0 p-3">
              <p className="line-clamp-2 text-xs font-medium text-white">{video.title}</p>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-white/70">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-2.5 w-2.5" />
                  {video.views}
                </span>
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video player modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setActiveVideo(null)}>
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-2xl animate-scale-in"
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
            <div className="flex items-center justify-between px-5 py-4">
              <span className="badge bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300">
                <Hash className="h-3 w-3" />
                {activeVideo.topic}
              </span>
              <span className="text-xs text-gray-400">
                {activeVideo.views} مشاهدة
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
