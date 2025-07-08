import { Request, Response } from "express";
import Expense from "../database/models/expenseModel";

export const createExpense = async (req: Request, res: Response) => {
  try {
    let { expenseAmount, expenseSource, expenseDate } = req.body;

    // Validation for missing fields
    if (!expenseAmount || !expenseSource || !expenseDate) {
      return res.status(400).json({
        message: "Please provide expenseAmount, expenseSource, and expenseDate",
      });
    }

    expenseAmount = parseFloat(expenseAmount);
    // Validate if expenseAmount is a number
    if (isNaN(expenseAmount)) {
      return res.status(400).json({
        message: "Invalid expense amount",
      });
    }
    // Create and save the expense in the database
    const expense = await Expense.create({
      expenseAmount,
      expenseSource,
      expenseDate,
    } as any);

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred!",
      error,
    });
  }
};

// Fetch All expenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({
      message: "Heres is all your expenses",
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occured",
      error,
    });
  }
};

// Get single expenses
export const getSingleExpenses = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const singleExpense = await Expense.findByPk(id);
    if (!singleExpense) {
      return res.status(400).json({
        message: "No expense with that id!!!",
      });
    } else {
      return res.status(200).json({
        message: `Income with id: ${id}`,
        singleExpense,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error,
    });
  }
};

//Edit expenses
export const editExpense = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    // Update garnna milne kura haru:
    const { expenseAmount, expenseDate, expenseSource } = req.body;

    await Expense.update(
      {
        expenseAmount,
        expenseDate,
        expenseSource,
      },
      {
        where: { id },
      }
    );
    if (!id) {
      res.status(400).json({
        message: "No id found",
      });
    }
    res.status(200).json({
      message: "Expense Updated Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occured",
      error,
    });
  }
};

// delete expense:
export const deleteExpense=async(req:Request,res:Response)=>{
    try{
    const id = parseInt(req.params.id);
      if (!id) {
      res.status(400).json({
        message: "No id found",
      });
    }
   await Expense.destroy(
       {
         where:{
            id,
       },
       }),
          res.status(200).json({
    message: "Income deleted successfully",
  });
 }catch(error){
  
    res.status(500).json({
      message: "Error occured",
      error,
    });
    }
   
}
