import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../Elements/Header";
import BackButton from "../Elements/BackButton";
import TotalExpense from "./TotalExpense";
import useGetExp from "../hooks/useGetExp";
import CategoryIcon from "../Elements/CategoryIcon";
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from "../Elements/ListElements";
import convertirAMoneda from "../functions/convertirAMoneda";
import { ReactComponent as EditIcon } from "../images/editar.svg";
import { ReactComponent as DeleteIcon } from "../images/borrar.svg";
import { Link } from "react-router-dom";
import Button from "../Elements/Button";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import deleteExpense from "../firebase/deleteExpense";

const ExpenseList = () => {
  const [expenses, getMoreExp, thereIsMore] = useGetExp();
  const formatDate = (date) => {
    return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy ", {
      locale: es,
    });
  };

  const dateIsEqual = (expenses, index, expense) => {
    if (index !== 0) {
      const actualDate = formatDate(expense.date);
      const previusDate = formatDate(expenses[index - 1].date);
      if (actualDate === previusDate) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>
      <Header>
        <BackButton />
        <Title>Lista de gastos</Title>
      </Header>
      <Lista>
        {expenses.map((item, index) => {
          return (
            <div key={item.id}>
              {!dateIsEqual(expenses, index, item) && (
                <Fecha>{formatDate(item.date)}</Fecha>
              )}

              <ElementoLista key={item.id}>
                <Categoria>
                  <CategoryIcon id={item.category} />
                  {item.category}
                </Categoria>
                <Descripcion>{item.description}</Descripcion>
                <Valor>{convertirAMoneda(item.amount)}</Valor>
                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/edit/${item.id}`}>
                    <EditIcon />
                  </BotonAccion>
                  <BotonAccion
                    onClick={() => {
                      deleteExpense(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {thereIsMore && (
          <ContenedorBotonCentral>
            <BotonCargarMas
              onClick={() => {
                getMoreExp();
              }}
            >
              Cargar mas
            </BotonCargarMas>
          </ContenedorBotonCentral>
        )}

        {expenses.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos por mostrar</Subtitulo>
            <Button as={Link} to="/">
              Agregar Gasto
            </Button>
          </ContenedorSubtitulo>
        )}
      </Lista>
      <TotalExpense />
    </>
  );
};

export default ExpenseList;
