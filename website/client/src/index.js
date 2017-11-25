import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.scss";
import Routes from "./routes";

const rootEl = document.getElementById("root");

if (module.hot) {
  module.hot.accept("./routes", () => {
    const NextApp = require("./routes").default;
    render(
      <BrowserRouter>
        <MuiThemeProvider>
          <NextApp />
        </MuiThemeProvider>
      </BrowserRouter>,
      rootEl
    );
  });
}

render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </BrowserRouter>,
  rootEl
);
registerServiceWorker();
