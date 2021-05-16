import { STATES } from "mongoose";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                currentUser: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                currentUser: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                currentUser: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                currentUser: action.payload,
            }
        case "LOGOUT_FAILURE":
            return {
                currentUser: null,
                isFetching: false,
                error: true,
            }
        case "FOLLOW":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: {
                        ...state.currentUser.user,
                        following: [...state.currentUser.user.following, action.payload],
                    }
                }

            };
        case "UNFOLLOW":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: {
                        ...state.currentUser.user,
                        following: state.currentUser.user.following.filter(friend => friend !== action.payload)
                    },
                }

            };
        default:
            return state
    };
};
export default AuthReducer;