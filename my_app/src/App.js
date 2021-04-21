import React, { Component } from 'react';
// import ToggleButton from 'react-toggle-button';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Output from './components/Output';
import {Button} from '@material-ui/core';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      ledOn: false, 
      homePage: true
    };

    this.changePage = this.changePage.bind(this);
    this.chooseScreen = this.chooseScreen.bind(this);
  }

  setLedState(state) {
    this.setState({ ledOn: state !== '0' });
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

  changePage() {
    let cur_state = this.state.homePage;
    let new_state = cur_state ? false : true;

    this.setState({ homePage : new_state});
  }

  chooseScreen(){
    if(this.state.homePage){

      return (
        <div className="App">
          <Home/>
          <Button 
            variant="contained"
            onClick={this.changePage}
          >Submit</Button>
        </div>
      );

    } else {

      return (
        <div className="App">
          <Output/>
          <Button 
            variant="contained"
            onClick={this.changePage}
          >Submit</Button>
        </div>
      )
      
    }
  }

  render() {
    return (
      <div className="App">
        <this.chooseScreen/>
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