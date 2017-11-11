const axios = require("axios");

const authCheck = {
  authenticate(callback) {
    var params = new URLSearchParams();
    params.append("token", localStorage.token);
    axios.post("http://localhost:8000/auth", params).then(res => {
      if (res.data.success) {
        localStorage.isAuthenticated = true;
      } else {
        return null;
      }
    });
  },

  signout(callback) {
    localStorage.token = false;
    localStorage.isAuthenticated = false;
  }
};

module.exports = authCheck;
