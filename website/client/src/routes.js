import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./views/loginPage/";
import SignUpPage from "./views/signUpPage";
import HomePage from "./views/homePage";

const loggedIn = token => {
  if (token.length > 0) {
    console.log(token);
    return true;
  }
};

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        loggedIn(localStorage.token) ? <Redirect to="/home" /> : <LoginPage />}
    />
    <Route path="/signup" component={SignUpPage} />
    <Route path="/home" component={HomePage} />

    {/*<Route component={authCheck}>
      <Route path="protected route" component={compHere} />
</Route>*/}
  </Switch>
);

export default Routes;
