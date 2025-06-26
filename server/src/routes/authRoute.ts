
import express from 'express'
import AuthController from '../controllers/authController'
import asyncErrorHandler from '../services/asyncErrorHandler';
const router = express.Router()


router.route("/register").post(asyncErrorHandler(AuthController.registerUser));
router.route("/login").post(asyncErrorHandler(AuthController.loginUser));

export default router