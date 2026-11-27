import { NextResponse } from 'next/server';

// Coming-soon gate — by domain.
//   canxiol.com / www.canxiol.com → coming-soon page (until the client signs off).
//   canxiol.vercel.app (and localhost) → full site, for client review. Marked "noindex"
//   so search engines don't list the review copy.
// Going live on canxiol.com: set SITE_OPEN=true on the host (Vercel) and redeploy.
// Emergency: COMING_SOON=true shows the coming-soon page on every domain.
// While the gate is on for a visitor:
//   Every page shows /coming-soon (the URL stays the same).
//   Team: open /comingsoon/home once → that browser sees the full site for 30 days.
//         Open /comingsoon/exit to see the coming-soon page again.
const ACCESS_PATH = '/comingsoon/home';
const EXIT_PATH = '/comingsoon/exit';
const ACCESS_COOKIE = 'cx_site_access';

export function middleware(request) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const isMainDomain = host === 'canxiol.com' || host.endsWith('.canxiol.com');
  const gated =
    process.env.COMING_SOON === 'true' ||
    (isMainDomain && process.env.SITE_OPEN !== 'true');

  // Full site: old coming-soon links go to the home page
  if (!gated) {
    const { pathname } = request.nextUrl;
    if (pathname === '/coming-soon' || pathname.startsWith('/comingsoon/')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const res = NextResponse.next();
    // Review copy on canxiol.vercel.app: keep it out of search results
    if (!isMainDomain) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
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

  // The Prescribing Information Leaflet stays open so its QR code (pil-qr.svg → /leaflet,
  // the language chooser) always works on a phone: the chooser page, every language PDF
  // and the original English PDF. Other documents (e.g. the poster) stay hidden.
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {}
  if (
    pathname === '/leaflet' ||
    pathname === '/pdfs/canxiol-prescribing-information-leaflet.pdf' ||
    decodedPath.startsWith('/pdfs/Prescribing information leaflet - ')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/pdfs/')) {
    return NextResponse.rewrite(new URL('/coming-soon', request.url));
  }

  // Keep the inquiry form API closed to the public
  if (pathname.startsWith('/api/')) {
    return new NextResponse('Not available', { status: 503 });
  }

  return NextResponse.rewrite(new URL('/coming-soon', request.url));
}

// Pages, plus the PDFs; skip Next.js internals and other static files (images, fonts, favicon)
export const config = {
  matcher: ['/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)', '/pdfs/:path*'],
};
