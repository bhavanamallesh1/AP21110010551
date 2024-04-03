// App.js

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProducts from "./AllProducts";
import ProductDetails from "./src/ProductDetails";

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
