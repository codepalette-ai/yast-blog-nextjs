import { Search } from 'lucide-react';
import { getPosts } from '@/app/actions/posts.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from './components/post-card';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ limit?: string; offset?: string; query?: string }>;
}) {
  const { query } = (await searchParams) ?? {};
  const posts = await getPosts(query, 5, 0);

  const featuredPost = posts.find((p) => p.isFeatured);
  let regularPosts = posts.filter((p) => !p.isFeatured);
  if (query) {
    regularPosts = posts;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section className="animate-fade-in-up py-16 text-center">
          <h1 className="bg-gradient-to-r from-primary to-foreground/70 bg-clip-text font-bold text-4xl text-transparent tracking-tighter md:text-6xl">
            The Blog to Rank on AI & Search
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Fully automated content creation that dominates search rankings
            across all major platforms.
          </p>
        </section>

        <section className="mb-12">
          <form className="mx-auto flex max-w-lg gap-2">
            <Input
              className="flex-grow"
              defaultValue={query}
              name="query"
              placeholder="Search for articles..."
              type="search"
            />
            <Button aria-label="Search" size="icon" type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </section>

        {query && (
          <div className="mb-8 text-center">
            <h2 className="font-bold text-2xl">Search Results for "{query}"</h2>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {posts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground text-xl">
                  No posts found. Try a different search.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {featuredPost && !query && (
                  <div className="mb-8">
                    <h2 className="mb-10 font-bold text-2xl">Featured Post</h2>
                    <PostCard post={featuredPost} />
                  </div>
                )}
                <div
                  className={`grid grid-cols-1 ${featuredPost && !query ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}
                >
                  <h2 className="font-bold text-2xl">Latest Posts</h2>
                  {regularPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
