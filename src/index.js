import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Home } from "./component";
import App from "./App";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/App" element={<App />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);
