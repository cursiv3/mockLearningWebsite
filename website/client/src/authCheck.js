import React from "react";
import LoginPage from "./views/loginPage";

const axios = require("axios");

class AuthCheck extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var params = new URLSearchParams();
    params.append("token", localStorage.token);
    axios.post("http://localhost:8000/auth", params).then(res => {
      localStorage.authorized = res.data.success;
      console.log("comp will mount done, ls.auth = ", localStorage.authorized);
    });
  }

  render() {
    if (localStorage.authorized == true) {
      return <div>{this.props.children}</div>;
    } else {
      return <LoginPage />;
    }
  }
}

export default AuthCheck;
