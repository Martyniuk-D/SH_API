class APIService {

    URL = "/User/get-all-users"
    URL_POST = "/Post/get-all-posts"
    URL_COMMENT = "/Comment/get-all-comments"
    URL_LIKE = "/Like/get-all-likes"
    URL_ADD_USER = "/User/add-user"
    URL_ADD_POST = "/Post/add-post"
    URL_ADD_COMMENT = "/Comment/add-comment"
    URL_ADD_LIKE = "/Like/add-like"
    URL_REMOVE_LIKE ="/Like/remove"


    async getList() {
        const List = await fetch(this.URL).then(response => {
            return response.json();
        }).then(data => {
            if (data == null) {
                return {
                    List: []
                }
            } else {
                return {
                    List: data
                }
            }
        })
            .catch(err => console.log(err))
        return List;
    }
    async getPosts() {
        const Posts = await fetch(this.URL_POST).then(response => {
            return response.json();
        }).then(data => {
            if (data == null) {
                return {
                    Posts: []
                }
            } else {
                return {
                    Posts: data
                }
            }
        })
            .catch(err => console.log(err))
        return Posts;
    }
    async getComments() {
        const Comments = await fetch(this.URL_COMMENT).then(response => {
            return response.json();
        }).then(data => {
            if (data == null) {
                return {
                    Comments: []
                }
            } else {
                return {
                    Comments: data
                }
            }
        })
            .catch(err => console.log(err))
        return Comments;
    }
    async getLikes() {
        const Likes = await fetch(this.URL_LIKE).then(response => {
            return response.json();
        }).then(data => {
            if (data == null) {
                return {
                    Likes: []
                }
            } else {
                return {
                    Likes: data
                }
            }
        })
            .catch(err => console.log(err))
        return Likes;
    }

    async addUser(newUser) {
        fetch(this.URL_ADD_USER, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newUser)
        })
    }
    async addPost(newPost) {
        fetch(this.URL_ADD_POST, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newPost)
        })
    }
    async addComment(newComment) {
        fetch(this.URL_ADD_COMMENT, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newComment)
        })
    }
    async addLike(newLike) {
        console.log("API ADD LIKE: ",newLike);
        fetch(this.URL_ADD_LIKE, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newLike)
        })
    }
    async removeLike(removedLike){
        console.log("API ID: ",JSON.stringify(removedLike));
        await fetch(this.URL_REMOVE_LIKE,{
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify(removedLike)
        })
    }

}
const apiService = new APIService();
export default apiService;