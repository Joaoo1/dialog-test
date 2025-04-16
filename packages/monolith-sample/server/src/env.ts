import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().regex(/^\d+$/, { message: "PORT must be a number" }),
	NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
