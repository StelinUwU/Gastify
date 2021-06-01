import React from "react";
import { Helmet } from "react-helmet";
import {
  Header,
  Title,
  HeaderContainer,
  ButtonsContainer,
} from "./Elements/Header";
import Button from "./Elements/Button";
import LogoutButton from "./Components/LogoutButton";
import ExpenseForm from "./Components/ExpenseForm";
import TotalExpense from "./Components/TotalExpense";
const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Agregar Gasto</Title>
          <ButtonsContainer>
            <Button to="/categories">Categorias</Button>
            <Button to="/list">Lista de gastos</Button>
            <LogoutButton />
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <ExpenseForm />
      <TotalExpense />
    </>
  );
};

export default App;
