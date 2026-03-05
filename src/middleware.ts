import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add auth logic here
  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*'],
};
