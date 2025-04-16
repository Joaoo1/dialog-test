import validate from "express-zod-safe";
import { z } from "../../../../common/libs/PtZod";

const body = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
});

export const SignInValidator = validate({ body });

export type SignInRequest = Parameters<typeof SignInValidator>[0];
