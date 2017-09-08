import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.css";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <TextField floatingLabelText="user name" />
          <TextField floatingLabelText="password" className="loginPwField" />
          <Link to={"/login/submit"}>
            <FlatButton label="login" className="loginBtn" onClick />
          </Link>
          <FlatButton label="sign up" href="/sign_up" />
        </div>
      </div>
    );
  }
}

export default LoginPage;
