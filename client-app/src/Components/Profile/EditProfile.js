import React from "react";
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { onLogIn } from "../../Actions/RegistraionActions"
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../Logo/Logo"

import profileImage from "../../Image/profile-icon-png-890.png"

import "./../../index.css"

const bcrypt = require('bcryptjs');

class EditProfile extends Component{
    state = {
        fullName: this.props.User.fullName,
        nickname: this.props.User.nickname,
        password: this.props.User.password,
        email: this.props.User.email,
        birthDate: this.props.User.birthDate,
        image: this.props.User.image,
        isRedirect: false
    }

    setFullName=(e)=>{
        const name = e.target.value;
        this.setState({
            fullName: name
        })
    }
    setNickname=(e)=>{
        const nick = e.target.value;
        this.setState({
            nickname: nick
        })
    }
    setPassword=(e)=>{
        const pass = e.target.value;
        this.setState({
            password: pass
        })
    }
    setEmail=(e)=>{
        const mail = e.target.value;
        this.setState({
            email: mail
        })
    }
    setBitrthDate=(e)=>{
        const date = e.target.value;
        this.setState({
            birthDate: date
        })
    }
    setImage=(e)=>{
        const img = e.target.value;
        this.setState({
            image: img
        })
    }

    OnEditProfile=()=>{
        let { fullName, nickname, password, email, birthDate, image } = this.state;
        const editUser = {
            fullName,
            nickname,
            password,
            email,
            birthDate,
            image
        }
        const { onLogIn } = this.props;
        onLogIn(editUser);
        this.setState({
            isRedirect: true
        })
    }

    render(){
        if (this.state.isRedirect === true) {
            return <Redirect to="/home" />
        }

        return(
            <Fragment>
                <div className="logoReg">
                    <Logo />
                </div>
                <div className="profileContainer2">
                    <div className="infoProfileContainer">
                        <img className="editProfileImage" src={profileImage} alt="Profile"></img>
                            <div className="infoProfile">
                            <div>
                                <span className="editProfilePosts" >Your posts:</span>
                                <span className="editProfilePosts" > 0</span>
                            </div>
                            <div>
                                <span className="editProfileComments" >Your comments:</span>
                                <span className="editProfileComments" > 0</span>
                            </div>
                            <div>
                                <span className="editProfileRating" >Your rating:</span>
                                <span className="editProfileRating" > 0</span>
                            </div>
                        </div>
                    </div>
                    <div className="editProfileContainer">
                        <input type="text" defaultValue={this.state.fullName} onChange={this.setFullName}/>
                        <input type="text" defaultValue={this.state.nickname} onChange={this.setNickname}/>
                        <input type="text" defaultValue={this.state.password} onChange={this.setFullName}/>
                        <input type="text" defaultValue={this.state.email} onChange={this.setFullName}/>
                        <input type="text" defaultValue={this.state.birthDate} onChange={this.setFullName}/>
                        <button onClick={this.OnEditProfile} >Save</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ UserReducer }) => {
    const { User, List } = UserReducer;
    return { User, List };
}
const mapDispatchToProps = {
    onLogIn
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);