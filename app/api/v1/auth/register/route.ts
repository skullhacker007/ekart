import { NextRequest } from 'next/server';
import { registerSchema } from '@/src/features/auth/auth.schema';
import { register } from '@/src/features/auth/auth.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { ZodError } from 'zod';

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user account
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
 *                 minLength: 8
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email already in use
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = registerSchema.parse(body);
    const result = await register(input);
    return successResponse(
      { user: result.user, tokens: result.tokens },
      201
    );
  } catch (err) {
    if (err instanceof ZodError) return errorResponse(err.issues[0].message, 400);
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Registration failed', 500);
  }
}
