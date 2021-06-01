import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
const useGetExp = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [lastExp, setLastExp] = useState(null);
  const [thereIsMore, setThereIsMore] = useState(false);

  const getMoreExp = () => {
    db.collection("gastos")
      .where("uidUser", "==", user.uid)
      .orderBy("date", "desc")
      .limit(10)
      .startAfter(lastExp)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastExp(snapshot.docs[snapshot.docs.length - 1]);
          setExpenses(
            expenses.concat(
              snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id };
              })
            )
          );
        } else {
          setThereIsMore(false);
        }
      });
  };

  useEffect(() => {
    const unsuscribe = db
      .collection("gastos")
      .where("uidUser", "==", user.uid)
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastExp(snapshot.docs[snapshot.docs.length - 1]);
          setThereIsMore(true);
        } else {
          setThereIsMore(false);
        }
        setExpenses(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    return unsuscribe;
  }, [user]);
  return [expenses, getMoreExp, thereIsMore];
};

export default useGetExp;
