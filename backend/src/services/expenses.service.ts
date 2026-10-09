import fs from "fs";
import type { Expense, NewExpense } from "../types/expense.ts";
import { db } from "../prisma/db.ts";

export class ExpensesService {
  public static async getExpenses(): Promise<Expense[]> {
    try {
      const rows = await db.orm.public.Expense.all();
      const expenses = rows.map((row: any) => ({
        id: row.id.toString(),
        date: row.date,
        amount: row.amount,
        description: row.description,
        payer: row.payer,
      }));
      return expenses;
    } catch (error) {
      console.error("Error getting expenses:", error);
      throw error;
    }
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense> {
    try {
      const expense = await db.orm.public.Expense.create(newExpense);
      return {
        id: expense.id.toString(),
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
        payer: expense.payer,
      };
    } catch (error) {
      console.error("Error adding expenses:", error);
      throw error;
    }
  }
}