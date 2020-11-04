import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import MealList from "./components/MealList";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div id="main">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search=:id" component={MealList} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
