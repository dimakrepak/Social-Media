import { createContext, useReducer, useEffect } from "react";
import AuthReducer from './AuthReducer'

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isFetching: false,
    error: false,
};
export const AuthContext = createContext(initialState)
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    }, [state.currentUser])
    
    console.log(state.currentUser)
    return (
        <AuthContext.Provider
            value={{
                currentUser: state.currentUser,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>

    )
}