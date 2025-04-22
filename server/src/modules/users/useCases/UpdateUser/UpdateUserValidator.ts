import validate from 'express-zod-safe';
import { z } from '../../../../common/libs/PtZod';

const body = z
  .object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    currentPassword: z.string().optional(),
    password: z
      .string()
      .min(8, { message: 'Mínimo 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Ao menos uma letra maiúscula' })
      .regex(/[0-9]/, { message: 'Ao menos um número' })
      .optional()
      .or(z.literal('')),
  })
  .superRefine(({ password, currentPassword }, ctx) => {
    if (!!currentPassword && !password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Nova senha é obrigatória quando a senha atual é informada',
        path: ['password'],
      });
    }
  });

export const UpdateUserValidator = validate({ body });

export type UpdateUserRequest = Parameters<typeof UpdateUserValidator>[0];
