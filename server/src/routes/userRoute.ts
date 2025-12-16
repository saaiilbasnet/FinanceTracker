import express from "express";
import UserController from "../controller/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();


router.get("/me", authMiddleware, UserController.getProfile);
router.put("/me", authMiddleware, UserController.updateProfile);
router.put("/change-password", authMiddleware, UserController.changePassword);
router.delete("/me", authMiddleware, UserController.deleteAccount);

export default router;
