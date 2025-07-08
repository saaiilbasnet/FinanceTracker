import { Request, Response } from "express";
import Income from "../database/models/incomeModel";
import Expense from "../database/models/expenseModel";

export const createIncome = async (req: Request, res: Response) => {
  // Wrapped inside Try catch
  let { incomeAmount, incomeDate, incomeSource } = req.body;

  // Input validation --->
  if (!incomeAmount || !incomeDate || !incomeSource) {
    return res.status(400).json({
      message: "Please provide incomeAmount,incomeDate,incomeSource ",
    });
  }
  incomeAmount = parseFloat(incomeAmount);
  if (isNaN(incomeAmount)) {
    return res.status(400).json({ message: "incomeAmount must be a number" });
  }

  // Income add:
  const income = await Income.create({
    incomeAmount,
    incomeDate,
    incomeSource,
  } as any);

  res.status(200).json({
    message: "Income added successfully",
    income,
  });
};

// Fetch All income:

export const getAllIncomes = async (req: Request, res: Response) => {
  const incomes = await Income.findAll();
  res.status(200).json({
    message: "Heres is all your incomes",
    incomes,
  });
};

// Fetch a single income:

export const getSingleIncome = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const income = await Income.findByPk(id);
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

// Get total income amount:

export const cashInHand = async (req: Request, res: Response) => {
  const totalIncome = await Income.sum('incomeAmount') || 0;
  const totalExpense = await Expense.sum('expenseAmount') || 0;

  //  console.log(' totalIncome:', totalIncome);
  //   console.log(' totalExpense:', totalExpense);

  const cashInHand = totalIncome - totalExpense;
  console.log('Total income:', totalIncome);

  res.status(200).json({
    message: "Total income fetched successfully",
    cashInHand,
  });
};

// Income Update garne logic:

export const editIncome = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      message: "Please provide a valid id"
    });
  }

  // k k update garne ta?:
  const { incomeAmount, incomeDate, incomeSource } = req.body;

  await Income.update(
    {
      incomeAmount,
      incomeDate,
      incomeSource,
    },
    {
      where: {
        id: id,
      },
    }
  );
  if (!id) {
    res.status(400).json({
      message: "No income found",
    });
  }
  res.status(200).json({
    message: "Income updated successfully",
  });
};

// Delete income
export const deleteIncome = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      message: "Please provide a valid id"
    });
  }
  await Income.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    message: "Income deleted successfully",
  });
};
