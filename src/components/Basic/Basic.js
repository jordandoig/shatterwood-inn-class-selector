import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import basicData from '../../assets/class-flows/basicData.json';
import './Basic.css';

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: basicData
    }
  }

  render() {
    return (
      <main className="basicContainer">
        <header>{ this.state.data.question }</header>
        { this.renderOptions() }
      </main>
    );
  }

  renderOptions() {
    let options = this.state.data.options;

    let optionsJSX = options.map((item, index, options) => {
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
    let newData = this.state.data.options[ index ];
    if ( newData.class ) {
      this.setState({ data: basicData });

    } else {
      this.setState({ data: newData });
    }
  }
}
