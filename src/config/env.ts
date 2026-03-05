import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url().min(1),
  // Add other required env variables here
  // NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

type EnvSchema = z.infer<typeof envSchema>;

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
};

let env: EnvSchema;

try {
  env = envSchema.parse(processEnv);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }
  throw error;
}

export { env };
