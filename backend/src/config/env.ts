import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DB_HOST: z.string().min(1, "DB_HOST is required"),
  DB_USER: z.string().min(1, "DB_USER is required"),
  DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
  DB_NAME: z.string().min(1, "DB_NAME is required"),
  DB_PORT: z
    .string()
    .regex(/^\d+$/, "DB_PORT must be a number")
    .transform(Number),
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number")
    .default("3000")
    .transform(Number),
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  NODE_ENV: z.string().optional().default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
