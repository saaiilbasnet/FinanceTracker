import express from 'express'
import { cashInHand, createIncome, deleteIncome, editIncome, getAllIncomes, getSingleIncome } from '../controller/incomeController'
import asyncErrorHandler from '../services/asyncErrorHandler';

const router=express.Router();

router.post('/new', asyncErrorHandler(createIncome));
router.get('/all', asyncErrorHandler(getAllIncomes));
router.get('/total', asyncErrorHandler(cashInHand));
router.get('/:id', asyncErrorHandler(getSingleIncome));
router.patch('/:id', asyncErrorHandler(editIncome));
router.delete('/:id', asyncErrorHandler(deleteIncome));

export default router
