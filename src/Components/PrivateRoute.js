import React from "react";
import { useAuth } from "./../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...restoDePropiedades }) => {
  const { user } = useAuth();
  if (user) {
    return <Route {...restoDePropiedades}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
