import "../../index.css";
import React from 'react';
import { Component, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PostItem from "./PostItem";

const PostList = ({Posts}) => {

    useEffect(()=>{

    }, [])

    const items = Posts.map(listItem=>{
        return(
            <PostItem key={listItem.id} {...listItem}/>
        )
    });

    return (
        <Fragment>
            {items.length > 0 ? items : <h1>Empty</h1>}
        </Fragment>
    )
}
const mapStateToProps = ({ UserReducer }) => {
    const { Posts} = UserReducer;
    return { Posts};
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);