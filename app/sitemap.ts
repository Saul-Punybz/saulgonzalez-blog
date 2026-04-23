import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: 'https://blogs.saulgonzalez.pro', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...posts.map(p => ({
      url: `https://blogs.saulgonzalez.pro/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
