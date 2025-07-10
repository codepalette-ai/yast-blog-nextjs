'use server';

import type { Post } from '../types';

export async function getPosts(
  query = '',
  limit = 5,
  offset = 0
): Promise<Post[]> {
  try {
    let apiUrl = `${process.env.YAST_BLOG_API_URL}/api/posts?limit=${limit}&offset=${offset}`;
    apiUrl += `&query=${query}`;
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': `Bearer ${process.env.YAST_BLOG_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data.data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.YAST_BLOG_API_URL}/api/posts/${slug}`,
      {
        headers: {
          'x-api-key': `Bearer ${process.env.YAST_BLOG_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { data: { post: Post } };
    return data.data.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.YAST_BLOG_API_URL}/api/posts?limit=${limit}&offset=0`,
      {
        headers: {
          'x-api-key': `Bearer ${process.env.YAST_BLOG_API_KEY}`,
        },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as { data: { posts: Post[] } };
    return data.data.posts || [];
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}
