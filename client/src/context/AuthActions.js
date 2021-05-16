export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});
export const LoginSuccess = (currentUser) => ({
    type: "LOGIN_SUCCESS",
    payload: currentUser,
});
export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});
export const LogoutSuccess = (currentUser) => ({
    type: "LOGOUT_SUCCESS",
    payload: currentUser,
});
export const LogoutFailure = (error) => ({
    type: "LOGOUT_FAILURE",
    payload: error
});
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});