import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import Container from "./Elements/Container";
import Edit from "./Components/Edit";
import ExpensesByCategory from "./Components/ExpensesByCategory";
import Login from "./Components/Login";
import ExpenseList from "./Components/ExpenseList";
import Register from "./Components/Register";
import favicon from "./images/logo.png";
import Background from "./Elements/Background";
import PrivateRoute from "./Components/PrivateRoute";
import { TotalMonthProvider } from "./contexts/totalMothContext";
WebFont.load({
  google: {
    //Work+Sans:wght@400;500;700
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <TotalMonthProvider>
          <BrowserRouter>
            <Container>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/categories">
                  <ExpensesByCategory />
                </PrivateRoute>
                <PrivateRoute path="/list">
                  <ExpenseList />
                </PrivateRoute>
                <PrivateRoute path="/edit/:id">
                  <Edit />
                </PrivateRoute>
                <PrivateRoute path="/">
                  <App />
                </PrivateRoute>
                <Route>
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </Container>
          </BrowserRouter>
        </TotalMonthProvider>
      </AuthProvider>
      <Background />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
