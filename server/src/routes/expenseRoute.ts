import express from 'express'
import {createExpense, deleteExpense, editExpense, getExpenses, getSingleExpenses} from '../controller/expenseController'
import asyncErrorHandler from '../services/asyncErrorHandler';
import authMiddleware from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/add', authMiddleware, asyncErrorHandler(createExpense));
router.get('/all', authMiddleware, asyncErrorHandler(getExpenses));
router.get('/:id', authMiddleware, asyncErrorHandler(getSingleExpenses));
router.patch('/:id', authMiddleware, asyncErrorHandler(editExpense));
router.delete('/:id', authMiddleware, asyncErrorHandler(deleteExpense));

export default router