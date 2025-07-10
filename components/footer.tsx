import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export const FooterComponent = () => (
  <footer className="mt-16 border-t px-4 py-8 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <div className="text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} The Blog. All rights reserved.</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link className="transition-colors hover:text-primary" href="#">
            Privacy Policy
          </Link>
          <span className="text-muted-foreground/50">•</span>
          <Link className="transition-colors hover:text-primary" href="#">
            Terms of Service
          </Link>
          <span className="text-muted-foreground/50">•</span>
          <Button asChild variant="outline">
            <Link href={`${process.env.YAST_BLOG_API_URL}/sign-in`}>
              Admin Login
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          href="https://withtab.blog"
          target="_blank"
        >
          <Heart className="h-4 w-4 text-red-500" />
          <span>Powered by Tab - The Automated Blog</span>
        </Link>
      </div>
    </div>
  </footer>
);
