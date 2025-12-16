import express from 'express'
import { cashInHand, createIncome, deleteIncome, editIncome, getAllIncomes, getSingleIncome } from '../controller/incomeController'
import asyncErrorHandler from '../services/asyncErrorHandler';
import authMiddleware from '../middlewares/authMiddleware'; 

const router=express.Router();

router.post('/new', authMiddleware, asyncErrorHandler(createIncome));
router.get('/all', authMiddleware, asyncErrorHandler(getAllIncomes));
router.get('/total', authMiddleware, asyncErrorHandler(cashInHand));
router.get('/:id', authMiddleware, asyncErrorHandler(getSingleIncome));
router.patch('/:id', authMiddleware, asyncErrorHandler(editIncome));
router.delete('/:id', authMiddleware, asyncErrorHandler(deleteIncome));

export default router