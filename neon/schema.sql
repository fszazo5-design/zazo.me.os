CREATE TABLE IF NOT EXISTS portfolio_content (
  id BIGSERIAL PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('project', 'system-video', 'content-video')),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  content_url TEXT NOT NULL DEFAULT '',
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  topic TEXT NOT NULL DEFAULT '',
  views TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS portfolio_content_kind_created_idx ON portfolio_content (kind, created_at DESC);
