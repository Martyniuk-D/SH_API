import "../../index.css";
import React from 'react';
import { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setSelectedPost } from "../../Actions/PostsActions";

const PostLink =({id, name, description, setSelectedPost,Posts})=> {

    const desc = description.slice(0,20) + "...";
    const OnComment = () => {
        const index = Posts.findIndex(el => el.id === id);
        const selectedPost = Posts[index];

        setSelectedPost(selectedPost);
    }

    return (
        <Fragment>
            <NavLink to="post-details" onClick = {OnComment}>
                    <li><a href="#"><i aria-hidden="true" className="icon-search"></i> {name}
                    <span className="desc">{desc}</span></a></li>
            </NavLink>
        </Fragment>
    )
}
const mapStateToProps = ({ UserReducer }) => {
    const { Posts } = UserReducer;
    return { Posts };
}
const mapDispatchToProps = {
    setSelectedPost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostLink);