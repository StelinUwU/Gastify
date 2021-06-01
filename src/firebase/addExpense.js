import { db } from "./firebaseConfig";

const addExpense = ({ category, description, amount, date, uidUser }) => {
  return db.collection("gastos").add({
    category,
    description,
    amount: Number(amount),
    date,
    uidUser,
  });
};
export default addExpense;
