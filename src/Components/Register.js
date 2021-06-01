import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { Header, Title, HeaderContainer } from "../Elements/Header";
import { Form, Input, ButtonContainer } from "../Elements/FormElements";
import { ReactComponent as Svgregister } from "../images/registro.svg";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passsword2, setPassword2] = useState("");
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;

      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});
    //Comprobamos del lado del cliente correo
    const regrex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (email === "" || password === "" || passsword2 === "") {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Todos los campos son obligatorios",
      });
      return;
    }
    if (!regrex.test(email)) {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo electrónico válido",
      });
      return;
    }
    if (password !== passsword2) {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Oh vaya, parece que las contraseñas no coinciden",
      });
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/invalid-password":
          mensaje = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/weak-password":
          mensaje = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          mensaje =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          mensaje = "El correo electrónico no es válido.";
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta.";
          break;
      }
      setAlerta({
        tipo: "error",
        mensaje: mensaje,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Crear cuenta</Title>
          <div>
            <Button to="/login">Iniciar Sesion</Button>
          </div>
        </HeaderContainer>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Svg />
        <Input
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Correo"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repite tu contraseña"
          value={passsword2}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button as="button" type="submit" primario>
            Crear Cuenta
          </Button>
        </ButtonContainer>
      </Form>
      <Alert
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  );
};

const Svg = styled(Svgregister)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

export default Register;
