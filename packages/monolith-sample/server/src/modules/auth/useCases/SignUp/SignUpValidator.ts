import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const body = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  name: z.string().nonempty(),
});

export const SignUpValidator = validate({ body });

export type SignUpRequest = Parameters<typeof SignUpValidator>[0];
