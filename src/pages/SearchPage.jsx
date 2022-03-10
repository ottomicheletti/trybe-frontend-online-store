import React, { Component } from 'react';
import Header from '../components/Header';
// import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ categories: data });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <>
        <Header />
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <button
              name={ cat.id }
              type="button"
              value={ cat.id }
              key={ cat.id }
              data-testid="category"
              // onClick={}
            >
              { cat.name }
            </button>))}
        </div>
      </>
    );
  }
}

export default SearchPage;
