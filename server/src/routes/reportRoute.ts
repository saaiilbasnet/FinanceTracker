import express from "express";
import ReportController from "../controller/reportController";
import authMiddleware from "../middlewares/authMiddleware";
import asyncErrorHandler from "../services/asyncErrorHandler";

const router = express.Router();

// All routes require authentication
router.get('/summary', authMiddleware, asyncErrorHandler(ReportController.getSummary));
router.get('/category-breakdown', authMiddleware, asyncErrorHandler(ReportController.getCategoryBreakdown));
router.get('/monthly-trends', authMiddleware, asyncErrorHandler(ReportController.getMonthlyTrends));
router.get('/recent-transactions', authMiddleware, asyncErrorHandler(ReportController.getRecentTransactions));

export default router;