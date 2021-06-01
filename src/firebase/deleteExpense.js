import { db } from "./firebaseConfig.js";

const deleteExpense = (id) => {
  db.collection("gastos").doc(id).delete();
};

export default deleteExpense;
