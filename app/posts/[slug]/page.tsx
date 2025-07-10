import { format } from 'date-fns';
import { Calendar, Eye, Rss } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Suspense } from 'react';
import { getPost, getPosts, getRecentPosts } from '@/app/actions/posts.actions';
import { mdxComponents } from '@/components/mdx-components';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  const posts = await getPosts('', 100);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([
    getPost(slug),
    getRecentPosts(3),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <article className="prose dark:prose-invert max-w-none lg:col-span-3">
            <header className="mb-8">
              {post.isFeatured && <Badge className="mb-4">Featured</Badge>}
              <h1 className="mb-4 font-extrabold text-4xl text-foreground tracking-tight md:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <span>By The Blog Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </header>
            <Separator className="my-8" />
            <Suspense fallback={<div>Loading content...</div>}>
              <MDXRemote components={mdxComponents} source={post.content} />
            </Suspense>
          </article>

          <aside className="space-y-6 lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-4">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-lg">
                <Rss className="h-5 w-5 text-primary" />
                Recent Posts
              </h3>
              <Separator />
              <ul className="mt-4 space-y-4">
                {recentPosts.length > 0 ? (
                  recentPosts.map((p) => (
                    <li key={p.id}>
                      <Link
                        className="font-medium transition-colors hover:text-primary"
                        href={`/posts/${p.slug}`}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <p className="text-muted-foreground text-sm">
                      No recent posts.
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
