import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import SearchPage from './pages/SearchPage';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  componentDidMount() {
    const productListCart = localStorage.getItem('productList');
    return !productListCart && localStorage.setItem('productList', JSON.stringify([]));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/" component={ SearchPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
