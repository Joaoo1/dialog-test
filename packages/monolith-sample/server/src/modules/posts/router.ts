import { Router } from "express";
import { EnsureAuthenticated } from "../../common/middlewares/EnsureAuthenticated";
import { CreatePostController } from "./useCases/CreatePost/CreatePostController";
import { CreatePostValidator } from "./useCases/CreatePost/CreatePostValidator";
import { DeletePostController } from "./useCases/DeletePost/DeletePostController";
import { DeletePostValidator } from "./useCases/DeletePost/DeletePostValidator";

const postsRouter = Router();

const createPostController = new CreatePostController();
const deletePostController = new DeletePostController();

postsRouter.use(EnsureAuthenticated);

postsRouter.post("/", CreatePostValidator, createPostController.handle);
postsRouter.delete("/:id", DeletePostValidator, deletePostController.handle);

export { postsRouter };
