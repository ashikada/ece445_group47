import React, { Component } from 'react';
// import ToggleButton from 'react-toggle-button';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import {Button} from '@material-ui/core';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { ledOn: false };
  }

  setLedState(state) {
    this.setState({ ledOn: state !== '0' })
  }

  componentDidMount() {
    fetch('/led')
      .then(response => response.text())
      .then(state => this.setLedState(state));
  }

  handleStateChange(ledOn) {
    fetch('/led', { method: 'PUT', body: ledOn ? '0' : '1' })
      .then(response => response.text())
      .then(state => this.setLedState(state));
  }

  render() {
    return (
      <div className="App">
        <Home/>
        <Button 
          variant="contained"
          onClick={() => this.handleStateChange(this.state.ledOn)}
        >Submit</Button>
      </div>
    );
  }

  /*
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ToggleButton
            value={this.state.ledOn}
            onToggle={value => this.handleStateChange(value)}
          />
        </header>
      </div>
    );
  }*/
}

export default App;