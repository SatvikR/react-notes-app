import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./components/home";
import EditNote from "./components/edit-note";
import Notes from "./components/notes";
import Signup from "./components/signup";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/edit-note/:id" exact component={EditNote} />
      <Route path="/notes" exact component={Notes} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
};

export default App;
