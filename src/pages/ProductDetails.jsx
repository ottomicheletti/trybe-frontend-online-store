import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Header from '../components/Header';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { results: null };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const results = await getProductDetails(id);
    this.setState({ results });
  }

  render() {
    const { results:
      {
        // id,
        title,
        price,
        thumbnail,
        attributes,
        // available_quantity
      } } = this.state;

    return (
      <div>
        <Header />
        { results
          ? (
            <section>
              <p data-testid="product-detail-name">{ `${title} - R$${price}` }</p>
              <img src={ thumbnail } alt={ title } />
              <p>0</p>
              <div>
                {attributes.map((att) => (
                  <li key={ att.source }>
                    <p>{`${att.name} - ${att.value_name}`}</p>
                  </li>
                ))}
              </div>
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
