import express from "express";

import AuthController from "../controller/authController";
import asyncErrorHandler from "../services/asyncErrorHandler";

const router = express.Router();

router.route('/register').post(asyncErrorHandler(AuthController.registerUser));
router.route('/login').post(asyncErrorHandler(AuthController.loginUser));


export default router;
