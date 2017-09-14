const axios = require("axios");

const loginReq = () => {
  axios
    .get("https://localhost:8000/login/submit")
    .then(data => {
      this.state.dbRec = data;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  loginReq: loginReq
};
