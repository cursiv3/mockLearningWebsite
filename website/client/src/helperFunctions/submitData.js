const axios = require("axios");

export const submitData = (usr, pw) => {
  var params = { username: usr, password: pw };
  console.log(params);
  axios
    .post("https://localhost:8000/login/submit", params)
    .then(res => {
      if (res.data.success == true) {
        localStorage.token = res.data.token;
        localStorage.isAuthenticated = true;
        window.location.reload();
      } else {
        this.setState({
          errors: { message: res.data.message }
        });
      }
    })
    .catch(err => {
      console.log("Data submit error: ", err);
    });
};
