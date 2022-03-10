import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/" component={ SearchPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
