import {  useEffect, useReducer } from 'react';
import { ReservationContext, reservationReducer } from './';


const RESERVATION_INITIAL_STATE = {
    reservation : {},
    isReservationMade : false
}


export const ReservationProvider = ({ children }) => {

    const [state, dispatch] = useReducer( reservationReducer , RESERVATION_INITIAL_STATE );

    useEffect(() => {
        checkReservation();
    }, [])
    

    const checkReservation = () => {
        const localReservation = JSON.parse(localStorage.getItem('reservation'));

        if(!localReservation) {
            return;
        }
        dispatch({type: '[Reservation] - Update Reservation', payload: localReservation})

    }

    const handleUpdateReservation = (reservation) => {
        dispatch({type: '[Reservation] - Update Reservation', payload: reservation})
        const localReservation = JSON.parse(localStorage.getItem('reservation'));
        localStorage.setItem('reservation', JSON.stringify({...localReservation, ...reservation}));
    }


    return (
        <ReservationContext.Provider value={{
            ...state,
            handleUpdateReservation
        }}>
            { children }
        </ReservationContext.Provider>
    )
};