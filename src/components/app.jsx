import React, { Component } from 'react';
import NavBar from './navbar';
import {Routes, Route, Navigate} from 'react-router-dom'
import Calculator from './content/calculator';
import Home from './content/home';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notFound';
import $ from 'jquery'
import {connect} from 'react-redux'


class App extends Component {
    state = { 
        is_login: true,
        access: "",
        refresh: "",
        username: "",
     } 

     //动态获取当前登录状态
     //ajax一般在componentDidMount()里写，这个函数是在组件挂载完后执行
    //  componentDidMount() {
    //     console.log("access: " + this.props.access);
    //     $.ajax({
    //         url: "http://127.0.0.1:8000/get_status/",
    //         type: "get",
    //         headers: {
    //             'Authorization': "Bearer " + this.props.access,
    //         },
    //         success : resp => {
    //             //console.log(resp);
    //             if (resp.result === "success") {
    //                 this.setState({username: resp.username});
    //                 this.setState({is_login: true});
    //             }
    //         },
    //     })
    //  }

    render() { 
        // console.log("access: " + this.props.access);
        // console.log(this.state.is_login);

        return (
            <React.Fragment>
                <NavBar is_login={this.props.is_login} username={this.props.username} />
                {console.log(this.props.is_login)};
                <div className="container">
                    <Routes>
                        {/* <Route path='/calculator' element={ <Calculator />  } />
                        <Route path='/home' element={  <Home />  } />
                        <Route path='/' element={  <Login />  } />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={ <Register />} /> */}
                        <Route path='/calculator' element={this.props.is_login ? <Calculator /> : <Navigate replace to="/login" /> } />
                        <Route path='/' element={ this.props.is_login ? <Login /> : <Navigate replace to="/login" /> } />
                        <Route path='/login' element={this.props.is_login ? <Navigate replace to="/" /> : <Login />} />
                        <Route path='/register' element={this.props.is_login ? <Navigate replace to="/" /> : <Register />} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path="*" element={ <Navigate replace to="/404" /> } />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
        access: state.access,
        refresh: state.refresh,
        is_login: state.is_login,
        username : state.username,
    }

}
 
export default connect(mapStateToProps)(App);