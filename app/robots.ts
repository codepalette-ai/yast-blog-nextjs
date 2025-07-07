// In your project, create this file: app/robots.ts

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers access to all content
      {
        userAgent: '*',
        allow: '/',
      },
      // The following are specific user agents for LLMs.
      // While the wildcard "*" above already covers them, being
      // explicit can sometimes be beneficial. You can also use this
      // section to disallow specific bots if you wanted to.
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    // Point crawlers to your sitemap
    sitemap: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/sitemap.xml`,
  };
}
