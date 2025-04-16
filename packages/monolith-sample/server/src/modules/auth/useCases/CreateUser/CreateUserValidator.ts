import validate from "express-zod-safe";
import { z } from "../../../../common/libs/PtZod";

const body = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
	name: z.string().nonempty(),
});

export const CreateUserValidator = validate({ body });

export type CreateUserRequest = Parameters<typeof CreateUserValidator>[0];
