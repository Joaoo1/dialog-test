import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const body = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export const UpdateUserValidator = validate({ body });

export type UpdateUserRequest = Parameters<typeof UpdateUserValidator>[0];
