import { NextResponse } from 'next/server';
import swaggerSpec from '@/src/lib/swagger/swagger';

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Returns the OpenAPI JSON specification
 *     tags: [Docs]
 *     responses:
 *       200:
 *         description: OpenAPI spec in JSON format
 */
export async function GET() {
  return NextResponse.json(swaggerSpec);
}
