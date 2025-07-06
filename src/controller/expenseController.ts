import { Request, Response } from "express";
import Expense from '../database/models/expenseModel'

export const createExpense= (req:Request,res:Response)=>{

    try{
        const {expenseAmount,expenseSource,expenseDate}=req.body 

        if(!expenseAmount && !expenseSource && !expenseDate){
            return res.status(400).json({
                 message:"Please provide expneseAmount,expenseSource,expenseDate"
            })
        }

    }catch(error){
        res.status(500).json({
            message:"Error occured! ",error
        })
    }

    // if(isNaN(expenseAmount)){

    // }

    



}