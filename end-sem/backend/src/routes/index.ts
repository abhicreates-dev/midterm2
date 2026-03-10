import { Router } from "express";
import authRoute from "./authRoute";
import blogRoute from "./blogRoute";

const router = Router();

router.use("/auth", authRoute);

router.use("/blogs", blogRoute);

export default router;