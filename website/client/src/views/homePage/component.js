import React from "react";
import Signout from "../Signout/Signout";
const axios = require("axios");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      user: ""
    };
  }
  componentDidMount() {
    const config = { headers: { Authorization: localStorage.token } };
    axios
      .get("https://localhost:8000/auth", {
        headers: { Authorization: localStorage.token }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ auth: true, user: res.data.data });
        }
      });
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
        <Signout />
        <p>this is the protected home page!</p>
        {this.state.auth && (
          <div>
            <h1>Profile</h1>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
