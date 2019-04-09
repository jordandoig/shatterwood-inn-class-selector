import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Basic from './components/Basic';
import Complex from './components/Complex';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/basic" component={Basic} />
        <Route path="/complex" component={Complex} />
        <Footer />
      </div>
    );
  }
}

export default App;
