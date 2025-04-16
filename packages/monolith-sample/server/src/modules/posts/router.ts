import { Router } from "express";
import { EnsureAuthenticated } from "../../common/middlewares/EnsureAuthenticated";
import { CreatePostController } from "./useCases/CreatePost/CreatePostController";
import { CreatePostValidator } from "./useCases/CreatePost/CreatePostValidator";

const postsRouter = Router();

const createPostController = new CreatePostController();

postsRouter.use(EnsureAuthenticated);

postsRouter.post("/", CreatePostValidator, createPostController.handle);

export { postsRouter };
