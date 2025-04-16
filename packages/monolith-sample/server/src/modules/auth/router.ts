import { Router } from "express";

import { EnsureAuthenticated } from "../../common/middlewares/EnsureAuthenticated";
import { rateLimiter } from "./middlewares/RateLimiter";
import { AuthenticateController } from "./useCases/Authenticate/AuthenticateController";
import { AuthenticateValidator } from "./useCases/Authenticate/AuthenticateValidator";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { CreateUserValidator } from "./useCases/CreateUser/CreateUserValidator";
import { DeleteUserController } from "./useCases/DeleteUser/DeleteUserController";
import { UpdateUserController } from "./useCases/UpdateUser/UpdateUserController";
import { UpdateUserValidator } from "./useCases/UpdateUser/UpdateUserValidator";

const authRouter = Router();

authRouter.use(rateLimiter);

const authenticateController = new AuthenticateController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

authRouter.post(
	"/sign-in",
	AuthenticateValidator,
	authenticateController.handle,
);
authRouter.post("/sign-up", CreateUserValidator, createUserController.handle);

authRouter.use(EnsureAuthenticated);

authRouter.put("/update", UpdateUserValidator, updateUserController.handle);
authRouter.delete("/delete", deleteUserController.handle);

export { authRouter };
