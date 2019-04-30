import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className="appFooter">
        <div className="linkContainer">
          <a href="https://www.venmo.com/Jordan-Doig-1">Buy me a coffee</a>
          <a href="https://github.com/jordandoig/shatterwood-inn-class-selector">See the code</a>
          <a href="https://www.jordandoig.com">About the developer</a>
        </div>
        <i>&#169;2019 Jordan Doig</i>
      </footer>
    );
  }
}

export default Footer;
