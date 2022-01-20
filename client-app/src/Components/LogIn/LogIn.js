import React from "react";
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { onLogIn } from "../../Actions/RegistraionActions"
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../Logo/Logo"

import "./../../index.css"

const bcrypt = require('bcryptjs');

class LogIn extends Component {
    state = {
        nickname: "",
        password: "",
        isRedirect: false
    }

    getNickname = (e) => {
        const nick = e.target.value;
        this.setState({
            nickname: nick
        })
    }
    getPassword = (e) => {
        const pass = e.target.value;
        this.setState({
            password: pass
        })
    }

    OnLogIn = () => {
        let { nickname, password } = this.state;

        const { onLogIn, List } = this.props;
        console.log("LIST",List);
        List.forEach(el => {
            if (el.nickname == nickname && bcrypt.hashSync(password, el.password)) {
                console.log(el);
                onLogIn(el);
            } else {
                console.log(el.nickname);
                console.log(el.password);
            }
        });

        this.setState({
            isRedirect: true
        })
    }

    render() {
        let { isRedirect } = this.state;
        if (isRedirect === true) {
            return <Redirect to="/home" />
        }
        return (
            <Fragment>
                <div className="logoReg">
                    <Logo />
                </div>
                <div className="containerReg">
                    <form onSubmit={this.OnLogIn}>
                        <div className="loginContainer">
                            <div className="logIn">
                                <div className="loginBox">
                                    <div className="inputLoginContainer" >
                                        <div>
                                            <input className="loginInput" placeholder="Nickname" name="Nickname" type="text" onChange={this.getNickname} />
                                        </div>
                                        <div>
                                            <input className="loginInput" placeholder="Password" name="Password" type="text" onChange={this.getPassword} />
                                        </div>
                                    </div>
                                    <div className="buttonLoginContainer" >
                                        <button type="submit" >
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            Log In
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="containerLog">
                        <div className="loginText">
                            <div className="glitch_c" data-text="Welcome">WELCOME</div>
                            <div className="glow_c">WELCOME</div>
                            <p className="subtitle">Glad to see you</p>
                        </div>
                        <div className="scanlines"></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ UserReducer }) => {
    const { List } = UserReducer;
    return { List };
}
const mapDispatchToProps = {
    onLogIn
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);