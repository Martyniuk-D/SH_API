export const getAllPosts = (posts) => {
    return {
        type: "GETPOSTS",
        payload: posts
    }
}
export const onAddPost = (posts) => {
    return {
        type: "ADDPOST",
        payload: posts
    }
}
export const setSelectedPost = (selectedPost) => {
    return {
        type: "SETSELECTEDPOST",
        payload: selectedPost
    }
}