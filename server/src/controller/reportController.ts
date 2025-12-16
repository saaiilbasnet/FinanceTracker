import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import Income from "../database/models/incomeModel";
import Expense from "../database/models/expenseModel";
import { Op } from "sequelize";
import sequelize from "../database/connection";

class ReportController {
  // GET /api/reports/summary - Overall financial summary
  static async getSummary(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { startDate, endDate } = req.query;

      // Build date filter
      const dateFilter: any = { userId };
      if (startDate && endDate) {
        dateFilter.createdAt = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
        };
      }

      const totalIncome = await Income.sum('incomeAmount', { where: dateFilter }) || 0;
      const totalExpense = await Expense.sum('expenseAmount', { where: dateFilter }) || 0;
      const balance = totalIncome - totalExpense;

      const incomeCount = await Income.count({ where: dateFilter });
      const expenseCount = await Expense.count({ where: dateFilter });

      res.status(200).json({
        totalIncome,
        totalExpense,
        balance,
        incomeCount,
        expenseCount,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // GET /api/reports/category-breakdown - Breakdown by source/category
  static async getCategoryBreakdown(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { startDate, endDate } = req.query;

      const dateFilter: any = { userId };
      if (startDate && endDate) {
        dateFilter.createdAt = {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
        };
      }

      // Income by source
      const incomeBySource = await Income.findAll({
        where: dateFilter,
        attributes: [
          'incomeSource',
          [sequelize.fn('SUM', sequelize.col('incomeAmount')), 'total'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['incomeSource'],
        raw: true
      });

      // Expense by source
      const expenseBySource = await Expense.findAll({
        where: dateFilter,
        attributes: [
          'expenseSource',
          [sequelize.fn('SUM', sequelize.col('expenseAmount')), 'total'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['expenseSource'],
        raw: true
      });

      res.status(200).json({
        incomeBySource,
        expenseBySource
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // GET /api/reports/monthly-trends - Monthly income/expense trends
  static async getMonthlyTrends(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { year } = req.query;
      const targetYear = year ? parseInt(year as string) : new Date().getFullYear();

      // Income by month
      const incomeByMonth = await Income.findAll({
        where: {
          userId,
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "incomeDate"')), targetYear)
          ]
        },
        attributes: [
          [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "incomeDate"')), 'month'],
          [sequelize.fn('SUM', sequelize.col('incomeAmount')), 'total']
        ],
        group: [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "incomeDate"'))],
        order: [[sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "incomeDate"')), 'ASC']],
        raw: true
      });

      // Expense by month
      const expenseByMonth = await Expense.findAll({
        where: {
          userId,
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "expenseDate"')), targetYear)
          ]
        },
        attributes: [
          [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "expenseDate"')), 'month'],
          [sequelize.fn('SUM', sequelize.col('expenseAmount')), 'total']
        ],
        group: [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "expenseDate"'))],
        order: [[sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "expenseDate"')), 'ASC']],
        raw: true
      });

      // Format data for all 12 months
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const monthlyData = months.map(month => {
        const income = incomeByMonth.find((item: any) => parseInt(item.month) === month);
        const expense = expenseByMonth.find((item: any) => parseInt(item.month) === month);

        return {
          month,
          monthName: new Date(targetYear, month - 1).toLocaleString('default', { month: 'short' }),
          income: income ? parseFloat((income as any).total) : 0,
          expense: expense ? parseFloat((expense as any).total) : 0,
        };
      });

      res.status(200).json({ year: targetYear, data: monthlyData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  // GET /api/reports/recent-transactions - Recent income and expenses
  static async getRecentTransactions(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { limit = 10 } = req.query;

      const recentIncome = await Income.findAll({
        where: { userId },
        order: [['incomeDate', 'DESC']],
        limit: parseInt(limit as string),
      });

      const recentExpenses = await Expense.findAll({
        where: { userId },
        order: [['expenseDate', 'DESC']],
        limit: parseInt(limit as string),
      });

      res.status(200).json({
        recentIncome,
        recentExpenses
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default ReportController;