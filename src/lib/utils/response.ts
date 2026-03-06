/**
 * Standardized API response helpers.
 * All server actions and API routes should use these helpers
 * so UI always receives a consistent { success, data, error } shape.
 */
import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; statusCode?: number };

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: message, statusCode: status },
    { status }
  );
}
