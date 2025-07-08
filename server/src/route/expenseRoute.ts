import express from 'express'
import { createExpense, deleteExpense, editExpense, getExpenses, getSingleExpenses } from '../controller/expenseController'
import asyncErrorHandler from '../services/asyncErrorHandler';

const router = express.Router();

router.post('/add', asyncErrorHandler(createExpense))
router.get('/all', asyncErrorHandler(getExpenses))
router.get('/:id', asyncErrorHandler(getSingleExpenses))
router.patch('/:id', asyncErrorHandler(editExpense))
router.delete('/:id', asyncErrorHandler(deleteExpense))

export default router
