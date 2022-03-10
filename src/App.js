import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchPage from './pages/SearchPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ SearchPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
