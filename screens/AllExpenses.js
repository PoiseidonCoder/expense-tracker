import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseOutput from "../components/expensesOutput/ExpenseOutput";

const AllExpenses = () => {
  return <ExpenseOutput expensesPeriod="Total" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
