import React from "react";
import Signout from "../Signout/Signout";
const axios = require("axios");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentDidMount() {
    const config = { headers: { Authorization: localStorage.token } };
    axios
      .get("http://localhost:8000/auth", {
        headers: { Authorization: localStorage.token }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ auth: true });
        }
      });
  }

  render() {
    return (
      <div>
        <Signout />
        <p>this is the protected home page!</p>
        {this.state.auth && <h1>auth content here</h1>}
      </div>
    );
  }
}

export default HomePage;
