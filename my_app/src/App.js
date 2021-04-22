import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
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
      homePage: true,
      chipIdx:0
    };

    this.changePage = this.changePage.bind(this);
    this.chooseScreen = this.chooseScreen.bind(this);
    this.chooseChip = this.chooseChip.bind(this);
  }

  setChipState(state) {
    this.setState({ chipIdx: state });
  }

  componentDidMount() {
    fetch('/chip')
      .then(response => response.text())
      .then(state => this.setChipState(state));
  }

  handleStateChange(chipIdx) {
    fetch('/chip', { method: 'PUT', body: String(chipIdx) })
      .then(response => response.text())
      .then(state => this.setChipState(state));


  }

  changePage() {
    let cur_state = this.state.homePage;
    let new_state = cur_state ? false : true;

    this.setState({ homePage : new_state});
  }

  chooseChip(chipIndex){
    this.setState({chipIdx: chipIndex})
  }

  chooseScreen(){
    if(this.state.homePage){

      return (
        <div className="App">
          <Home 
            chipIdx={this.state.chipIdx}
            chooseChip={this.chooseChip}
          />
          <Button 
            variant="contained"
            value={this.state.chipIdx}
            onClick={ this.changePage }

            // Anand:
            // value={this.state.chipIdx}
            // onClick={value => this.handleStateChange(value)}
          >Submit</Button>
          <ToggleButton
            value={this.state.chipIdx}
            onToggle={value => this.handleStateChange(value)}
          />
        </div>
      );

    } else {

      return (
        <div>
          <Button 
            variant="contained"
            onClick={ this.changePage }

            // Anand (same as above):
            // value={this.state.chipIdx}
            // onClick={value => this.handleStateChange(value)}
          >Back</Button>

          <Output
            chipIdx={this.state.chipIdx}
            chooseChip={this.chooseChip}
          />
        </div>
      )
      
    }
  }

  render() {
    return (
      <div>
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