import React from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";

const LoginForm = ({ history, onClick, onChange, errors, user, pw }) => {
  return (
    <div>
      <div className="loginBox">
        <form>
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
          <FlatButton label="Submit" onClick={onClick} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
