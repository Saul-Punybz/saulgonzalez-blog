import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readTime: string
  cover?: string
  content: string
}

export function getAllPosts(): Omit<Post, 'content'>[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        readTime: data.readTime ?? '5 min',
        cover: data.cover ?? undefined,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    readTime: data.readTime ?? '5 min',
    cover: data.cover ?? undefined,
    content,
  }
}
