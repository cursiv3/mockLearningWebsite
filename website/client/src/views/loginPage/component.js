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
      pass: "",
      userIn: "",
      userPw: ""
    };
  }

  handleSubmit() {
    axios.get("http://localhost:8000/login/submit").then(data => {
      const d = data.data;
      if (d.username == this.state.userIn && d.pword == this.state.userPw) {
        console.log("success!");
      } else {
        console.log("err");
      }
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <label>Username</label>
          <input
            type="text"
            value={this.state.value}
            name="userIn"
            onChange={e => this.handleChange(e)}
          />
          <label>Password</label>
          <input
            type="text"
            value={this.state.value}
            name="userPw"
            onChange={e => this.handleChange(e)}
          />
          <button onClick={e => this.handleSubmit(e)}>submit</button>
          <h3>{this.state.userIn}</h3>
          <h3>{this.state.userPw}</h3>
        </div>
      </div>
    );
  }
}

export default LoginPage;
