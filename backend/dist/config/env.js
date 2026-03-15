"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    DB_HOST: zod_1.z.string().optional(),
    DB_USER: zod_1.z.string().optional(),
    DB_PASSWORD: zod_1.z.string().optional(),
    DB_NAME: zod_1.z.string().optional(),
    DB_PORT: zod_1.z
        .string()
        .regex(/^\d+$/, "DB_PORT must be a number")
        .optional()
        .transform((v) => (v ? Number(v) : undefined)),
    DATABASE_URL: zod_1.z.string().url().optional(),
    PORT: zod_1.z
        .string()
        .regex(/^\d+$/, "PORT must be a number")
        .default("3000")
        .transform(Number),
    FRONTEND_URL: zod_1.z.string().url("FRONTEND_URL must be a valid URL"),
    JWT_ACCESS_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_REFRESH_SECRET: zod_1.z.string().min(1, "JWT_REFRESH_SECRET is required"),
    NODE_ENV: zod_1.z.string().optional().default("development"),
}).superRefine((data, ctx) => {
    if (data.DATABASE_URL)
        return;
    if (!data.DB_HOST) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["DB_HOST"],
            message: "DB_HOST is required when DATABASE_URL is not provided",
        });
    }
    if (!data.DB_USER) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["DB_USER"],
            message: "DB_USER is required when DATABASE_URL is not provided",
        });
    }
    if (!data.DB_PASSWORD) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["DB_PASSWORD"],
            message: "DB_PASSWORD is required when DATABASE_URL is not provided",
        });
    }
    if (!data.DB_NAME) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["DB_NAME"],
            message: "DB_NAME is required when DATABASE_URL is not provided",
        });
    }
    if (!data.DB_PORT) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
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
exports.env = parsedEnv.data;
