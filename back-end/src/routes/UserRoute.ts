import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.post("/user", UserController.createUser);
router.get("/user", UserController.getUser);
router.get("/user/:username", UserController.getUserByUsername);
router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router