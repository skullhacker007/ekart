/**
 * Auth Service — Core business logic for user authentication.
 * All database access goes through Prisma directly (repository pattern
 * applied at service level for auth to keep it self-contained).
 */
import bcrypt from 'bcryptjs';
import { prisma } from '@/src/lib/db/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/src/lib/auth/jwt';
import { AppError, ConflictError, UnauthorizedError } from '@/src/lib/errors/AppError';
import type { RegisterInput, LoginInput } from './auth.schema';

const SALT_ROUNDS = 12;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  tokens: AuthTokens;
}

/** Register a new user */
export async function register(input: RegisterInput): Promise<AuthResult> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ConflictError('An account with this email already exists');

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      name: input.name ?? null,
    },
    select: { id: true, email: true, name: true },
  });

  const tokens = await issueTokens(user);
  return { user, tokens };
}

/** Login with email/password */
export async function login(input: LoginInput): Promise<AuthResult> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true, email: true, name: true, password: true },
  });

  if (!user) throw new UnauthorizedError('Invalid email or password');

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new UnauthorizedError('Invalid email or password');

  const { password: _, ...safeUser } = user;
  const tokens = await issueTokens(safeUser);
  return { user: safeUser, tokens };
}

/** Rotate tokens using a valid refresh token */
export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) throw new UnauthorizedError('Invalid or expired refresh token');

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true },
  });
  if (!user) throw new UnauthorizedError('User no longer exists');

  return issueTokens({ id: user.id, email: user.email, name: null });
}

/** Internal helper to sign both tokens */
async function issueTokens(user: { id: string; email: string; name: string | null }): Promise<AuthTokens> {
  const payload = { userId: user.id, email: user.email, role: 'USER' as const };
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload),
  ]);
  return { accessToken, refreshToken };
}
