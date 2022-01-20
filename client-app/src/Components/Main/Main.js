import React from 'react';
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { getAllUsers } from '../../Actions/RegistraionActions';
import {getAllPosts} from '../../Actions/PostsActions'
import apiService from '../../Services/APIService'
import { useEffect } from "react";
import Logo from '../Logo/Logo';
import Profile from '../Profile/Profile';
import PostList from '../Posts/PostList';

import "../../index.css";

function find(array,id){
    let tmp=[];
    array.forEach(element=>{
        if(element.postId==id){
            tmp.push(element);
        }
    })
    return tmp;
}

const Main = ({ List, getAllUsers, User, SelectedPost, Posts,getAllPosts}) => {

    useEffect(() => {
        apiService.getList().then(data => {
            getAllUsers(data.List);
        })
        let commentsTmp = [];
        let likesTmp = [];
        apiService.getComments().then(data=>{
            commentsTmp = data.Comments;
        })
        apiService.getLikes().then(data=>{
            likesTmp= data.Likes;
        })
        apiService.getPosts().then(data=>{
            let container = [];
            data.Posts.forEach(element => {
                container.push({
                    author: element.author,
                    description: element.description,
                    id: element.id,
                    image: element.image,
                    likes: find(likesTmp,element.id),
                    name: element.name,
                    video: element.video,
                    comments: find(commentsTmp,element.id)
                })
            });
            getAllPosts(container);
        })
    }, [])
    return (
        <Fragment>
            <div className="header container">
                <Logo />
                <div className="login">
                    {User == ""
                        ?
                        <div className="container login">
                            <NavLink to="/registration" className="cbr-a">Registration
                                <span aria-hidden >_</span>
                                <span aria-hidden className="cybr-btn__glitch">Registration_hub</span>
                                <span aria-hidden className="cybr-btn__tag">S-hub</span>
                            </NavLink>
                            <NavLink to="/log-in"  className="cbr-a" >Sign In
                                <span aria-hidden >_</span>
                                <span aria-hidden className="cybr-btn__glitch">Sign In_hub</span>
                                <span aria-hidden className="cybr-btn__tag">S-hub</span>
                            </NavLink>
                        </div>
                        :
                        <div>
                            <div className="typewriter">
                                <h1>Hello, {User.fullName}</h1>
                            </div>
                            <div className="profileContainer">
                                <Profile/>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div>
                <PostList/>
            </div>
        </Fragment>
    )
}

const mapStateToProps = ({ UserReducer }) => {
    const { List, User, SelectedPost, Posts } = UserReducer;
    return { List, User, SelectedPost, Posts };
}
const mapDispatchToProps = {
    getAllUsers,
    getAllPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);