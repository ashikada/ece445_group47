import { Component } from "react";
import chipArr from './chips'

class Output extends Component{
  
  render(){
    // const chips = ['7400', '7402', '7404', '7410', '7420', '7427', '7474', '7485', '7486', '74109N', '74151N', '74153N', '74157N', '74161N', '74163E', '74194A/E', '74195E'];
    // const titleArr = ['Quad 2-Input NAND', 'Quad 2-Input NOR', 'Hex Inverter', 'Triple 3-input NAND', 'Double 4-Input NAND', 'Triple 3-Input NOR', 'Dual D Positive Edge Triggered Flip Flop', '4-bit Magnitude Comparator',
    // 'Quad 2-Input Exlusive-OR', 'Dual JK Flip-Flops', '8 to 1 Multiplexer', 'Dual 4 to 1 Multiplexer', 'Quad 2 to 1 Multiplexer', '4-Bit Synchronous Up-Down Counter', '4-Bit Synchronous Binary Counter', 
    // '4-Bit Bidirectional Universal Shift Register', '4-Bit Bidirectional Universal Shift Register'];

    return(
      <div className="App">
        <h1 className="results-menu">Results</h1>
        <img src={chipArr[this.props.chipIdx]} alt=""/>

        <br/><br/>
        <h3>Something works? Something doesn't?</h3>
      </div>
    );
  }

}

export default Output;