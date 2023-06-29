import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/", userController.register);
router.post("/auth", userController.auth);
router.post("/logout", userController.logout);

export default router;
