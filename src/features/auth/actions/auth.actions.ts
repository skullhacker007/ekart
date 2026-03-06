'use server';

import { registerSchema, loginSchema } from '../auth.schema';
import { register, login, refreshTokens } from '../auth.service';
import { AppError } from '@/src/lib/errors/AppError';
import type { ActionResult } from '@/src/types/common';

export async function registerAction(formData: FormData): Promise<ActionResult<{ userId: string }>> {
  try {
    const raw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string | undefined,
    };
    const input = registerSchema.parse(raw);
    const result = await register(input);
    return { success: true, data: { userId: result.user.id } };
  } catch (err) {
    if (err instanceof AppError) return { success: false, error: err.message };
    if (err instanceof Error) return { success: false, error: err.message };
    return { success: false, error: 'Registration failed. Please try again.' };
  }
}

export async function loginAction(formData: FormData): Promise<ActionResult<{ accessToken: string }>> {
  try {
    const raw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const input = loginSchema.parse(raw);
    const result = await login(input);
    return { success: true, data: { accessToken: result.tokens.accessToken } };
  } catch (err) {
    if (err instanceof AppError) return { success: false, error: err.message };
    return { success: false, error: 'Login failed. Please try again.' };
  }
}