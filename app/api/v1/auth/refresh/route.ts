import { NextRequest } from 'next/server';
import { refreshTokenSchema } from '@/src/features/auth/auth.schema';
import { refreshTokens } from '@/src/features/auth/auth.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { ZodError } from 'zod';

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Rotate access token using a valid refresh token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access and refresh tokens issued
 *       401:
 *         description: Invalid or expired refresh token
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = refreshTokenSchema.parse(body);
    const tokens = await refreshTokens(refreshToken);
    return successResponse(tokens);
  } catch (err) {
    if (err instanceof ZodError) return errorResponse(err.issues[0].message, 400);
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Token refresh failed', 500);
  }
}
