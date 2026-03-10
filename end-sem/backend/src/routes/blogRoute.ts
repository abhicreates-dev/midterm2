import { Router } from "express";
import { register, login } from "../controller/authController";
import { blogCreate, blog } from "../controller/blogController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create",authMiddleware,blogCreate);
router.get("/allblogs",blog);

export default router;