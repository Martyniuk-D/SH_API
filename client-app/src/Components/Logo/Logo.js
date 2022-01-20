import "../../index.css";
import React from 'react';
import { Component, Fragment, Redirect } from "react";
import { NavLink } from "react-router-dom";

class Logo extends Component {
    render() {
        return (
            <Fragment>
                <NavLink to="/home">
                    <div className="signboard">
                        <span>Speek</span>
                        <span className="hub">hub</span>
                    </div>
                </NavLink>
            </Fragment>
        )
    }
}
export default Logo;