import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Selector.css';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  render() {
    return (
      <main className="selectorContainer">
        <header>{ this.state.data.question }</header>
        { this.renderOptions() }
      </main>
    );
  }

  renderOptions() {
    let options = this.state.data.options;

    let optionsJSX = options.map((item, index) => {
      if ( item.class ) {
        return (
          <Link to={ '/' + item.class } key={ 'options_' + index }>
            <p>{item.answer}</p>
          </Link>
        );
      } else {
        return (
          <div key={'options_' + index} onClick={this.handleSelection.bind( this, index )}>
            <p>{ item.answer }</p>
          </div>
        );
      }
    });

    return optionsJSX;
  }

  handleSelection( index ) {
    this.setState({ data: this.state.data.options[ index ] });
  }
}
