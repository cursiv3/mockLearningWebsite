import React from "react";
import Signout from "../Signout/Signout";

const HomePage = props => (
  <div>
    <Signout />
    <p>this is the protected home page!</p>
  </div>
);

export default HomePage;
