import React, { useContext } from "react";
import ExpenseOutput from "../components/expensesOutput/ExpenseOutput";
import { ExpensesContext } from "../context/expenses-context";
import { getDateMinusDays } from "../utils/date";

export default RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpenseOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses in the last 7 days"
    />
  );
};
