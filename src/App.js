import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Provider>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
