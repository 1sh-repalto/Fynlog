import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DB_HOST: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_PORT: z
    .string()
    .regex(/^\d+$/, "DB_PORT must be a number")
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),
  DATABASE_URL: z.string().url().optional(),
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number")
    .default("3000")
    .transform(Number),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  NODE_ENV: z.string().optional().default("development"),
}).superRefine((data, ctx) => {
  if (data.DATABASE_URL) return;

  if (!data.DB_HOST) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["DB_HOST"],
      message: "DB_HOST is required when DATABASE_URL is not provided",
    });
  }
  if (!data.DB_USER) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["DB_USER"],
      message: "DB_USER is required when DATABASE_URL is not provided",
    });
  }
  if (!data.DB_PASSWORD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["DB_PASSWORD"],
      message: "DB_PASSWORD is required when DATABASE_URL is not provided",
    });
  }
  if (!data.DB_NAME) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["DB_NAME"],
      message: "DB_NAME is required when DATABASE_URL is not provided",
    });
  }
  if (!data.DB_PORT) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["DB_PORT"],
      message: "DB_PORT is required when DATABASE_URL is not provided",
    });
  }
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
