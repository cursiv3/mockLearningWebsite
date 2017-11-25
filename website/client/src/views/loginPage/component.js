import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import "./style.scss";

const LoginForm = ({
  history,
  onClick,
  onChange,
  errors,
  user,
  pw,
  btnTxt,
  type,
  pwMask
}) => {
  return (
    <div>
      <div className="loginBox">
        <form>
          <h1>Log In</h1>

          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

          <TextField
            type={user.type}
            floatingLabelText="Username"
            value={user.username}
            name="username"
            onChange={onChange}
            errorText={errors.username}
          />

          <TextField
            type={type}
            floatingLabelText="Password"
            value={user.password}
            name="password"
            onChange={onChange}
            errorText={errors.password}
          />
          <FlatButton
            label={btnTxt}
            onClick={pwMask}
            style={{
              margin: "0 0 20px 0"
            }}
          />
          <br />
          <RaisedButton primary={true} label="Log In" onClick={onClick} />
        </form>
        <p>
          Don't have an account? <br /> <Link to="/">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
