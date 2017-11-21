import React from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.css";

const SignUpForm = ({ history, onSubmit, onChange, errors, user }) => {
  return (
    <div className="loginBox">
      <h1>Sign Up</h1>

      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          floatingLabelText="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <TextField
          name="email"
          floatingLabelText="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <TextField
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onChange}
          errorText={errors.password}
        />
        <TextField
          name="pwconfirm"
          floatingLabelText="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
        />
        <FlatButton type="submit" label="submit" />
      </form>
      <p>
        Aleady have an account? <br />
        <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
