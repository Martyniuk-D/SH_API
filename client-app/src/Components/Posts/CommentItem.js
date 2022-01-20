import "../../index.css";
import React from 'react';
import { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const CommentItem =({id, text, author})=> {

    return (
        <Fragment>
            <div className="commentItemContainer" >
                <div className="commentItemAuthor">
                    <div></div>
                    <span>{author}</span>
                </div>
                <div className="commentItemMessage">
                    {text}
                </div>
            </div>
        </Fragment>
    )
}
const mapStateToProps = ({ UserReducer }) => {
    const { Posts } = UserReducer;
    return { Posts };
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);