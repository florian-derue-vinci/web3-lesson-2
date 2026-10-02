import { useCallback, useEffect, useState } from 'react';
import type { Expense, NewExpense } from '../types/Expense';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function fetchAllExpenses(): Promise<Expense[]> {
  return fetch(`${API_BASE_URL}/api/expenses`)
    .then((res) => res.json())
    .then((data) => (Array.isArray(data) ? (data as Expense[]) : []))
    .catch((error) => {
      console.error("Error getting expenses:", error);
      return [] as Expense[];
    });
}

async function postExpense(newExpense: NewExpense): Promise<Expense | null> {
  return fetch(`${API_BASE_URL}/api/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpense),
  })
    .then((res) => res.json())
    .then((data) => data as Expense)
    .catch((error) => {
      console.error("Error adding expense:", error);
      return null;
    });
}

async function postResetExpenses(): Promise<Expense[]> {
  return fetch(`${API_BASE_URL}/api/expenses/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: "{}",
  })
    .then((res) => res.json())
    .then((data) => (Array.isArray(data) ? (data as Expense[]) : []))
    .catch((error) => {
      console.error("Error resetting expenses:", error);
      return [] as Expense[];
    });
}

function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    fetchAllExpenses()
      .then(setExpenses)
      .finally(() => setLoading(false));
  }, []);

  const addExpense = useCallback(async (newExpense: NewExpense): Promise<void> => {
    const created = await postExpense(newExpense);
    if (created) {
      setExpenses((prev) => [...prev, created]);
    }
  }, []);

  const resetExpenses = useCallback(async (): Promise<void> => {
    const updated = await postResetExpenses();
    setExpenses(updated);
  }, []);

  return { expenses, loading, addExpense, resetExpenses };
}

export default useExpenses;