import React, { Component } from "react";
import SignUpForm from "./component.js";
const FormValidators = require("../../validate.js");
const validateSignUpForm = FormValidators.validateSignUpForm;

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: ""
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
    var payload = validateSignUpForm(this.state.user);
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
      <SignUpForm
        onSubmit={this.validateForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpContainer;
