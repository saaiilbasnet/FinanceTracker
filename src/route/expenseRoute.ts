import express from 'express'
import {createExpense} from '../controller/expenseController'

const router = express.Router();

router.post('/add',createExpense)


export default router