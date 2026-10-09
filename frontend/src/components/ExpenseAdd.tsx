import { useForm } from "react-hook-form";
import { ExpenseFormSchema, type NewExpense } from "../types/Expense";

interface ExpenseAddProps {
    expenseAdd: (expense: NewExpense) => Promise<void>;
}

function ExpenseAdd({ expenseAdd }: ExpenseAddProps) {
  const { register, handleSubmit, reset} = useForm<NewExpense>();

  const onSubmit = async (e: NewExpense) => {
    console.log(e);
    const result = ExpenseFormSchema.safeParse({
      description: e.description,
      amount: e.amount,
      payer: e.payer,
      date: e.date,
    })

    if (!result.success) {
      console.log(result.error.format);
    } else {
      await expenseAdd(e);
    } reset();
  }

  return <div>
    <h2>Add expense</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("description")} placeholder="Description" />
      <input type="text" {...register("payer")} placeholder="Payer" />
      <input type="number" {...register("amount", { valueAsNumber: true})} placeholder="Amount" />
      <input type="date" {...register("date")} placeholder="Date" />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  </div>;
}

export default ExpenseAdd;