
import express from 'express'
import { createIncome, deleteIncome, editIncome, getAllIncomes, getSingleIncome } from '../controller/incomeController'

const router=express.Router();

router.post('/new',createIncome);
router.get('/all', getAllIncomes);
router.get('/:id', getSingleIncome);
router.put('/:id', editIncome);
router.delete('/:id', deleteIncome);

export default router