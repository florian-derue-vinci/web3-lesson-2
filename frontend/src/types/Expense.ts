import z from 'zod';

export interface Expense {
  id: string;
  date: string;
  description: string;
  payer: string;
  amount: number;
}
export type NewExpense = Omit<Expense, 'id'>;

export const ExpenseFormSchema = z.object({
  description: z.string().min(1, "Description is required").max(200, 'Max 200 chars'),
  amount: z.number().positive("Amount must be positive"),
  payer: z.enum(['Alice', 'Bob'], { error: () => ({ message: 'Payer must be Alice or Bob'})}),
  date: z.string().min(1, "Date is required"),
}); 