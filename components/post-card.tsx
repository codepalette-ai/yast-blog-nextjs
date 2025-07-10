import { format } from 'date-fns';
import { Eye, Star } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/app/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card
      className={`flex animate-fade-in-up flex-col transition-all duration-300 hover:border-primary/50 ${
        post.isFeatured
          ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-transparent'
          : ''
      }`}
      key={post.id}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="font-bold text-xl">
            <Link
              className="transition-colors hover:text-primary"
              href={`/posts/${post.slug}`}
            >
              {post.title}
            </Link>
          </CardTitle>
          {post.isFeatured && (
            <Badge className="flex items-center gap-1" variant="secondary">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4 text-muted-foreground">
          {post.content.substring(0, 150).replace(/\n/g, ' ')}
          ...
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-muted-foreground text-sm">
        <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{post.views.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
