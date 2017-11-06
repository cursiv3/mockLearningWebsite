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
      userIn: "",
      userPw: ""
    };
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  onSubmit(event) {}

  render() {
    return (
      <div>
        <div className="loginBox">
          <form onSubmit="http://localhost:8000/login/submit">
            <h1>Log In</h1>
            <label>Username</label>
            <input
              type="text"
              value={this.state.value}
              name="username"
              onChange={e => this.handleChange(e)}
            />
            <label>Password</label>
            <input
              type="text"
              value={this.state.value}
              name="password"
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" value="submit" />
            <h3>{this.state.userIn}</h3>
            <h3>{this.state.userPw}</h3>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
