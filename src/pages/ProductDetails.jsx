import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getProductDetails } from '../services/api';
import './ProductDetails.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getProductDetails(id);
    this.setState({ results });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <Header />
        { results
          ? (
            <section>
              <div>
                <p data-testid="product-detail-name">
                  {`${results.title} - R$${results.price}`}
                </p>
                <img src={ results.thumbnail } alt={ results.title } />
                <p>0</p>
              </div>
              <ul>
                {results.attributes.map((att, index) => (
                  <li key={ index }>
                    <p>{`${att.name} - ${att.value_name}`}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
          : <p>loading...</p>}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default ProductDetails;
