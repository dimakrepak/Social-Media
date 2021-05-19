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
        await axios.post('/api/logout', {}, {
            headers: {
                'Auth': `Bearer ${userCredentials}`
            }
        });
        dispatch({ type: 'LOGOUT_SUCCESS', payload: null })
    } catch (err) {
        dispatch({ type: 'LOGOUT_FAILURE', payload: err });
    }
}
export const updateUser = async (userToken, userCredentials, dispatch) => {
    dispatch({ type: 'UPDATE_START' });
    try {
        const res = await axios.put('/api/users/me',
            {
                ...userCredentials,
            },
            {
                headers: {
                    'Auth': `Bearer ${userToken}`
                }
            })
        dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'UPDATE_FAILURE', payload: err });
    }
}