import React, { Component } from 'react';
import ACTIONS from './../../../redux/action';
import {connect} from 'react-redux';

class DigitButton extends Component {
    state = {  } 

    

    render() { 
        return (<button onClick={() => this.props.add_digit(this.props.digit)}>{this.props.digit}</button>);
    }
}

const mapDispatchToProps = {
    add_digit: digit => {
        return {
            type: ACTIONS.Add_digit,
            digit: digit,
        }
    }
}
 
export default connect(null,mapDispatchToProps)(DigitButton); //第一个参数是把state绑定到当前组件的props中，这里不需要


