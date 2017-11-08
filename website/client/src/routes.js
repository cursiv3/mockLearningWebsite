import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./views/loginPage/";
import SignUpPage from "./views/signUpPage";
import HomePage from "./views/homePage";
import AuthCheck from "./authCheck";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        localStorage.authorized == true ? (
          <Redirect to="/home" />
        ) : (
          <LoginPage />
        )}
    />
    <Route path="/signup" component={SignUpPage} />

    <Route component={AuthCheck}>
      <Route path="/home" component={HomePage} />
    </Route>
  </Switch>
);

export default Routes;
