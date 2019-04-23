import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import classData from './assets/data-flows/classData.json';
import crazyClassData from './assets/data-flows/crazyClassData.json';
import Selector from './components/Selector';
import Footer from './components/Footer';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/pick-a-class" render={() => (
            <Selector data={classData} ></Selector>
          )} />
          <Route exact path="/pick-a-class/crazy" render={() => (
            <Selector data={crazyClassData} ></Selector>
          )} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
