import { Router } from "express";
import { authRouter } from "../modules/auth/router";
import { postsRouter } from "../modules/posts/router";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/posts", postsRouter);

export { router };
