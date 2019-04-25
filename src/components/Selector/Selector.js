import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './Selector.css';

export default class Selector extends Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.rebuildFromStart = this.rebuildFromStart.bind(this);

    this.state = {
      data: props.data,
      disabledIndex: null,
      history: [],
      nextCallback: null,
      questionNumber: 1
    }
  }

  render() {
    return (
      <main className="selectorContainer">
        <header>
          <h2>{this.state.questionNumber + '. ' + this.state.data.question}</h2>
        </header>
        { this.renderOptions() }
        { this.renderButtons() }
      </main>
    );
  }

  renderButtons() {
    return (
      <div className="buttonContainer">
        <button onClick={this.back}>Back</button>
        <button onClick={this.next}>Next</button>
      </div>
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
    let disabled = this.state.disabledIndex === index;
    let onClick = this.handleSelection.bind(this, item, index);

    if ( disabled ) {
      // add disabled styling
      onClick = null;
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

  handleSelection( item, index ) {
    let pathIndex = item.duplicatePath ? item.duplicatePath.index : index;
    let callback = this.select.bind(this, pathIndex);

    if ( item.reset ) {
      callback = this.reset.bind( this );
    } else if ( item.reRoute ) {
      callback = this.reRoute.bind( this, item.reRoute.keySequence );
    }

    this.setState({ nextCallback: callback });
  }

  select( index ) {
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

  next() {
    this.state.nextCallback();
  }

  rebuildFromStart( sequence, newHistory ) {
    let newData = this.props.data;

    sequence.forEach((key) => {
      newData = newData.options[key];
    });

    this.setState({ data: newData, disableIndex: null, newHistory, questionNumber: newHistory.length + 1 });
  }
}
