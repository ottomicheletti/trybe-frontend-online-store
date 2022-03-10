import React, { Component } from 'react';
import Header from '../components/Header';
// import { Link } from 'react-router-dom';

class SearchPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
      </>
    );
  }
}

export default SearchPage;
