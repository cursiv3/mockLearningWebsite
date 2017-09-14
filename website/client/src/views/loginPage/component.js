import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";

const axios = require("axios");

const eventHandlers = require("./eventHandlers");

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
      pass: ""
    };
  }

  handleSubmit = () => {
    axios.get("http://localhost:8000/login/submit").then(data => {
      this.setState({ user: data.data[0].username, pass: data.data[0].pword });
    });
  };

  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />
          <button onClick={e => this.handleSubmit(e)}>submit</button>
          <h3>user: {this.state.user}</h3>
          <h3>pass: {this.state.pass}</h3>
        </div>
      </div>
    );
  }
}

export default LoginPage;
