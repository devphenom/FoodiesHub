import React, { useState } from "react";
import { Provider } from "react-redux";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import store from "./components/Redux/store";
import Home from "./components/Home/Home";
import MealList from "./components/MealList/MealList";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Provider store={store}>
        <div id="main">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <Home search={search} setSearch={setSearch} {...props} />
              )}
            />
            <Route
              path="/search"
              component={() => (
                <MealList
                  propsData={{
                    search,
                    setSearch,
                  }}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
};

export default App;
