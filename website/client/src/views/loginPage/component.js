import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";
const axios = require("axios");

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pw: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:8000/login/submit", {
        username: this.state.user,
        password: this.state.pw
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="loginBox">
          <form onSubmit={this.handleSubmit}>
            <h1>Log In</h1>
            <label>Username</label>
            <input
              type="text"
              value={this.state.user}
              name="user"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              type="text"
              value={this.state.pw}
              name="pw"
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
            <h3>{this.state.user}</h3>
            <h3>{this.state.pw}</h3>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
