import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./views/loginPage/";
import SignUpPage from "./views/signUpPage";
import HomePage from "./views/homePage";
const authCheck = require("./authCheck");

var testerino = authCheck.authenticate();
console.log(testerino);
console.log(authCheck.isAuthenticated);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authCheck.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={"/"} />
      )}
  />
);

const LoggedInRedirect = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authCheck.isAuthenticated ? (
        <Redirect to={"/home"} />
      ) : (
        <Component {...props} />
      )}
  />
);

const Routes = () => (
  <Switch>
    <LoggedInRedirect exact path="/" component={LoginPage} />
    <Route path="/signup" component={SignUpPage} />

    <PrivateRoute path="/home" component={HomePage} />
  </Switch>
);

export default Routes;
