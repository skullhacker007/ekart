import { NextRequest } from 'next/server';
import { loginSchema } from '@/src/features/auth/auth.schema';
import { login } from '@/src/features/auth/auth.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { ZodError } from 'zod';

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful — returns access and refresh tokens
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = loginSchema.parse(body);
    const result = await login(input);
    return successResponse({ user: result.user, tokens: result.tokens });
  } catch (err) {
    if (err instanceof ZodError) return errorResponse(err.issues[0].message, 400);
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Login failed', 500);
  }
}
