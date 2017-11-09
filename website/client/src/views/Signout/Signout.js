import React from "react";
import { withRouter, Link } from "react-router-dom";
const authCheck = require("../../authCheck.js");

const Signout = withRouter(
  ({ history }) =>
    authCheck.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <Link
          to="/"
          onClick={() => {
            authCheck.signout(() => history.push("/"));
          }}
        >
          <button>Sign out</button>
        </Link>
      </p>
    ) : (
      <p>Please log in</p>
    )
);

export default Signout;
