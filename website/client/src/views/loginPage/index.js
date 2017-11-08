import React, { Component } from "react";
import LoginForm from "./component.js";
const FormValidators = require("../../validate.js");
const validateLoginForm = FormValidators.validateLoginForm;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateLoginForm({
      username: this.state.username,
      password: this.state.password
    });
    if (payload.success) {
      this.setState({
        errors: {}
      });
      console.log("The form is valid");
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.validateForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        user={this.state.username}
        pw={this.state.password}
      />
    );
  }
}

export default LoginPage;
