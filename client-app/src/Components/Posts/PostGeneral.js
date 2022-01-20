import "../../index.css";
import React from 'react';
import { Component, Fragment, Redirect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";
import PostLink from "./PostLink";

class PostGeneral extends Component {
    state={
        userPosts: [],
        userLike: [],
        userComments: [],
        postItems: [],
        likeItems: [],
        commentItems: []
    }


    componentDidMount() {
        const {Posts} = this.props;
        const {User} = this.props;
        const tmpP = [];
        const tmpL = [];
        const tmpC = [];
        console.log("All",Posts);
        Posts.forEach(element => {
            if(element.author == User.nickname){
                tmpP.push(element);
            }
            element.likes.forEach(elL=>{
                if(elL.userId == User.id){
                    tmpL.push(element);
                }
            })
            element.comments.forEach(elC=>{
                if(elC.author == User.nickname){
                    tmpC.push(element);
                }
            })

        });

        this.setState({
            userPosts: tmpP,
            userLike: tmpL,
            userComments: tmpC,
            postItems: tmpP.map(item=>{
                return(
                    <PostLink key={item.id} {...item}/>
                )
            }),
            likeItems: tmpL.map(item=>{
                return(
                    <PostLink key={item.id} {...item}/>
                )
            }),
            commentItems: tmpC.map(item=>{
                return(
                    <PostLink key={item.id} {...item}/>
                )
            })
        })
    }

    render() {
        return (
            <Fragment>
                <div className="logoReg">
                    <Logo />
                </div>
                <div className="PostGeneralContainer" >
                    <div className="InfoPostGeneralContainer">
                    <ul>
                    	<li>
                    		<input type="checkbox" name="item" id="item1" />   
                    		<label for="item1"><i aria-hidden="true" className="icon-users"></i> Your posts <span>{this.state.userPosts.length}</span></label>
                    		<ul className="options">
                                {this.state.postItems}
                    		</ul>
                    	</li>
                        <li>
                    		<input type="checkbox" name="item" id="item2" />   
                    		<label for="item2"><i aria-hidden="true" className="icon-users"></i> Like <span>{this.state.userLike.length}</span></label>
                    		<ul className="options">
                                {this.state.likeItems}
                    		</ul>
                    	</li>
                        <li>
                    		<input type="checkbox" name="item" id="item3" />   
                    		<label for="item3"><i aria-hidden="true" className="icon-users"></i> Comments <span>{this.state.userComments.length}</span></label>
                    		<ul className="options">
                                {this.state.commentItems}
                    		</ul>
                    	</li>
                    </ul> 
                    </div>
                    <div className="AddPostGeneralContainer">
                        <NavLink className="PostGeneralAddButton" to="/add-post">Create new post</NavLink>
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ UserReducer }) => {
    const { User, Posts, List, SelectedPost } = UserReducer;
    return { User, Posts, List, SelectedPost };
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(PostGeneral);