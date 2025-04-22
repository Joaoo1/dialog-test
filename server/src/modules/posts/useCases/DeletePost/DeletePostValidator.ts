import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const params = z.object({
  id: z.string().uuid(),
});

export const DeletePostValidator = validate({ params });

export type DeletePostRequest = Parameters<typeof DeletePostValidator>[0];
