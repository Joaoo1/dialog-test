import { Router } from 'express';

import { rateLimiter } from './middlewares/RateLimiter';
import { SignInController } from './useCases/SignIn/SignInController';
import { SignInValidator } from './useCases/SignIn/SignInValidator';
import { SignUpController } from './useCases/SignUp/SignUpController';
import { SignUpValidator } from './useCases/SignUp/SignUpValidator';

const authRouter = Router();

authRouter.use(rateLimiter);

const signInController = new SignInController();
const signUpController = new SignUpController();

authRouter.post('/sign-in', SignInValidator, signInController.handle);
authRouter.post('/sign-up', SignUpValidator, signUpController.handle);

export { authRouter };
