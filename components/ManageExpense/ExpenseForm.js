import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import { useContext, useState } from "react";
import Button from "../UI/Button";
import { ExpensesContext } from "../../context/expenses-context";
import { useNavigation } from "@react-navigation/native";
import getFormattedDate from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";
const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const {} = useNavigation();
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() || "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description || "",
      isValid: true,
    },
  });

  const amountChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //
      // Alert.alert(
      //   "Invalid input",
      //   "Please enter a valid amount, date and description",
      //   [{ text: "Okay" }]
      // );
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values please check your entered data
        </Text>
      )}
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: amountChangedHandler.bind(this, "date"),
            value: inputs.date.value,
            inValid: inputs.date.isValid,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autucorrect: false ....default is true
          onChangeText: amountChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          isValid: inputs.description.isValid,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 80,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginVertical: 8,
  },
});
