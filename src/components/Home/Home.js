import React, { Component } from 'react';
import Header from '../Header';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <Header />
        <main>
          Here is the homeContainer!!!
        </main>
      </div>
    );
  }
}

export default Home;
