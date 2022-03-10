import React, { Component } from 'react';

import Header from '../components/Header';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
