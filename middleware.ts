import { after, type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Forward the original request
  const response = NextResponse.next();

  after(() => {
    fetch(`${process.env.YAST_BLOG_API_URL}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward original request headers
        ...Object.fromEntries(request.headers.entries()),
      },
      body: JSON.stringify({
        apiKey: process.env.YAST_BLOG_API_KEY,
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      }),
    });
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
