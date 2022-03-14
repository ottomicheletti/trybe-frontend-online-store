import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <header>
        <Link data-testid="shopping-cart-button" to="/shoppingcart"> Carrinho </Link>
        <p data-testid="shopping-cart-product-quantity">{cartQuantity}</p>
      </header>
    );
  }
}

Header.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};

export default Header;
