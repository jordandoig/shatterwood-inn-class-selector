import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './Selector.css';

export default class Selector extends Component {
  constructor(props) {
    super(props);

    this.render = this.render.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      data: props.data,
      disabledIndex: null,
      history: [],
      questionNumber: 1
    }
  }

  render() {
    return (
      <main className="selectorContainer">
        <header>
          <button onClick={this.back}>Back</button>
          <h2>{this.state.questionNumber + '. ' + this.state.data.question}</h2>
        </header>
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
        return this.buildElement( item, index );
      }
    });

    return optionsJSX;
  }

  buildElement( item, index ) {
    let pathIndex = item.duplicatePath ? item.duplicatePath.index : index;
    let onClick = this.handleSelection.bind(this, pathIndex);
    let disabled = this.state.disabledIndex === index;

    if ( disabled ) {
      // add disabled styling
      onClick = null;
    } else if ( item.reset ) {
      // add reset styling??
      onClick = this.reset.bind( this );
    } else if ( item.reRoute ) {
      onClick = this.reRoute.bind( this, item.reRoute.keySequence );
    }

    let element = (
      <div key={'options_' + index} onClick={onClick}>
        <p>{item.answer}</p>
      </div>
    );

    if ( item.fakeOut ) {
      element = (
        <Popup
          trigger={element}
          closeOnDocumentClick
          onClose={this.disableIndex.bind(this, index)}
          disabled={disabled}
          key={'options_popup_' + index}
        >
          <p>{item.fakeOut}</p>
        </Popup>
      );
    }

    return element;
  }

  handleSelection( index ) {
    let history = this.state.history;
    history.push(index);

    this.setState({
      data: this.state.data.options[index],
      disabledIndex: null,
      history,
      questionNumber: this.state.questionNumber + 1
    });
  }

  disableIndex( index ) {
    this.setState({ disabledIndex: index });
  }

  reset() {
    this.setState({
      data: this.props.data,
      disableIndex: null,
      history: [],
      questionNumber: 1
    });
  }

  reRoute( keySequence, index ) {
    let history = this.state.history;
    history.push(index);

    this.rebuildFromStart( keySequence, history );
  }

  back() {
    if ( this.state.history ) {
      let replayHistory = this.state.history;
      replayHistory.pop();

      this.rebuildFromStart( replayHistory, replayHistory );
    }
  }

  rebuildFromStart( sequence, newHistory ) {
    let newData = this.props.data;

    sequence.forEach((key) => {
      newData = newData.options[key];
    });

    this.setState({ data: newData, disableIndex: null, newHistory, questionNumber: sequence.length + 1 });
  }
}
