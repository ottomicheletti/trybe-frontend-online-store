import React, { Component } from 'react';
import Header from '../components/Header';
// import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import './SearchPage.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      checkedId: '',
    };
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ categories: data });
    });
  }

  handleChange = ({target: { value }}) => {
    // ao ser chamada, a função coloca o Id do input presente no target.event dentro de um estado chamado checkedId
    this.setState({ checkedId:  value });
  }

  render() {
    const { categories, checkedId } = this.state;
    return (
      <>
        <Header />
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div className="categories" >
          {categories.map((cat) => (
            <label
              htmlFor={cat.name}
              key={ cat.id }
              data-testid="category"
            >
              <input type="radio" name={cat.name} value={cat.id}
              //chama método handleChange
              onChange={ this.handleChange }
              //verifica se o Id do event.target é igual ao Id da categoria presente no input
              checked={ checkedId === cat.id }
              />
              {cat.name}
            </label>
          ))}
        </div>
      </>
    );
  }
}

export default SearchPage;
