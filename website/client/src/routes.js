import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./views/loginPage/";
import SignUpPage from "./views/signUpPage";
import HomePage from "./views/homePage";

const authCheck = require("./helperFunctions/authCheck");

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.isAuthenticated == "true" ? (
        <Component {...props} />
      ) : (
        <Redirect to={"/"} />
      )}
  />
);

const LoggedInRedirectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.isAuthenticated == "true" ? (
        <Redirect to={"/home"} />
      ) : (
        <Component {...props} />
      )}
  />
);

const Routes = () => (
  <Switch>
    <LoggedInRedirectRoute exact path="/" component={LoginPage} />
    <Route path="/signup" component={SignUpPage} />

    <PrivateRoute path="/home" component={HomePage} />
  </Switch>
);

export default Routes;
