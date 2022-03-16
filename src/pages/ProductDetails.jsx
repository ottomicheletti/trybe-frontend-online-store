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
        shipping: { freeShipping: '' },
      },
      productList: [],
      emailInput: '',
      detailsInput: '',
      isChecked: [false, false, false, false, false],
      evaluations: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productListCart = localStorage.getItem('productList');
    if (productListCart !== null) {
      this.setState({ productList: JSON.parse(productListCart) });
    } else {
      localStorage.setItem('productList', JSON.stringify([]));
    }
    const results = await getProductDetails(id);
    const regex = /free_shipping*/g;
    const replacedString = JSON.stringify(results).replace(regex, 'freeShipping');
    this.setState({ results: JSON.parse(replacedString) });

    const evaluations = localStorage.getItem('evaluations');
    if (evaluations) {
      this.setState({ evaluations: JSON.parse(evaluations) });
    } else {
      localStorage.setItem('evaluations', JSON.stringify([]));
    }
  }

  sendCart = (id, title, price, thumbnail) => {
    const { productList } = this.state;
    const newProduct = {
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    };
    const newProductList = [...productList, newProduct];
    this.setState({ productList: newProductList },
      () => (localStorage.setItem('productList', JSON.stringify(newProductList))));
  }

  handleChange = ({ target: { value, name, type } }) => {
    const { isChecked } = this.state;
    if (type === 'checkbox') {
      const newState = [];
      isChecked.forEach((_check, index) => {
        if (value <= index) {
          newState.push(false);
        } else {
          newState.push(true);
        }
        this.setState({ isChecked: newState });
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  submitRating = (event) => {
    event.preventDefault();
    const { emailInput, detailsInput, isChecked } = this.state;
    const newRating = { emailInput, detailsInput, isChecked };
    this.setState((prevState) => (
      { evaluations: [...prevState.evaluations, newRating] }
    ), () => {
      const { evaluations } = this.state;
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
    });
    this.setState({
      emailInput: '',
      detailsInput: '',
      isChecked: [false, false, false, false, false],
    });
  }

  render() {
    const {
      results: {
        title,
        id,
        price,
        thumbnail,
        attributes,
        shipping: {
          freeShipping,
        } },
      results,
      productList,
    } = this.state;
    const { emailInput, detailsInput, isChecked, evaluations } = this.state;
    const cartQuantity = productList.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <div>
        <Header cartQuantity={ cartQuantity } />
        { results
          ? (
            <section>
              <div>
                <p data-testid="product-detail-name">
                  {`${title} - R$${price}`}
                </p>
                <img src={ thumbnail } alt={ title } />
                {freeShipping
                  ? <p data-testid="free-shipping">Frete Grátis!</p>
                  : null}
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

        <form>
          <input
            type="text"
            name="emailInput"
            value={ emailInput }
            onChange={ this.handleChange }
            data-testid="product-detail-email"
            placeholder="Email"
          />
          <div>
            <input
              type="checkbox"
              data-testid="1-rating"
              value="1"
              onChange={ this.handleChange }
              checked={ isChecked[0] }
            />
            <input
              type="checkbox"
              data-testid="2-rating"
              value="2"
              onChange={ this.handleChange }
              checked={ isChecked[1] }
            />
            <input
              type="checkbox"
              data-testid="3-rating"
              value="3"
              onChange={ this.handleChange }
              checked={ isChecked[2] }
            />
            <input
              type="checkbox"
              data-testid="4-rating"
              value="4"
              onChange={ this.handleChange }
              checked={ isChecked[3] }
            />
            <input
              type="checkbox"
              data-testid="5-rating"
              value="5"
              onChange={ this.handleChange }
              checked={ isChecked[4] }
            />
          </div>
          <textarea
            name="detailsInput"
            value={ detailsInput }
            onChange={ this.handleChange }
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.submitRating }
          >
            Enviar
          </button>
        </form>
        <ul>
          {evaluations.length > 0 && evaluations.map((evaluation, index) => (
            <li key={ index }>
              <p>{evaluation.emailInput}</p>
              <input type="checkbox" checked={ evaluation.isChecked[0] } readOnly />
              <input type="checkbox" checked={ evaluation.isChecked[1] } readOnly />
              <input type="checkbox" checked={ evaluation.isChecked[2] } readOnly />
              <input type="checkbox" checked={ evaluation.isChecked[3] } readOnly />
              <input type="checkbox" checked={ evaluation.isChecked[4] } readOnly />
              <p>{ evaluation.detailsInput }</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default ProductDetails;
