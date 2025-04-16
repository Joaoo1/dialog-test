import { Router } from "express";

import { rateLimiter } from "./middlewares/RateLimiter";
import { AuthenticateController } from "./useCases/Authenticate/AuthenticateController";
import { AuthenticateValidator } from "./useCases/Authenticate/AuthenticateValidator";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { CreateUserValidator } from "./useCases/CreateUser/CreateUserValidator";

const authRouter = Router();

authRouter.use(rateLimiter);

const authenticateController = new AuthenticateController();
const createUserController = new CreateUserController();

authRouter.post(
	"/sign-in",
	AuthenticateValidator,
	authenticateController.handle,
);

authRouter.post("/sign-up", CreateUserValidator, createUserController.handle);

export { authRouter };
