import React from "react";
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import chipArr from './chips'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chipIdx:0
    };
  }

  chooseChip(chipIndex){
    this.setState({chipIdx: chipIndex})
  }

  render() {
    const chips = ['7400', '7402', '7404', '7410', '7420', '7427', '7474', '7485', '7486', '74109N', '74151N', '74153N', '74157N', '74161N', '74163E', '74194A/E', '74195E'];
    const titleArr = ['Quad 2-Input NAND', 'Quad 2-Input NOR', 'Hex Inverter', 'Triple 3-input NAND', 'Double 4-Input NAND', 'Triple 3-Input NOR', 'Dual D Positive Edge Triggered Flip Flop', '4-bit Magnitude Comparator',
    'Quad 2-Input Exlusive-OR', 'Dual JK Flip-Flops', '8 to 1 Multiplexer', 'Dual 4 to 1 Multiplexer', 'Quad 2 to 1 Multiplexer', '4-Bit Synchronous Up-Down Counter', '4-Bit Synchronous Binary Counter', 
    '4-Bit Bidirectional Universal Shift Register', '4-Bit Bidirectional Universal Shift Register'];
    const items = [];

    for (const [index, value] of chips.entries()) {
      items.push(
        <DropdownItem 
          key={index}
          onClick={() => this.chooseChip(index)}
        >
          {value}
        </DropdownItem>
      )
    }


    return (
      <div className="App">
        <h1>Automatic IC Chip Tester</h1>
        <h6>by Alison Shikada, Michael Ruscito, and Ryan Yoseph</h6>
        <br/>

        <Dropdown>
          <DropdownToggle variant="light" id="dropdown-basic">
            {chips[this.state.chipIdx]}
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu">
            {/* href="#/action-1" for link to new webpage  */}
            {items}
          </DropdownMenu>  
        </Dropdown>

        <br/><br/>

        <h2>{titleArr[this.state.chipIdx]}</h2>

        <br/>
        <img src={chipArr[this.state.chipIdx]} alt=""/>

        <br/><br/><br/>

      </div>
    );
  }
}

export default Home;