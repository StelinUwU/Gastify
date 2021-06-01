import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../Elements/Header";
import BackButton from "../Elements/BackButton";
import TotalExpense from "./TotalExpense";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import useGetGasto from "../hooks/useGetGasto";
const Edit = () => {
  const { id } = useParams();
  const [gasto] = useGetGasto(id);
  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>
      <Header>
        <BackButton route="/list" />
        <Title>Editar Gasto</Title>
      </Header>
      <ExpenseForm gasto={gasto} />
      <TotalExpense />
    </>
  );
};

export default Edit;
