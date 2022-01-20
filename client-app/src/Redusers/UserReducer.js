const initialState = {
    List: [],
    Posts: [],
    User: "",
    SelectedPost: "",
    Likes: []
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case "REGISTRATION":
            return {
                ...state,
                List: action.payload
            }
        case "GET":
            return {
                ...state,
                List: action.payload
            }
        case "LOGIN":
            return {
                ...state,
                User: action.payload
            }
        case "GETPOSTS":
            return{
                ...state,
                Posts: action.payload
            }
        case "ADDPOST":
            return{
                ...state,
                Posts: action.payload
            }
        case "SETSELECTEDPOST":
            return{
                ...state,
                SelectedPost: action.payload
            }

        default: return state;
    }
}

export default UserReducer;