import { NextResponse } from 'next/server';

// Coming-soon gate — OFF: the site is live.
// To bring the gate back, set COMING_SOON=true on the host (Vercel) and redeploy. Then:
//   Visitors: every page shows /coming-soon (the URL stays the same).
//   Team: open /comingsoon/home once → that browser sees the full site for 30 days.
//         Open /comingsoon/exit to see the coming-soon page again.
// `npm run dev` always shows the full site.
const ACCESS_PATH = '/comingsoon/home';
const EXIT_PATH = '/comingsoon/exit';
const ACCESS_COOKIE = 'cx_site_access';

export function middleware(request) {
  const gated = process.env.COMING_SOON === 'true' && process.env.NODE_ENV !== 'development';

  // Site is live: old coming-soon links go to the home page
  if (!gated) {
    const { pathname } = request.nextUrl;
    if (pathname === '/coming-soon' || pathname.startsWith('/comingsoon/')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
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
