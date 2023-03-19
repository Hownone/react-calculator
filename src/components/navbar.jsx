import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux';
import ACTIONS from './../redux/action';

class NavBar extends Component {
    state = {  };

    handleClick = () => {
        this.props.set_token("","","");
        this.props.set_login(false);
    }

    render_user = () => {
        if (this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                    <Link className="nav-link active" aria-current="page" to="#">{this.props.username}</Link>
                    <Link onClick={this.handleClick} className="nav-link active" aria-current="page" to="#">LOGOUT</Link>
                </li>
            )
        } else return (
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">login</Link>
                <Link className="nav-link active" aria-current="page" to="/register">register</Link>
            </li>
        )
    }

    render_APP = () => { //是否需要渲染App栏目
        if (this.props.is_login) {
            return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                APP
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                    <li><Link className="dropdown-item" to="/calculator">Calculator</Link></li>
                </ul>
            </li>
            )
        }
        else return "";
    }

    render_photo() {
        if (this.props.is_login) {
            return (
                <img style={{margin: "10px auto", width: "300px", height:"300px"}} src="https://cdn.acwing.com/media/user/profile/photo/118375_lg_e2515ed3ad.jpg" alt="" />

            )
        }
        else return (
            <img style={{margin: "10px auto", width: "300px", height:"300px"}} src="https://avatars.githubusercontent.com/u/83831450?v=4" alt="" />
        )
    }

    render() { 
        return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Web App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Web App</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {this.render_user()}
                            {this.render_APP()}
                            {this.render_photo()}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
        access: state.access,
        refresh: state.refresh,
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
            is_login: is_login,
        }
    }
}

export default  connect(mapStateToProps,mapDispatchToProps) (NavBar);