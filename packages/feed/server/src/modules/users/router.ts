import { Router } from 'express';

import { EnsureAuthenticated } from '../../common/middlewares/EnsureAuthenticated';
import { DeleteUserController } from './useCases/DeleteUser/DeleteUserController';
import { GetUserController } from './useCases/GetUser/GetUserController';
import { UpdateUserController } from './useCases/UpdateUser/UpdateUserController';
import { UpdateUserValidator } from './useCases/UpdateUser/UpdateUserValidator';

const usersRouter = Router();

const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRouter.use(EnsureAuthenticated);

usersRouter.get('/', getUserController.handle);
usersRouter.put('/', UpdateUserValidator, updateUserController.handle);
usersRouter.delete('/', deleteUserController.handle);

export { usersRouter };
