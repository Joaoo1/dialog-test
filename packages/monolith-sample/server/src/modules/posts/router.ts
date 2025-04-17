import { Router } from 'express';
import { EnsureAuthenticated } from '../../common/middlewares/EnsureAuthenticated';
import { CreatePostController } from './useCases/CreatePost/CreatePostController';
import { CreatePostValidator } from './useCases/CreatePost/CreatePostValidator';
import { DeletePostController } from './useCases/DeletePost/DeletePostController';
import { DeletePostValidator } from './useCases/DeletePost/DeletePostValidator';
import { ListPostsController } from './useCases/ListPosts/ListPostsController';
import { TogglePostLikeController } from './useCases/TogglePostLike/TogglePostLikeController';
import { TogglePostLikeValidator } from './useCases/TogglePostLike/TogglePostLikeValidator';

const postsRouter = Router();

const listPostsController = new ListPostsController();
const createPostController = new CreatePostController();
const deletePostController = new DeletePostController();
const togglePostLikeController = new TogglePostLikeController();

postsRouter.get('/', listPostsController.handle);

postsRouter.use(EnsureAuthenticated);

postsRouter.post('/', CreatePostValidator, createPostController.handle);
postsRouter.delete('/:id', DeletePostValidator, deletePostController.handle);
postsRouter.post(
  '/:postId/like',
  TogglePostLikeValidator,
  togglePostLikeController.handle
);

export { postsRouter };
