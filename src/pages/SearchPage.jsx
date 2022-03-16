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

  async componentDidMount() {
    const productListCart = localStorage.getItem('productList');
    if (productListCart !== null) {
      this.setState({ productList: JSON.parse(productListCart) });
    } else {
      localStorage.setItem('productList', JSON.stringify([]));
    }
    const data = await getCategories();
    this.setState({ categories: data });
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
  };

  handleClick = async () => {
    const { checkedId, query } = this.state;
    const result = await getProductsFromCategoryAndQuery(checkedId, query);
    // regex para substituir a chave que dava problema no lint
    const regex1 = /available_quantity*/g;
    const regex2 = /free_shipping*/g;
    // método replace para substituir todas available_quantity do retorno da API por availableQuantity
    const replacedString1 = JSON.stringify(result.results)
      .replace(regex1, 'availableQuantity');
    const replacedString2 = replacedString1.replace(regex2, 'freeShipping');
    this.setState({ results: JSON.parse(replacedString2) });
  };

  // usando spread operator pois o lint reclama se uma função recebe mais de 4 parâmetros
  sendCart = (...args) => {
    const { productList } = this.state;
    // console.log(args);
    const newProduct = {
      id: args[0],
      title: args[1],
      price: args[2],
      thumbnail: args[3],
      availableQuantity: args[4],
      free_shipping: args[5],
      quantity: 1,
    };
    const newProductList = [...productList, newProduct];
    this.setState({ productList: newProductList },
      () => localStorage.setItem('productList', JSON.stringify(newProductList)));
  };

  render() {
    const { categories, checkedId, results, productList } = this.state;
    const cartQuantity = productList.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <div>
        <Header cartQuantity={ cartQuantity } />
        <div className="searchpage">
          <div className="categories">
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
            {categories.map((cat) => (
              <label htmlFor={ cat.name } key={ cat.id }>
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
                { cat.name }
              </label>
            ))}
          </div>
          <div className="productList">
            {results.length > 0
              ? (
                results.map(({
                  id,
                  title,
                  price,
                  thumbnail,
                  availableQuantity,
                  shipping: { freeShipping },
                }) => (
                  <div className="product" key={ id }>
                    <Link data-testid="product-detail-link" to={ `/product/${id}` }>
                      {freeShipping
                        ? <p data-testid="free-shipping">Frete Grátis!</p>
                        : null}
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
                        availableQuantity,
                        freeShipping,
                      ) }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                ))
              ) : (
                <div data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
