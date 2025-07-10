import type { MetadataRoute } from 'next';
import { getPosts } from '@/app/actions/posts.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts('', 100, 0);

  const postsUrls =
    posts?.map((post) => ({
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/posts/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: post.isFeatured ? 1 : 0.8,
    })) || [];

  return [
    {
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsUrls,
  ];
}
