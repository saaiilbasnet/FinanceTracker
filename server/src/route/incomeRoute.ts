
import express from 'express'
import { cashInHand, createIncome, deleteIncome, editIncome, getAllIncomes, getSingleIncome } from '../controller/incomeController'

const router=express.Router();

router.post('/new',createIncome);
router.get('/all', getAllIncomes);
router.get('/total', cashInHand);
router.get('/:id', getSingleIncome);
router.patch('/:id', editIncome);
router.delete('/:id', deleteIncome);

export default router