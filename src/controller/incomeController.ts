

// Here goes income logic:

import { Request, Response } from "express";
import Income from "../database/models/incomeModel";

export const createIncome=async(req:Request,res:Response)=>{

  // Wrapped inside Try catch 
  try{
  const {incomeAmount,incomeDate,incomeSource}=req.body;

  // Input validation --->
  if(!incomeAmount || !incomeDate || !incomeSource ){
    return res.status(400).json({
message:"Please provide incomeAmount,incomeDate,incomeSource "
    })
  }

  // Income add:
    const income=await Income.create({
      incomeAmount,incomeDate,incomeSource
    }as any) 

    res.status(200).json({
      message:"Income added successfully"
      ,income
    });
  }catch(error){
 console.error("Error creating income:", error);
    res.status(500).json({
      message: " error while creating income",
  })
}


}

// Fetch income:

export const getAllIncomes=async(req:Request,res:Response)=>{
  try{
    const incomes=await Income.findAll();
    res.status(200).json({
      message:incomes
    }) 
  }catch(error){
    res.status(500).json({
      message:"Error occured",error
    })
  }


  
}