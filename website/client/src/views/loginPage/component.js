import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";

const eventHandlers = require("./eventHandlers");

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
      pass: ""
    };
  }

  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />
          <button onClick={eventHandlers.handleSubmit}>submit</button>
          <h3>user: {this.state.user}</h3>
          <h3>pass: {this.state.pass}</h3>
        </div>
      </div>
    );
  }
}

export default LoginPage;
