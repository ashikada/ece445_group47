import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
// import ToggleButton from 'react-toggle-button';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
    const chips = ['7400', '7402', '7404', '7410', '7420', '7427', '7474', '7485', '7486', '74109N', '74151N', '74153N', '74157N', '74161N', '74163E', '74194A/E', '74195E', 'SN74LS279'];
    const items = [];

    for (const [index, value] of chips.entries()) {
      items.push(
        <DropdownItem key={index}>{value}</DropdownItem>
      )
    }

    return (
      <React.Fragment>
        <h1 className="App">Automatic IC Chip Tester</h1>
        <h6 className="App">by Alison Shikada, Michael Ruscito, and Ryan Yoseph</h6>
        <br/>

        <Dropdown className="App">
          <DropdownToggle variant="light" id="dropdown-basic">
            Dropdown Button
          </DropdownToggle>

          <DropdownMenu>
            {// href="#/action-1" for link to new webpage 
            }
            {items}
          </DropdownMenu>  
        </Dropdown>
      </React.Fragment>
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