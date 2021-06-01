import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
const useGetMothExp = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const startMonth = getUnixTime(startOfMonth(new Date()));
    const endMonth = getUnixTime(endOfMonth(new Date()));
    if (user) {
      const unsuscribe = db
        .collection("gastos")
        .orderBy("date", "desc")
        .where("date", ">=", startMonth)
        .where("date", "<=", endMonth)
        .where("uidUser", "==", user.uid)
        .onSnapshot((snapshot) => {
          setExpenses(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });
      return unsuscribe;
    }
  }, [user]);

  return expenses;
};

export default useGetMothExp;
