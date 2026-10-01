/*
# Create portfolio_projects table (single-tenant, no auth)

1. New Tables
- `portfolio_projects`
  - `id` (uuid, primary key)
  - `title` (text, not null) — project title
  - `description` (text) — project description
  - `category` (text, not null) — one of: android, desktop, content-creation, system-video
  - `technologies` (text) — comma-separated tech list
  - `emulator_url` (text) — Appetize public key or embed URL (for android)
  - `sandbox_url` (text) — web demo / sandbox URL (for desktop)
  - `video_url` (text) — YouTube/Vimeo/direct video URL (for video categories)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `portfolio_projects`.
- Allow anon + authenticated full CRUD because this is a single-tenant portfolio site with a simple password-protected admin panel (no user accounts).
*/

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL DEFAULT 'android',
  technologies text DEFAULT '',
  emulator_url text DEFAULT '',
  sandbox_url text DEFAULT '',
  video_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON portfolio_projects;
CREATE POLICY "anon_select_projects" ON portfolio_projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON portfolio_projects;
CREATE POLICY "anon_insert_projects" ON portfolio_projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON portfolio_projects;
CREATE POLICY "anon_update_projects" ON portfolio_projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON portfolio_projects;
CREATE POLICY "anon_delete_projects" ON portfolio_projects FOR DELETE
  TO anon, authenticated USING (true);
