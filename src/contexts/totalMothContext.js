import React, { useState, useEffect, useContext } from "react";
import useGetMothExp from "../hooks/useGetMothExp";
const TotalMonthContext = React.createContext();

const useTotalMonth = () => useContext(TotalMonthContext);

const TotalMonthProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const gastos = useGetMothExp();
  useEffect(() => {
    let acumulado = 0;
    gastos.forEach((gasto) => {
      acumulado += gasto.amount;
    });
    setTotal(acumulado);
  }, [gastos]);
  return (
    <TotalMonthContext.Provider value={{ total: total }}>
      {children}
    </TotalMonthContext.Provider>
  );
};

export { TotalMonthProvider, useTotalMonth };
