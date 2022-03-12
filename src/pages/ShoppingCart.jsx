import React, { Component } from 'react';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    const productListCart = JSON.parse(localStorage.getItem('productList'));
    if (productListCart.length > 0) {
      this.setState({ productList: productListCart });
    }
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <Header />
        { productList.length > 0
          ? (
            productList.map(({ id, title, price, thumbnail }) => (
              <ProductCard
                key={ id }
                id={ id }
                title={ title }
                price={ price }
                thumbnail={ thumbnail }
              />
            ))
          )
          : (
            <div data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </div>
          )}
      </div>
    );
  }
}

export default ShoppingCart;
