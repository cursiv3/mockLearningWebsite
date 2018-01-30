const data = require("./sensitiveInfo");

module.exports = {
  auth: {
    secret: data.secret
  },
  db: {
    databaseHost: `postgresql://${data.dbAdmin}:${
      data.dbPass
    }@localhost:5432/smockusers`
  }
};
