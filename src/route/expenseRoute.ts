import express from 'express'
import {createExpense, deleteExpense, editExpense, getExpenses, getSingleExpenses} from '../controller/expenseController'

const router = express.Router();

router.post('/add',createExpense)
router.get('/all',getExpenses)
router.get('/:id',getSingleExpenses)
router.patch("/:id",editExpense)
router.delete("/:id",deleteExpense)

export default router