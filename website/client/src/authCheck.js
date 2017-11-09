const axios = require("axios");

const authCheck = {
  isAuthenticated: false,
  authenticate() {
    var params = new URLSearchParams();
    params.append("token", localStorage.token);
    if (
      axios.post("http://localhost:8000/auth", params).then(res => {
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      })
    ) {
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  },

  signout(callback) {
    this.isAuthenticated = false;
    localStorage.token = null;
  }
};

module.exports = authCheck;
