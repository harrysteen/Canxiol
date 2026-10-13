import { NextResponse } from 'next/server';

// Coming-soon gate — ON by default in production.
// Visitors: every page shows /coming-soon (the URL stays the same).
// Team: open /comingsoon/home once → that browser sees the full site for 30 days.
//       Open /comingsoon/exit to see the coming-soon page again.
// Going live: set SITE_LIVE=true on the host and redeploy (or delete this file).
// `npm run dev` always shows the full site.
const ACCESS_PATH = '/comingsoon/home';
const EXIT_PATH = '/comingsoon/exit';
const ACCESS_COOKIE = 'cx_site_access';

export function middleware(request) {
  if (process.env.SITE_LIVE === 'true' || process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === ACCESS_PATH) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.cookies.set(ACCESS_COOKIE, '1', { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' });
    return res;
  }

  if (pathname === EXIT_PATH) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.cookies.delete(ACCESS_COOKIE);
    return res;
  }

  if (request.cookies.get(ACCESS_COOKIE)?.value === '1') return NextResponse.next();

  if (pathname === '/coming-soon') return NextResponse.next();

  // Keep the inquiry form API closed to the public
  if (pathname.startsWith('/api/')) {
    return new NextResponse('Not available', { status: 503 });
  }

  return NextResponse.rewrite(new URL('/coming-soon', request.url));
}

// Skip Next.js internals and static files (images, PDFs, fonts, favicon)
export const config = {
  matcher: ['/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)'],
};
