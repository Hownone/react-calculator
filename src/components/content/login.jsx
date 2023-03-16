import React, { Component } from 'react';
import '../../login.css';
import $ from 'jquery'

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
                url: "http://127.0.0.1:8000/login/",
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: 'json',
                success(resp) {
                    console.log(resp);
                    if (resp.result === "success") {
                        //js重定向，登陆成功后直接跳转到计算器页面
                        window.location.href="/calculator";
                    } else {
                        this.setState({error_message: resp.result});
                    }
                },
                error() {
                    this.setState({error_message: "系统获取数据失败QAQ"});
                }
            })

        }
        console.log(this.state);

     }

    render() { 
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
                                <span>Register</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Login;