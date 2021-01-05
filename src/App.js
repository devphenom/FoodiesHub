import React, { Suspense } from "react";
import { Provider } from "react-redux";
// import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Router } from "@reach/router";

import store from "./components/Redux/store";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";
import NoMatch from "./components/NoMatch";
// import Footer from "./components/Footer";

import "./App.css";

const Home = lazy(() => import("./"));

const App = () => {
  return (
    // <Router>
    <Provider store={store}>
      <div id="main">
        <Router>
          <Suspense>
            <Home path="/" />
            <Search path="/search" />
            <Details path="/details/:id" />
            <NoMatch default />
          </Suspense>
        </Router>
        {/* <Footer /> */}
      </div>
    </Provider>
  );
};

export default App;
