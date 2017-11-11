const axios = require("axios");

export const submitData = (usr, pw) => {
  // init isAuthenticated var for future use
  localStorage.isAuthenticated = false;
  // prep data for api
  var params = new URLSearchParams();
  params.append("username", usr);
  params.append("password", pw);

  axios
    .post("http://localhost:8000/login/submit", params)
    .then(res => {
      if (!res.data.success) {
        this.setState({
          errors: { message: res.data.message }
        });
      } else {
        localStorage.token = res.data.token;
        localStorage.isAuthenticated = true;
        window.location.reload();
      }
    })
    .catch(err => {
      console.log("error is: ", err);
    });
};

//module.exports = submitData;
