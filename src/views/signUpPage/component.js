import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.css";

class SignUpPage extends Component {
  render() {
    return (
      <div className="loginBox">
        <h1>Sign Up</h1>
        <form>
          <TextField type="text" floatingLabelText="user name" />
          <TextField type="text" floatingLabelText="password" />
          <TextField floatingLabelText="confirm password" />
          <TextField type="text" floatingLabelText="email" />
          <FlatButton label="submit" className="signUpSubmit" />
        </form>
      </div>
    );
  }
}

export default SignUpPage;
