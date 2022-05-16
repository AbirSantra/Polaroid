// !This file is a single reducer.
// ?This reducer accepts the current state (here, the posts array) and an action.
// ?Then it returns the state after performing that action.

import {
    CREATE,
    FETCH_ALL,
    UPDATE,
    DELETE,
    LIKE,
    START_LOADING,
    END_LOADING,
    FETCH_POST,
    COMMENT,
} from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default reducer;
