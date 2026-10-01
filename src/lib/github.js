const GITHUB_REPOSITORY = 'zraqu300-droid/zazo.me.os'
const GITHUB_BRANCH = 'main'

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary)
}

async function githubRequest(path, token, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || `GitHub API error (${response.status})`)
  return body
}

export async function uploadJsonFile({ filename, content, token }) {
  if (!token?.trim()) throw new Error('أدخل GitHub Fine-grained Token أولاً.')
  const path = `/repos/${GITHUB_REPOSITORY}/contents/public/data/${encodeURIComponent(filename)}`
  let sha
  try {
    const current = await githubRequest(`${path}?ref=${GITHUB_BRANCH}`, token)
    sha = current.sha
  } catch (error) {
    if (!error.message.includes('Not Found')) throw error
  }

  const body = {
    message: `Update ${filename} from admin dashboard`,
    content: encodeBase64(`${JSON.stringify(content, null, 2)}\n`),
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {}),
  }
  return githubRequest(path, token, { method: 'PUT', body: JSON.stringify(body) })
}

export const githubRepository = GITHUB_REPOSITORY
