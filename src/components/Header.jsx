import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <header>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link data-testid="shopping-cart-button" to="/shoppingcart">Carrinho</Link>
          </li>
          <li>
            {cartQuantity}
          </li>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};

export default Header;
