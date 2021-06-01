import { db } from "./firebaseConfig";

const editExpense = ({ id, category, description, amount, date }) => {
  return db
    .collection("gastos")
    .doc(id)
    .update({
      category,
      description,
      amount: Number(amount),
      date,
    });
};
export default editExpense;
