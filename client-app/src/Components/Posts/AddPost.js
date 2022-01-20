import "../../index.css";
import React from 'react';
import { Component, Fragment } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";

import { onAddPost } from "../../Actions/PostsActions";
import apiService from "../../Services/APIService";

class AddPost extends Component {
    state = {
        name:"",
        description:"",
        image:"",
        video:"",
        author: this.props.User.nickname,
        isRedirect: false
    }
    getName=(e)=>{
        const tmp = e.target.value;
        this.setState({
            name: tmp
        })
    }
    getDesc=(e)=>{
        const desc = e.target.value;
        this.setState({
            description: desc
        })
    }
    getImage=(e)=>{
        const img = e.target.value;
        this.setState({
            image: img
        })
    }
    getVideo=(e)=>{
        const v = e.target.value;
        this.setState({
            video: v
        })
    }

    AddNewPost=()=>{
        let {name, description, image, video, author} = this.state;
        const newPost={
            id: this.props.Posts.length + 1,
            name,
            description,
            image,
            video,
            author,
            comments: [],
            likes: []
        }

        const {onAddPost} = this.props;
        const {Posts} = this.props;
        let tmpPosts = Posts.slice();
        tmpPosts.unshift(newPost);
        apiService.addPost(newPost);
        onAddPost(tmpPosts);
        console.log(this.props.User);
        this.setState({
            isRedirect: true
        })

    }

    render() {
        let { isRedirect} = this.state;
        if (isRedirect === true) {
            return <Redirect to="/post-general" />
        }
        return (
            <Fragment>
                <div className="logoReg">
                    <Logo />
                </div>
                <div>
                    <form className="addPostContainerForm" onSubmit={this.AddNewPost}>
                        <div className="addPostContainer">
                            <div className="addPostInputContainer">
                                <input placeholder="Name of post" id="nameOfPost" type="text" onChange={this.getName}/>
                            </div>
                            <div className="addPostInputContainer">
                                <input placeholder="Description" id="description" type="text" onChange={this.getDesc} />
                            </div>
                            <div className="addPostInputContainer">
                                <input placeholder="Image URL" id="photo" type="text" onChange={this.getImage} />
                            </div>
                            <div className="addPostInputContainer">
                                <input placeholder="Video URL" id="video" type="text" onChange={this.getVideo} />
                            </div>
                            <div className="addPostButtonContainer">
                                <button type="submit" >Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ UserReducer }) => {
    const { User, Posts } = UserReducer;
    return { User, Posts };
}
const mapDispatchToProps = {
    onAddPost
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);