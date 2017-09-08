import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.css";

class SignUpPage extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      pword: "",
      email: ""
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="loginBox">
        <h1>Sign Up</h1>
        <form action="localhost:8000/signup/submit" method="post">
          <TextField
            name="username"
            type="text"
            floatingLabelText="user name"
            onChange={this.handleChange}
          />
          <TextField
            name="pword"
            type="text"
            floatingLabelText="password"
            onChange={this.handleChange}
          />
          <TextField
            name="pwconfirm"
            type="text"
            floatingLabelText="confirm password"
            onChange={this.handleChange}
          />
          <TextField
            name="email"
            type="text"
            floatingLabelText="email"
            onChange={this.handleChange}
          />
          <FlatButton type="submit" label="submit" className="signUpSubmit" />
        </form>
      </div>
    );
  }
}

export default SignUpPage;
