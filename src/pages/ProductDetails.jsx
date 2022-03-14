import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getProductDetails } from '../services/api';
import './ProductDetails.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        title: '',
        id: '',
        price: '',
        thumbnail: '',
        attributes: [],
      },
      productList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getProductDetails(id);
    this.setState({ results });
    const productListCart = localStorage.getItem('productList');
    return productListCart
      ? this.setState({ productList: JSON.parse(productListCart) })
      : localStorage.setItem('productList', JSON.stringify([]));
  }

  sendCart = (id, title, price, thumbnail) => {
    const { productList } = this.state;
    const newProduct = {
      id,
      title,
      price,
      thumbnail,
      // attributes,
    };
    const newProductList = [...productList, newProduct];
    this.setState({ productList: newProductList },
      () => (localStorage.setItem('productList', JSON.stringify(newProductList))));
  }

  render() {
    const { results:
      { title, id, price, thumbnail, attributes }, results, productList } = this.state;
    return (
      <div>
        <Header cartQuantity={ productList.length } />
        { results
          ? (
            <section>
              <div>
                <p data-testid="product-detail-name">
                  {`${title} - R$${price}`}
                </p>
                <img src={ thumbnail } alt={ title } />
                <p>0</p>
              </div>
              <ul>
                {attributes.map((att, index) => (
                  <li key={ index }>
                    <p>{`${att.name} - ${att.value_name}`}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
          : <p>loading...</p>}
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.sendCart(
            id,
            title,
            price,
            thumbnail,
          ) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default ProductDetails;
