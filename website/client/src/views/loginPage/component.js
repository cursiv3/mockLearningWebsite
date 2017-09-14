import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.css";

const LoginPage = (props) => {

  render() {
    return (
      <div>
        <div className="loginBox">
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
