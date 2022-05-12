export const reservationReducer = ( state, action ) => {
    switch (action.type) {
        case '[Reservation] - Update Reservation':
            return {
                ...state,
                isReservationMade: true,
                reservation: {
                    ...state.reservation,
                    ...action.payload,
                },
            }
        
        default:
            return state;
    }
}