import React, { Component } from 'react';
import Base from './base';
import {connect} from 'react-redux'
import DigitButton from './calculator/digitButton';
import ACTIONS from './../../redux/action';
import OperationButton from './calculator/operationButton';

class Calculator extends Component {
    state = { 
        formater: Intl.NumberFormat('en-us')
     } 

     format(number) {
        if (number === "除数不能为0") return number;
        const [integer,decimal] = number.split('.');
        if (decimal === undefined) return this.state.formater.format(integer);
        return `${this.state.formater.format(integer)}.${decimal}`;
     }

    render() { 
        return (
            <Base>
                <div className="calculator">
                    <div className="output">
                        <div className="last-output">
                            {this.format(this.props.lastOperand)} {this.props.operation}
                        </div>
                        <div className="current-output">
                            {this.format(this.props.currentOperand)}
                        </div>
                    </div>
                    <OperationButton operation='CE'>CE</OperationButton>
                    <button onClick={this.props.delete_digit}>DEL</button>
                    <OperationButton operation='sqr'></OperationButton>
                    <OperationButton operation='÷'></OperationButton>
                    <DigitButton digit={"7"}></DigitButton>
                    <DigitButton digit={"8"}></DigitButton>
                    <DigitButton digit={"9"}></DigitButton>
                    <OperationButton operation='×'></OperationButton>
                    <DigitButton digit={"4"}></DigitButton>
                    <DigitButton digit={"5"}></DigitButton>
                    <DigitButton digit={"6"}></DigitButton>
                    <OperationButton operation='-'></OperationButton>
                    <DigitButton digit={"1"}></DigitButton>
                    <DigitButton digit={"2"}></DigitButton>
                    <DigitButton digit={"3"}></DigitButton>
                    <OperationButton operation='+'></OperationButton>
                    <button>+/-</button>
                    <DigitButton digit={"0"}></DigitButton>
                    <DigitButton digit={'.'}></DigitButton>
                    <button onClick={this.props.evaluate}>=</button>
                </div>
            </Base>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
        currentOperand: state.currentOperand,
        lastOperand: state.lastOperand,
        operation: state.operation,
        password: state.password,
        username: state.username,
    }

}

const mapDispatchToProps = {
    delete_digit: () => {
        return {
            type: ACTIONS.Delete_digit,
        }
    },
    evaluate: () => {
        return {
            type: ACTIONS.Evaluate,
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Calculator);