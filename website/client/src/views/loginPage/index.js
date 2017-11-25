import React, { Component } from "react";
import LoginForm from "./component.js";
const axios = require("axios");
const FormValidators = require("../../helperFunctions/validate");
const validateLoginForm = FormValidators.validateLoginForm;
const authCheck = require("../../helperFunctions/authCheck");

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: ""
      },
      btnTxt: "show",
      type: "password"
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwMask = this.pwMask.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  submitLogin(usr, pw) {
    var params = { username: usr, password: pw };

    axios
      .post("https://localhost:8000/login/submit", params)
      .then(res => {
        if (res.data.success == true) {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.reload();
        } else {
          this.setState({
            errors: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        console.log("Data submit error: ", err);
      });
  }

  validateForm(event) {
    event.preventDefault();

    var payload = validateLoginForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });

      this.submitLogin(this.state.user.username, this.state.user.password);
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type == "password" ? "input" : "password",
        btnTxt: this.state.btnTxt == "show" ? "hide" : "show"
      })
    );
  }

  render() {
    return (
      <LoginForm
        onClick={this.validateForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        user={this.state.user}
        btnTxt={this.state.btnTxt}
        type={this.state.type}
        pwMask={this.pwMask}
      />
    );
  }
}

export default LoginPage;
