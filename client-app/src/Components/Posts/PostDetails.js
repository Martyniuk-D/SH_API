import "../../index.css";
import React from 'react';
import { Component, Fragment, Redirect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";
import { onAddPost } from "../../Actions/PostsActions";
import CommentItem from "./CommentItem";
import apiService from "../../Services/APIService";
import ReactPlayer from 'react-player'
import TextareaAutosize from 'react-textarea-autosize';


class PostDetails extends Component {
    state={
        allComments: [],
        currentComment: "",
        commentItems: []
    }
    animateButton = (e) => {
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },700);
      };

    componentDidMount(){
        const { SelectedPost } = this.props;
        this.setState({
            commentItems: SelectedPost.comments.map(item => {
                return(
                    <CommentItem key={item.id} {...item}/>
                )
            })
        })
        var bubblyButtons = document.getElementsByClassName("bubbly-button");

        for (var i = 0; i < bubblyButtons.length; i++) {
            bubblyButtons[i].addEventListener('click', this.animateButton, false);
        }
    }


    getCurrentComment = (e) =>{
        const comment = e.target.value;
        this.setState({
            currentComment: comment
        })
    }

    AddComment = () =>{
        const { SelectedPost } = this.props;
        const { Posts } = this.props;
        const {onAddPost} = this.props;
        const {User} = this.props;

        let tmpPosts = Posts.slice();

        tmpPosts.forEach(element => {
            if(element === SelectedPost){
                element.comments.push({
                    id: element.comments.length,
                    text: this.state.currentComment,
                    author: User.nickname,
                    postId: SelectedPost.id
                })
            }
        });
        apiService.addComment(SelectedPost.comments[SelectedPost.comments.length-1]);
        onAddPost(tmpPosts);
        this.setState({
            commentItems: SelectedPost.comments.map(item => {
                return(
                    <CommentItem key={item.id} {...item}/>
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
                <div className="postItemContainer">
                    <div className="postItemAuthor">
                        <span>{this.props.SelectedPost.author}</span>
                    </div>
                    <div className="postItemName">
                        {this.props.SelectedPost.name}
                    </div>
                    {this.props.SelectedPost.image != ""
                    ?
                        <div className="postItemImage">
                            <img src={this.props.SelectedPost.image}/>
                        </div>
                    :
                        <div></div>              
                    }
                    {this.props.SelectedPost.video != ""
                    ?
                        <div className="postItemVideo">
                            <ReactPlayer url={this.props.SelectedPost.video} with="500px" controls="false" loop="true"/>
                        </div>
                    :
                        <div></div>              
                    }
                    <div className="postItemDescription">
                        {this.props.SelectedPost.description}
                    </div>
                </div>
                <div className="commentListContainer">
                    {this.state.commentItems.length > 0 ? this.state.commentItems : <h1>Empty</h1>}
                </div>
                <div className="commentListInputContainer">
                    <TextareaAutosize type="text" defaultValue={this.state.currentComment} onChange={this.getCurrentComment}/>
                    {/* <input type="text" defaultValue={this.state.currentComment} onChange={this.getCurrentComment} /> */}
                    <button className="bubbly-button" onClick={this.AddComment} >Add comment</button>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ UserReducer }) => {
    const { SelectedPost, Posts, User } = UserReducer;
    return { SelectedPost, Posts, User };
}
const mapDispatchToProps = {
    onAddPost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);