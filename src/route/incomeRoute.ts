
import express from 'express'
import { createIncome } from '../controller/incomeController'

const router=express.Router();

router.post('/',createIncome);

export default router