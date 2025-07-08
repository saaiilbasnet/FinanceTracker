import express from "express";
import AuthController from '../controller/authController';
import asyncErrorHandler from "../services/asyncErrorHandler";

const router = express.Router();
router.post("/signup", asyncErrorHandler(AuthController.registerUser));
router.post("/signin", asyncErrorHandler(AuthController.loginUser));






export default router;
