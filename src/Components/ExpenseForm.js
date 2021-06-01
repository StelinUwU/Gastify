import React, { useState, useEffect } from "react";
import {
  FilterContainer,
  Form,
  Input,
  InputBg,
  ButtonContainer,
} from "../Elements/FormElements";
import Button from "../Elements/Button";
import { ReactComponent as IconPlus } from "../images/plus.svg";
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import addExpense from "../firebase/addExpense";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Alert from "../Elements/Alert";
import editExpense from "../firebase/editExpense";
const ExpenseForm = ({ gasto }) => {
  const history = useHistory();
  const [inputDescription, setInputDescription] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [category, setCategory] = useState("hogar");
  const [date, setDate] = useState(new Date());
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alert, setAlert] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    //Comprobamos si hay algun gasto
    //De ser así establecemos un estado con los valores del gasto.
    if (gasto) {
      //Comprobación, gasto del usuario actual
      //Comprobamos con uuid guardado con el uid del usuario
      if (gasto.data().uidUser === user.uid) {
        setCategory(gasto.data().category);
        setDate(fromUnixTime(gasto.data().date));
        setInputDescription(gasto.data().description);
        setInputAmount(gasto.data().amount);
      } else {
        history.push("/list");
      }
    }
  }, [gasto, user, history]);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setInputDescription(e.target.value);
    } else if (e.target.name === "amount") {
      setInputAmount(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseFloat(inputAmount).toFixed(2);

    //Comprobación de descripción y valor
    if (inputDescription !== "" && inputAmount !== "") {
      if (amount) {
        if (gasto) {
          editExpense({
            id: gasto.id,
            category: category,
            description: inputDescription,
            amount: amount,
            date: getUnixTime(date),
          })
            .then(() => {
              history.push("/list");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          addExpense({
            category: category,
            description: inputDescription,
            amount: amount,
            date: getUnixTime(date),
            uidUser: user.uid,
          })
            .then(() => {
              setCategory("hogar");
              setInputDescription("");
              setInputAmount("");
              setDate(new Date());
              setEstadoAlerta(true);
              setAlert({
                tipo: "exito",
                mensaje: "El gasto fue agregado correctamente",
              });
            })
            .catch((e) => {
              setEstadoAlerta(true);
              setAlert({
                tipo: "error",
                mensaje:
                  "Oh vaya, ocurrió un error al intentar agregar tu gasto",
              });
            });
        }
      } else {
        setEstadoAlerta(true);
        setAlert({
          tipo: "error",
          mensaje: "El valor que ingresado no es valido",
        });
      }
    } else {
      setEstadoAlerta(true);
      setAlert({ tipo: "error", mensaje: "Todos los campos son obligatorios" });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FilterContainer>
        <SelectCategories category={category} setCategory={setCategory} />
        <DatePicker date={date} setDate={setDate} />
      </FilterContainer>
      <div>
        <Input
          autoComplete="off"
          type="text"
          name="description"
          id="description"
          placeholder="Descripción"
          value={inputDescription}
          onChange={handleChange}
        />
        <InputBg
          autoComplete="off"
          type="text"
          name="amount"
          id="value"
          placeholder="$0.00"
          value={inputAmount}
          onChange={handleChange}
        />
      </div>
      <ButtonContainer>
        <Button as="button" primario conIcono type="submit">
          {gasto ? "Editar Gasto" : "Agregar Gasto"}
          <IconPlus />
        </Button>
      </ButtonContainer>
      <Alert
        tipo={alert.tipo}
        mensaje={alert.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </Form>
  );
};

export default ExpenseForm;
