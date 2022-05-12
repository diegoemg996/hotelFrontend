import {  useEffect, useReducer } from 'react';
import { apiDb } from '../../api/apiDb';
import { AuthContext, authReducer } from './';


const AUTH_INITIAL_STATE = {
    user : {},
    isLoggedIn: false,
}


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer , AUTH_INITIAL_STATE );

    useEffect(() => {
        checkToken();
    }, [])
    

    const checkToken = async () => {

        try {
            let tokenLocal = JSON.parse(localStorage.getItem('token'))
            const {data} = await apiDb.post('/usuarios/verify-token', {token: tokenLocal})
            const {token} = data;
            localStorage.setItem('token', JSON.stringify(token))
            dispatch({type: '[Auth] - Login', payload: data}) 
        } catch ({response}) {
            localStorage.removeItem('token');
        }

    }

    const handleLogin = (user) => {

        console.log("auth login", user)

        dispatch({type: '[Auth] - Login', payload: user})

        localStorage.setItem('token', JSON.stringify(user.token))
    }

    const handleLogout = () => {
        dispatch({type: '[Auth] - Logout'})
        localStorage.removeItem('token')
        localStorage.removeItem('reservation')
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            handleLogin,
            handleLogout
        }}>
            { children }
        </AuthContext.Provider>
    )
};