import {  useReducer } from 'react';
import { UiContext, uiReducer } from './';


const UI_INITIAL_STATE = {
    isMenuOpen: false,
    isLoginOpen: false,
    isRegisterOpen: false,
}


export const UIProvider = ({ children }) => {

    

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({type: '[Ui] - ToggleMenu'})
    }

    const closeLogin = () => {
        dispatch({type: '[Ui] - CloseLogin', payload: false})
    }

    const openLogin = () => {
        dispatch({type: '[Ui] - OpenLogin', payload: true})
    }

    const closeRegister = () => {
        dispatch({type: '[Ui] - CloseRegister', payload: false})
    }

    const openRegister = () => {
        dispatch({type: '[Ui] - OpenRegister', payload: true})
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleSideMenu,
            closeLogin,
            openLogin,
            closeRegister,
            openRegister
        }}>
            { children }
        </UiContext.Provider>
    )
};