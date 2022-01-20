import "../../index.css";
import React from 'react';
import { Component, Fragment, Redirect } from "react";
import { NavLink } from "react-router-dom";
import movie from "../../Video/err.mp4"

class ErrorPage extends Component {

    render() {
        return (
            <Fragment>
                <section className="error-body">
                    <video className="background" preload="auto" loop muted autoPlay >
                        <source src={movie} />
                    </video>
                    <div className="message">
                        <h1 t="404">404</h1>
                        <div className="bottom">
                            <p>You have lost your way</p>
                            <NavLink to="/home" >Return Home</NavLink>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default ErrorPage;