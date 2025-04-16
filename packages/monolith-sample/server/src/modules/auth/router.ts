import { Router } from 'express';

import { rateLimiter } from './middlewares/RateLimiter';
import { AuthenticateController } from './useCases/Authenticate/AuthenticateController';
import { AuthenticateValidator } from './useCases/Authenticate/AuthenticateValidator';

const authRouter = Router();

authRouter.use(rateLimiter);

const authenticateController = new AuthenticateController();

authRouter.post(
  '/sign-in',
  AuthenticateValidator,
  authenticateController.handle
);

export { authRouter };
