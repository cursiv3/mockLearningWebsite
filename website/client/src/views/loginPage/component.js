import React from "react";
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";

const LoginForm = ({ history, onSubmit, onChange, errors, user, pw }) => {
  return (
    <div>
      <div className="loginBox">
        <form onSubmit={onSubmit}>
          <h1>Log In</h1>

          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

          <TextField
            floatingLabelText="Username"
            value={user.username}
            name="username"
            onChange={onChange}
            errorText={errors.username}
          />
          <TextField
            floatingLabelText="Password"
            value={user.password}
            name="password"
            onChange={onChange}
            errorText={errors.password}
          />
          <FlatButton type="submit" label="submit">
            <Link to="/home" />
          </FlatButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
