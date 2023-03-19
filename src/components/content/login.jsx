import React, { Component } from 'react';
import '../../login.css';
import $ from 'jquery'
import { Link,Navigate , useNavigate } from 'react-router-dom';
import ACTIONS from '../../redux/action';
import {connect} from 'react-redux'

class Login extends Component {
    state = { 
        error_message: "",
        username: "",
        password: "",
     };

     handleClick = e => {
        e.preventDefault();
        if (this.state.username === "") {
            this.setState({error_message: "用户名不能为空"});
        } else if (this.state.password === "") {
            this.setState({error_message: "密码不能为空"});
        } else {
                $.ajax({
                    url: "http://127.0.0.1:8000/token/",
                    type: "post",
                    data: {
                        username: this.state.username,
                        password: this.state.password,
                    },
                    dataType: 'json',
                    success: (resp) => {
                        console.log(resp);
                        this.props.set_token(resp.access,resp.refresh,this.state.username);
                        this.props.set_login(true);
                     },
                    error() {
                        this.setState({error_message: "用户名或密码错误"});
                     }
                })

        }
        //console.log(this.state);
     }

    render() { 
        if (this.props.is_login) {
            return <Navigate push to="/calculator" />
        }
        return (
            <div className="homeBox">
                <div className="box-container">
                    <div className="login-box">
                        <div className="apple-btn login-apple">
                            <li className="red-btn"></li>
                            <li className="yellow-btn"></li>
                            <li className="green-btn"></li>
                        </div>
                        <div className="title">Login</div>
                        <form >
                            <div className="input">
                                <input onChange={(e) => {this.setState({username: e.target.value})}} type="text" id="login-user" placeholder="Input your username" />
                            </div>
                            <div className="input">
                                <input onChange={e => {this.setState({password: e.target.value})}} type="password" id="login-password" placeholder="Input your password" />
                                <div className='error-message' style={{height: "2rem"}} >
                                    {this.state.error_message}
                                 </div>
                            </div>
                            <button onClick={e => {this.handleClick(e)}} type="submit" className="btn login-btn">Sign in</button>
                        </form>
                        <div className="change-box login-change">
                            <div className="change-btn toSign">
                                <Link to={'/register'} style={{textDecoration: "none",color: "black"}}>
                                    <span>Register</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
        access: state.access,
        refresh: state.refresh,
        is_login: state.is_login,
    }

}
 

const mapDispatchToProps = {
    set_token: (access,refresh,username) => {
        return {
            type: ACTIONS.Set_token,
            access: access,
            refresh: refresh,
            username: username,
        }
    },
    set_login: (is_login) => {
        return {
            type: ACTIONS.Set_login,
            is_login: is_login
        }
    }
}
 
 
export default connect(mapStateToProps,mapDispatchToProps)(Login);