import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Component, Fragment } from "react";
import { v4 as uuidv4 } from "uuid"
import { connect } from "react-redux";

import { onRegistration } from "../../Actions/RegistraionActions";
import apiService from "../../Services/APIService";

import "../../index.css";
import Logo from "../Logo/Logo";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const bcrypt = require('bcryptjs')

class Registration extends Component {
    state = {
        fullName: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        email: "",
        birthDate: "",
        image: "",
        isRedirect: false,
        maxDate: "",
        minDate: ""
    }

    getFullName = (e) => {
        const name = e.target.value;
        this.setState({
            fullName: name
        })
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
            password: bcrypt.hashSync(pass, 10)
        })
    }
    getConfirmPassword = (e) => {
        const conf = e.target.value;
        this.setState({
            confirmPassword: conf
        })
    }
    getEmail = (e) => {
        const email = e.target.value;
        this.setState({
            email: email
        })
    }
    getBirthDate = (e) => {
        console.log(e)
        let date = e;
        this.setState({
            birthDate: date
        })
    }
    dateFocus = () => {
        let label = document.getElementById("dateL");
        label.classList = "dateLabel";
    }
    dateBlur = () => {
        let label = document.getElementById("dateL");
        label.classList = "dateLabelClose";
    }


    OnRegistration = () => {
        let { fullName, nickname, password, email, birthDate, image } = this.state;

        const newUser = {
            id: 0,
            fullName,
            nickname,
            password,
            email,
            birthDate,
            image
        }
        const { onRegistration } = this.props;
        const { List } = this.props;

        let tmpList = List.slice();
        tmpList.unshift(newUser);
        apiService.addUser(newUser);
        onRegistration(tmpList);
        this.setState({
            isRedirect: true
        })
    }
    componentDidMount() {
        let max = new Date();
        this.setState({
            maxDate: max
        });
        let min = new Date();
        min.setFullYear(min.getFullYear() - 100);
        console.log(min);
        this.setState({
            minDate: min
        });

        /* Text */
        let textBox = document.querySelector('.screen');
        let text = textBox.innerText;
        let newHTML = '';
        let stop = 0;

        function init() {
            for (let i = 0; i < text.length; i++) {
                if (text[i] == "\r" || text[i] == "/n") {
                    newHTML += '<br>';
                } else {
                    newHTML += '<span>' + text[i] + '</span>';
                }
            }
            textBox.innerHTML = newHTML;

            let spans = textBox.querySelectorAll('span'),
                count = 0,
                timeout = 150;

            function typing_text() {
                spans[count].classList.add('visible');
                if (stop < spans.length - 1) {
                    if (count < spans.length - 1) {
                        setTimeout(() => {
                            count++;
                            typing_text();
                        }, timeout);
                    } else {
                        setTimeout(() => {
                            newHTML = '';
                            init();
                        }, 2000);

                    }
                    stop++;
                }
            }
            typing_text();
        }
        init();
    }


    render() {
        let { isRedirect, birthDate, maxDate, minDate } = this.state;
        if (isRedirect === true) {
            return <Redirect to="/home" />
        }
        return (
            <Fragment>
                <div className="logoReg">
                    <Logo />
                </div>
                <div className="containerReg">
                    <form className="register" onSubmit={this.OnRegistration}>
                        <div className="rowR">
                            <input className="swing" placeholder="Your full name" id="name" name="name" type="text" onChange={this.getFullName} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="rowR">
                            <input className="swing" placeholder="Others will see you under this name" id="nick" name="nick" type="text" onChange={this.getNickname} />
                            <label htmlFor="nick">Nick</label>
                        </div>
                        <div className="rowR">
                            <input className="swing" placeholder="Your security password" id="password" name="password" type="text" onChange={this.getPassword} />
                            <label htmlFor="password">Pass</label>
                        </div>
                        <div className="rowR">
                            <input className="swing" placeholder="Confirm your password" id="cinfirm_Password" name="cinfirm_Password" type="text" onChange={this.getConfirmPassword} />
                            <label htmlFor="cinfirm_Password">Pass</label>
                        </div>
                        <div className="rowR">
                            <input className="swing" placeholder="Your email" id="email" name="email" type="email" onChange={this.getEmail} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="dateContainer">
                            <ReactDatePicker minDate={minDate} maxDate={maxDate} onFocus={this.dateFocus} onBlur={this.dateBlur} placeholderText="Enter yor birth day" id="dateR" className="dateR" selected={birthDate} onChange={this.getBirthDate} />
                            <label id="dateL" className="dateLabelClose" htmlFor="dateR">Day</label>
                        </div>
                        <div>
                            <button className="buttonR" type="submit" ></button>
                        </div>
                    </form>
                    <div className="screen textReg">Register and become part of our friendly company. Communication without borders.</div>
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
    onRegistration
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);