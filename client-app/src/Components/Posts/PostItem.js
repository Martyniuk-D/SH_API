import "../../index.css";
import React from 'react';
import { Component, Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setSelectedPost } from "../../Actions/PostsActions";
import apiService from '../../Services/APIService'
import ReactPlayer from 'react-player'

function find(array,id){
    let tmp=[];
    array.forEach(element=>{
        if(element.postId==id){
            tmp.push(element);
        }
    })
    return tmp;
}

const PostItem =({id,name,description,image,video,author, likes,Posts,setSelectedPost, User})=> {

    const OnComment = () => {
        const index = Posts.findIndex(el => el.id === id);
        const selectedPost = Posts[index];
        setSelectedPost(selectedPost);
    }
    const [count, setCount]= useState(likes.length);
    const OnLikes = () =>{
        let heIs = false;
        likes.forEach(element => {
            if(element.userId == User.id){
                heIs = true;
            }
        });
        if(heIs == false){
            const newLike = {
                id: 0,
                postId: id,
                userId: User.id
            }
            likes.push(newLike)
            setCount(count + 1)
            apiService.addLike(newLike);
            console.log("add");
        }else{
            let index=0;
            let stop = false;
            likes.forEach(element=>{
                if(element.userId == User.id){
                    stop = true;
                }
                if(stop == false){
                    index++;
                }
            })
            console.log("ID: ",likes[index].id);
            apiService.removeLike(likes[index]);
            likes.splice(index, 1);
            setCount(count + -1)
            console.log("remove");
        }
    }
    useEffect(()=>{
        let box = document.getElementById(id);
        likes.forEach(element => {
            if(element.userId == User.id){
                box.click();
                console.log("use");
            }
            console.log(element);
        });
    },[])
    return (
        <Fragment>
            <div className="postItemContainer">
                <div className="postItemAuthor">
                     <span>{author}</span>
                </div>
                <div className="postItemName">
                    {name}
                </div>
                {image != ""
                ?
                    <div className="postItemImage">
                        <img src={image}/>
                    </div>
                    :
                    <div></div>              
                }
                {video != ""
                ?
                    <div className="postItemVideo">
                        <ReactPlayer url={video} with="500px" controls="false" loop="true"/>
                    </div>
                    :
                    <div></div>              
                }
                <div className="postItemDescription">
                    {description}
                </div>
                <div className="postItemActiveContainer">
                    <div className="likePositionContainer">
                        <div className="likeContainer">
                            <input type='checkbox' name="like-checkbox" id={ id} className="like-checkbox"/>
                            <label htmlFor={ id} className="like" onClick={OnLikes} ></label>
                            <span className="likeNumber" >{count}</span>
                        </div>
                    </div>
                    <div className="postItemButton">
                        <NavLink to="post-details">
                            <button onClick = {OnComment} ><b>C<span>om</span>m<span>e</span>nt</b></button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
const mapStateToProps = ({ UserReducer }) => {
    const { Posts, User } = UserReducer;
    return { Posts, User };
}
const mapDispatchToProps = {
    setSelectedPost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);