import { Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const HeaderComponent = () => (
  <header className="sticky top-0 z-50 border-b bg-background/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
    <div className="container mx-auto flex items-center justify-between">
      <Link className="flex items-center gap-2 font-bold text-xl" href="/">
        <Newspaper className="h-6 w-6 text-primary" />
        <span>The Blog</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          FAQ
        </Link>
      </nav>
    </div>
  </header>
);
