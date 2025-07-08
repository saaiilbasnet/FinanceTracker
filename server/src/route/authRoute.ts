import express from "express";
import { signup, signin } from '../controller/authController';
import asyncErrorHandler from "../services/asyncErrorHandler";

const router = express.Router();

// Wrap async functions with asyncErrorHandler to catch all thrown errors
router.post("/signup", asyncErrorHandler(signup));
router.post("/signin", asyncErrorHandler(signin));





export default router;
