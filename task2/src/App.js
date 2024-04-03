// App.js

import React from "react";

import AllProducts from "./AllProducts";
import ProductDetails from "./ProductDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AllProducts} />
          <Route path="/product/:id" component={ProductDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
