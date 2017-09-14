import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";
const axios = require("axios");

const actions = require("../../actions/actions");

class LoginPage extends Component {
  constructor() {
    super();
    this.state = { dbRec: null };

    this.loginReq = this.loginReq.bind(this);
  }

  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <TextField floatingLabelText="user name" />
          <TextField floatingLabelText="password" className="loginPwField" />
          <FlatButton
            label="login"
            className="loginBtn"
            onClick={this.loginReq}
          />
          <FlatButton label="sign up" href="/sign_up" />
        </div>
      </div>
    );
  }
}

export default LoginPage;
