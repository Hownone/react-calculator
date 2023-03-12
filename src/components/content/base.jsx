import React, { Component } from 'react';

class Base extends Component {
    state = {  } 
    render() { 
        console.log(this.props);
        return (
            <div className="card" style={{marginTop: "20px"}}>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default Base;