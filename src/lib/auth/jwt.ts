/**
 * JWT utilities using `jose` (Web Crypto API — works in Next.js Edge middleware).
 * Access tokens: short-lived (15 min).
 * Refresh tokens: long-lived (7 days).
 */
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET env var is missing');
if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET env var is missing');

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

/** Sign a short-lived access token */
export async function signAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_EXPIRES)
    .sign(ACCESS_SECRET);
}

/** Sign a long-lived refresh token */
export async function signRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_EXPIRES)
    .sign(REFRESH_SECRET);
}

/** Verify an access token — returns payload or null */
export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

/** Verify a refresh token — returns payload or null */
export async function verifyRefreshToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}
