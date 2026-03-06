import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/src/lib/auth/jwt';

/** Routes that require authentication */
const AUTHED_ROUTES = ['/account', '/checkout', '/api/v1/cart', '/api/v1/orders'];
/** Routes that require ADMIN role */
const ADMIN_ROUTES = ['/admin', '/api/v1/admin'];

/** Simple in-memory rate limiter (per-IP, token bucket) */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 120;  // requests
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';

  // ── 1. Rate limiting ───────────────────────────────────────────────
  if (isRateLimited(ip)) {
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Too many requests. Please slow down.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 2. Security & CORS headers ────────────────────────────────────
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );

  // ── 3. Protected route check ──────────────────────────────────────
  const requiresAuth = matchesPrefix(pathname, AUTHED_ROUTES);
  const requiresAdmin = matchesPrefix(pathname, ADMIN_ROUTES);

  if (requiresAuth || requiresAdmin) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 });
    }

    if (requiresAdmin && payload.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    // Forward user identity to downstream route handlers via headers
    response.headers.set('x-user-id', payload.userId);
    response.headers.set('x-user-email', payload.email);
    response.headers.set('x-user-role', payload.role);
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/checkout/:path*',
    '/api/v1/cart/:path*',
    '/api/v1/orders/:path*',
    '/api/v1/admin/:path*',
    '/api/v1/payments/:path*',
  ],
};
