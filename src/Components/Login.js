import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../Elements/Header";
import { Form, Input, ButtonContainer } from "../Elements/FormElements";
import { ReactComponent as Svgregister } from "../images/login.svg";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (email === "" || password === "") {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Todos los campos son obligatorios",
      });
      if (!regrex.test(email)) {
        setEstadoAlerta(true);
        setAlerta({
          tipo: "error",
          mensaje: "Por favor ingresa un correo electrónico válido",
        });
        return;
      }
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/wrong-password":
          mensaje = "Datos incorrectos :(";
          break;
        case "auth/user-not-found":
          mensaje = "Datos incorrectos :(";
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
        <title>Iniciar Sesion</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Iniciar Sesion</Title>
          <div>
            <Button to="/register">Registrarse</Button>
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
        <ButtonContainer>
          <Button as="button" type="submit" primario>
            Iniciar Sesion
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
  max-height: 12.25rem;
  margin-bottom: 1.25rem;
`;

export default Login;
