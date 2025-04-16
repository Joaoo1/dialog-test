import validate from "express-zod-safe";
import { z } from "../../../../common/libs/PtZod";

const body = z.object({
	text: z.string().nonempty(),
});

export const CreatePostValidator = validate({ body });

export type CreatePostRequest = Parameters<typeof CreatePostValidator>[0];
