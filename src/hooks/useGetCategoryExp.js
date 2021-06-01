import { useEffect, useState } from "react";
import useGetMonthExp from "./useGetMothExp";

const useGetCategoryExp = () => {
  const [expByCategory, setExpByCategory] = useState([]);
  const exp = useGetMonthExp();

  useEffect(() => {
    const SumExp = exp.reduce(
      (objResultante, objetoActual) => {
        const categoriaActual = objetoActual.category;
        const cantidadActual = objetoActual.amount;
        objResultante[categoriaActual] += cantidadActual;
        return objResultante;
      },
      {
        comida: 0,
        "cuentas y pagos": 0,
        hogar: 0,
        transporte: 0,
        ropa: 0,
        "salud e higiene": 0,
        compras: 0,
        diversion: 0,
      }
    );

    setExpByCategory(
      Object.keys(SumExp).map((item) => {
        return { category: item, amount: SumExp[item] };
      })
    );
  }, [exp, setExpByCategory]);

  return expByCategory;
};

export default useGetCategoryExp;
