import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  removeItemFromCart = ({ target: { value } }) => {
    const { productList } = this.state;
    const newProductList = productList
      .filter((_product, index) => parseInt(value, 10) !== index);
    this.setState({ productList: newProductList });
    localStorage.setItem('productList', JSON.stringify(newProductList));
  }

  subAndAddItems = ({ target: { value, name } }) => {
    const { productList } = this.state;
    const itemMatch = productList.find((product) => product.id === value);
    const index = productList.indexOf(itemMatch);

    if (name === 'add') {
      const cont = itemMatch.quantity + 1;
      Object.assign(itemMatch, { quantity: cont });
      productList.splice(index, 1, itemMatch);
      this.setState({ productList });
      localStorage.setItem('productList', JSON.stringify(productList));
    } else {
      const cont = itemMatch.quantity > 1
        ? itemMatch.quantity - 1
        : itemMatch.quantity = 1;
      Object.assign(itemMatch, { quantity: cont });
      productList.splice(index, 1, itemMatch);
      this.setState({ productList });
      localStorage.setItem('productList', JSON.stringify(productList));
    }
  };

  toCheckout = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { productList } = this.state;
    const cartQuantity = productList.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <div>
        <Header cartQuantity={ cartQuantity } />
        <button type="button" data-testid="checkout-products" onClick={ this.toCheckout }>
          Finalizar Compra
        </button>
        { productList.length > 0
          ? (
            productList.map(({
              id,
              title,
              price,
              thumbnail,
              quantity,
              availableQuantity,
            }, index) => (
              <div key={ index }>
                <ProductCard
                  id={ id }
                  title={ title }
                  price={ price }
                  thumbnail={ thumbnail }
                />
                <button
                  name="remove"
                  value={ index }
                  onClick={ this.removeItemFromCart }
                  type="button"
                >
                  remover

                </button>
                <button
                  data-testid="product-increase-quantity"
                  disabled={ quantity >= availableQuantity }
                  name="add"
                  value={ id }
                  onClick={ this.subAndAddItems }
                  type="button"
                >
                  mais

                </button>
                <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
                <button
                  data-testid="product-decrease-quantity"
                  disabled={ quantity <= 1 }
                  name="sub"
                  value={ id }
                  onClick={ this.subAndAddItems }
                  type="button"
                >
                  menos

                </button>
              </div>
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

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ShoppingCart;
