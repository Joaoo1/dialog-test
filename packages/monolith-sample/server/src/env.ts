import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().regex(/^\d+$/, { message: "PORT must be a number" }),
	NODE_ENV: z.enum(["development", "production", "test"]),
	DB_USER: z.string(),
	DB_PASS: z.string(),
	DB_PORT: z.string().regex(/^\d+$/, { message: "DB_PORT must be a number" }),
	DB_HOST: z.string(),
	DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
