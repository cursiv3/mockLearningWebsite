const axios = require("axios");

export const submitSignup = user => {
  var params = { username: user.usr, password: user.pw, email: user.email };
  axios
    .post("https://localhost:8000/signup/submit", params)
    .then(res => {
      if (res.data.success == true) {
        localStorage.token = res.data.token;
        localStorage.isAuthenticated = true;
        window.location.reload();
      } else {
        return {
          errors: { message: res.data.message }
        };
      }
    })
    .catch(err => {
      console.log("Sign up data submit error: ", err);
    });
};
