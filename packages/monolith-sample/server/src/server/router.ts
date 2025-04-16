import { Router } from "express";
import { authRouter } from "../modules/auth/router";
import { postsRouter } from "../modules/posts/router";
import { usersRouter } from "../modules/users/router";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/posts", postsRouter);

export { router };
