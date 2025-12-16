import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import Income from "../database/models/incomeModel";
import Expense from "../database/models/expenseModel";

export const createIncome = async (req: AuthRequest, res: Response) => {
  let { incomeAmount, incomeDate, incomeSource } = req.body;
  const userId = req.user?.id;

  // Input validation
  if (!incomeAmount || !incomeDate || !incomeSource) {
    return res.status(400).json({
      message: "Please provide incomeAmount, incomeDate, incomeSource",
    });
  }
  
  incomeAmount = parseFloat(incomeAmount);
  if (isNaN(incomeAmount)) {
    return res.status(400).json({ message: "incomeAmount must be a number" });
  }

  // Income add with userId
  const income = await Income.create({
    incomeAmount,
    incomeDate,
    incomeSource,
    userId,
  } as any);

  res.status(200).json({
    message: "Income added successfully",
    income,
  });
};

// Fetch All income for logged-in user
export const getAllIncomes = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const incomes = await Income.findAll({
    where: { userId },
    order: [['incomeDate', 'DESC']]
  });
  
  res.status(200).json({
    message: "Here is all your incomes",
    incomes,
  });
};

// Fetch a single income
export const getSingleIncome = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;

  const income = await Income.findOne({
    where: { id, userId }
  });
  
  if (!income) {
    return res.status(404).json({
      message: "No income found, Try different id",
    });
  }
  
  res.status(200).json({
    message: "Income found",
    income,
  });
};

// Get total income amount for user
export const cashInHand = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  
  const totalIncome = await Income.sum('incomeAmount', { where: { userId } }) || 0;
  const totalExpense = await Expense.sum('expenseAmount', { where: { userId } }) || 0;

  const cashInHand = totalIncome - totalExpense;

  res.status(200).json({
    message: "Total income fetched successfully",
    cashInHand,
  });
};

// Income Update
export const editIncome = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;
  
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Please provide a valid id"
    });
  }

  const { incomeAmount, incomeDate, incomeSource } = req.body;

  const [updated] = await Income.update(
    {
      incomeAmount,
      incomeDate,
      incomeSource,
    },
    {
      where: {
        id,
        userId
      },
    }
  );

  if (!updated) {
    return res.status(404).json({
      message: "No income found or unauthorized",
    });
  }
  
  res.status(200).json({
    message: "Income updated successfully",
  });
};

// Delete income
export const deleteIncome = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;
  
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Please provide a valid id"
    });
  }

  const deleted = await Income.destroy({
    where: {
      id,
      userId
    },
  });

  if (!deleted) {
    return res.status(404).json({
      message: "No income found or unauthorized",
    });
  }

  res.status(200).json({
    message: "Income deleted successfully",
  });
};