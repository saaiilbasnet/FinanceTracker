import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import Expense from "../database/models/expenseModel";

export const createExpense = async (req: AuthRequest, res: Response) => {
  let { expenseAmount, expenseSource, expenseDate } = req.body;
  const userId = req.user?.id;

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

  // Create and save the expense with userId
  const expense = await Expense.create({
    expenseAmount,
    expenseSource,
    expenseDate,
    userId,
  } as any);

  return res.status(201).json({
    message: "Expense created successfully",
    expense,
  });
};

// Fetch All expenses for logged-in user
export const getExpenses = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  
  const expenses = await Expense.findAll({
    where: { userId },
    order: [['expenseDate', 'DESC']]
  });
  
  res.status(200).json({
    message: "Here is all your expenses",
    expenses,
  });
};

// Get single expense
export const getSingleExpenses = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;
  
  const singleExpense = await Expense.findOne({
    where: { id, userId }
  });
  
  if (!singleExpense) {
    return res.status(404).json({
      message: "No expense with that id or unauthorized!",
    });
  }
  
  return res.status(200).json({
    message: `Expense with id: ${id}`,
    singleExpense,
  });
};

// Edit expense
export const editExpense = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;
  const { expenseAmount, expenseDate, expenseSource } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid id"
    });
  }

  const [updated] = await Expense.update(
    {
      expenseAmount,
      expenseDate,
      expenseSource,
    },
    {
      where: { id, userId },
    }
  );

  if (!updated) {
    return res.status(404).json({
      message: "No expense found or unauthorized",
    });
  }
  
  res.status(200).json({
    message: "Expense Updated Successfully!",
  });
};

// Delete expense
export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid id"
    });
  }

  const deleted = await Expense.destroy({
    where: {
      id,
      userId
    },
  });

  if (!deleted) {
    return res.status(404).json({
      message: "No expense found or unauthorized",
    });
  }

  res.status(200).json({
    message: "Expense deleted successfully",
  });
};