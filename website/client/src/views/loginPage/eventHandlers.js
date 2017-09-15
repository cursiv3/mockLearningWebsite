const axios = require("axios");

const handleSubmit = state => {
  axios.get("http://localhost:8000/login/submit").then(data => {
    state = { user: data.data[0].username, pass: data.data[0].pword };
  });
};

module.exports = {
  handleSubmit: handleSubmit
};
