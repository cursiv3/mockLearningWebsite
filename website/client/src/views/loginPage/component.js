import React from "react";
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

          <label>Username</label>
          <TextField
            floatingLabelText="Username"
            value={user.username}
            name="username"
            onChange={onChange}
            errorText={errors.username}
          />
          <label>Password</label>
          <TextField
            floatingLabelText="Password"
            value={user.password}
            name="password"
            onChange={onChange}
            errorText={errors.password}
          />
          <FlatButton type="submit" label="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
