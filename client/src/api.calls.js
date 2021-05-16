import axios from 'axios';
export const loginPost = async (userCredentials, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post('/api/login', userCredentials);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
    }
}
export const registerPost = async (userCredentials, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post('/api/register', userCredentials);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
    }
}
export const logoutPost = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post('/api/logout', {}, {
            headers: {
                'Auth': `Bearer ${userCredentials}`
            }
        });
        dispatch({ type: 'LOGOUT_SUCCESS', payload: null })
    } catch (err) {
        dispatch({ type: 'LOGOUT_FAILURE', payload: err });
    }
}