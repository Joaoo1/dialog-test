import validate from "express-zod-safe";
import { z } from "../../../../common/libs/PtZod";

const params = z.object({
	postId: z.string().uuid(),
});

export const TogglePostLikeValidator = validate({ params });

export type TogglePostLikeRequest = Parameters<
	typeof TogglePostLikeValidator
>[0];
