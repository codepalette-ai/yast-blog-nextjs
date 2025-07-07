import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const posts = await fetch(
    `${process.env.YAST_BLOG_API_URL}/api/posts?limit=100`,
    {
      headers: {
        'x-api-key': `Bearer ${process.env.YAST_BLOG_API_KEY}`,
      },
    }
  );
  const postsData = await posts.json();

  const postsUrls =
    postsData?.data?.posts?.map(
      (post: { slug: string; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    ) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsUrls,
  ];
}
