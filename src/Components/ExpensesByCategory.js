import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../Elements/Header";
import BackButton from "../Elements/BackButton";
import TotalExpense from "./TotalExpense";
import useGetCategoryExp from "../hooks/useGetCategoryExp";
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
} from "../Elements/ListElements";
import CategoryIcon from "../Elements/CategoryIcon";
import convertirAMoneda from "../functions/convertirAMoneda";
const ExpensesByCategory = () => {
  const expByCategory = useGetCategoryExp();
  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>
      <Header>
        <BackButton />
        <Title>Gastos por categoria</Title>
      </Header>
      <ListaDeCategorias>
        {expByCategory.map((exp, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <CategoryIcon id={exp.category} /> {exp.category}
              </Categoria>
              <Valor>{convertirAMoneda(exp.amount)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>
      <TotalExpense />
    </>
  );
};

export default ExpensesByCategory;
