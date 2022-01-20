import "../../index.css";
import React from 'react';
import { Component, Fragment, Redirect } from "react";
import { NavLink } from "react-router-dom";

class Profile extends Component {

    refreshPage(){
      window.location.reload();
    }

    render() {
        return (
            <Fragment>
              <input type="checkbox" id="ham-menu"/>
              <label htmlFor="ham-menu"></label>
              <div className="full-page">
                <div className="profileMenuContainer">
                  <div className="profileMenuPart">
                    <NavLink to="/profile">My profile</NavLink>
                  </div>
                  <div className="profileMenuPart">
                    <NavLink to="/post-general">Posts</NavLink>
                  </div>
                  <div className="profileMenuPart">
                    <NavLink to="/404">Premium</NavLink>
                  </div>
                  <div className="profileMenuPart">
                    <NavLink to="/404">Settings</NavLink>
                  </div>
                  <div className="profileMenuPart">
                    <NavLink to="/404">Support</NavLink>
                  </div>
                  <div className="profileMenuPart">
                    <NavLink to="/home" onClick={this.refreshPage}>Sign out</NavLink>
                  </div>
                </div>
              </div>
            </Fragment>
        )
    }
}

export default Profile;