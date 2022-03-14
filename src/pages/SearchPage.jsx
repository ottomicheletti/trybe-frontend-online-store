import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './SearchPage.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      checkedId: '',
      query: '',
      results: [],
      productList: [],
    };
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ categories: data });
    });

    const productListCart = localStorage.getItem('productList');
    return productListCart
      ? this.setState({ productList: JSON.parse(productListCart) })
      : localStorage.setItem('productList', JSON.stringify([]));
  }

  handleChange = ({ target: { value, type } }) => {
    // ao ser chamada, a função coloca o Id do input presente no target.event dentro de um estado chamado checkedId
    if (type === 'radio') {
      this.setState({
        checkedId: value,
      }, () => this.handleClick());
    }
    if (type === 'text') {
      this.setState({ query: value });
    }
  }

  handleClick = async () => {
    const { checkedId, query } = this.state;
    const result = await getProductsFromCategoryAndQuery(checkedId, query);
    this.setState({ results: result.results });
  }

  sendCart = (id, title, price, thumbnail) => {
    const { productList } = this.state;
    const newProduct = {
      id,
      title,
      price,
      thumbnail,
    };
    const newProductList = [...productList, newProduct];
    this.setState({ productList: newProductList },
      () => (localStorage.setItem('productList', JSON.stringify(newProductList))));
  }

  render() {
    const { categories, checkedId, results } = this.state;
    return (
      <>
        <Header />
        <div>
          <input
            type="text"
            name="query-input"
            placeholder="Pesquisar"
            data-testid="query-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <label
              htmlFor={ cat.name }
              key={ cat.id }
            >
              <input
                data-testid="category"
                type="radio"
                name={ cat.name }
                value={ cat.id }
                // chama método handleChange
                onChange={ this.handleChange }
                // verifica se o Id do event.target é igual ao Id da categoria presente no input
                checked={ checkedId === cat.id }
              />
              {cat.name}
            </label>
          ))}
        </div>

        {results.length > 0
          ? (
            results.map(({ id, title, price, thumbnail }) => (
              <div key={ id }>
                <Link data-testid="product-detail-link" to={ `/product/${id}` }>
                  <ProductCard
                    id={ id }
                    title={ title }
                    price={ price }
                    thumbnail={ thumbnail }
                  />
                </Link>
                <button
                  data-testid="product-add-to-cart"
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
            ))
          )
          : (
            <div data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>)}
      </>
    );
  }
}

export default SearchPage;
