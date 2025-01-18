import { StyleSheet, Text, View } from "react-native";
import ExpenseOutput from "../components/expensesOutput/ExpenseOutput";
import { ExpensesContext } from "../context/expenses-context";
import { useContext } from "react";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpenseOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses found"
    />
  );
};

export default AllExpenses;
const styles = StyleSheet.create({});
