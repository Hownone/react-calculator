import React, { Component } from 'react';
import $ from 'jquery'
import '../../register.css'
import { Link, Navigate,useNavigate } from 'react-router-dom';


class Register extends Component {
    state = { 
        username: "",
        password: "",
        confirmed_password: "",
        error_message: "",
     };

     handleClick = e => {
        e.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8000/register/",
            type: "get",
            data: {
                username: this.state.username,
                password: this.state.password,
                password_confirm: this.state.confirmed_password,
            },
            dataType: 'json',
            success: resp => {
                if (resp.result === "success") {
                    window.location.href="/calculator";
                } else {
                       this.setState({error_message: resp.result});
                 }
            }
        });
        console.log(this.state);
       
     }

    render() { 
        return (
            <div className="homeBox">
                <div className="box-container">
                    <div className="sign-box">
                        <div className="apple-btn sign-apple">
                            <li className="red-btn"></li>
                            <li className="yellow-btn"></li>
                            <li className="green-btn"></li>
                        </div>
                        <div className="title">Sign</div>
                        <form>
                            <div className="input">
                                <input onChange={(e) => {this.setState({username: e.target.value})}} type="text" id="sign-user" placeholder="Have A Good Name?" />
                            </div>
                            <div className="input">
                                <input onChange={(e) => {this.setState({password: e.target.value})}}  type="password" id="sign-password" placeholder="Keep Secret" />
                            </div>
                            <div className="input">
                                <input onChange={(e) => {this.setState({confirmed_password: e.target.value})}} type="password" id="password_confirm" placeholder="Confirm Your Password" />
                                <div className='error-message' style={{height: "2rem"}} >
                                    {this.state.error_message}
                                 </div>
                            </div>
                            <button onClick={e => {this.handleClick(e)}} type="submit" className="btn sign-btn">Sign up</button>
                        </form>
                        <div className="change-box sign-change">
                            <div className="change-btn toLogin" onClick={this.gotoLogin}>
                                <Link to={'/login'} style={{textDecoration: "none",color: "white"}}>
                                    <span>Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}
 
export default Register;