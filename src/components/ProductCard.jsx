import React, { Component } from 'react';

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }
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
        <p>{`R$ ${ price }`}</p>
        {/* <p>{`Quantidade: ${ available_quantity }`}</p> */}
        <button>Adicionar ao carrinho</button>
      </li>
    )
  }
}

export default ProductCard;