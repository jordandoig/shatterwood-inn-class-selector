import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import classData from './assets/data-flows/classData.json';

import Selector from './components/Selector';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/pick-a-class" render={() => (
            <Selector data={classData} ></Selector>
          )} />
          {/* <Route path="/class" render={() => (
            <Selector data={crazyData} ></Selector>
          )} /> */}
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
