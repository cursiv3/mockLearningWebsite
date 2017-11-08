import React, { Component } from "react";
import LoginForm from "./component.js";
const FormValidators = require("../../validate.js");
const validateLoginForm = FormValidators.validateLoginForm;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateLoginForm(this.state.user);
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
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
