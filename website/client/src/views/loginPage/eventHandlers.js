const axios = require("axios");

const handleSubmit = () => {
  axios.get("http://localhost:8000/login/submit").then(data => {
    this.setState({ user: data.data[0].username, pass: data.data[0].pword });
  });
};

module.exports = {
  handleSubmit: handleSubmit
};
