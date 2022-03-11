import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const {
      id,
      title,
      price,
      thumbnail,
      // available_quantity,
    } = this.props;
    return (
      <li className="card" value={ id } data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{`R$ ${price}`}</p>
        {/* <p>{`Quantidade: ${ available_quantity }`}</p> */}
        <button type="button">Adicionar ao carrinho</button>
      </li>
    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;

export default ProductCard;
