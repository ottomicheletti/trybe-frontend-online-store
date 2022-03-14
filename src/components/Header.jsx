import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     productList: 0,
  //     loading: true,
  //   };
  // }

  // componentDidMount() {
  //   const productListCart = JSON.parse(localStorage.getItem('productList'));
  //   if (productListCart) {
  //     this.setState({ productList: productListCart.length, loading: false });
  //   } else {
  //     this.setState({ loading: false });
  //   }
  // }

  render() {
    // const { productList, loading } = this.state;
    const { cartQuantity } = this.props;
    return (
      <header>
        <Link data-testid="shopping-cart-button" to="/shoppingcart"> Carrinho </Link>
        {/* {loading ? <p>Carregando...</p> : ( */}
          <p data-testid="shopping-cart-product-quantity">{cartQuantity}</p>
        {/* )} */}
      </header>
    );
  }
}

export default Header;
