import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import UpperHeader from "./upperHeader";
import MiddleHeader from "./middleHeader";
import PrdListing from "./prdListing";
import About from "./about";
import NotFound from "./not-found";
import NavBar from "./navBar";
import AddPrd from "./addPrd";
import PrdDetails from "./prdDetails";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <UpperHeader />
        <MiddleHeader />
        <NavBar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/prdListing" component={PrdListing} />
          <Route path="/addProduct" component={AddPrd} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/productDetails" component={PrdDetails} />
          <Redirect from="/home" to="/prdListing" />
          <Redirect from="/" exact to="/prdListing" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
