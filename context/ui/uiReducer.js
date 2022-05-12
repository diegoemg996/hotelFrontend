
export const uiReducer = ( state, action ) => {

   switch (action.type) {
      case '[Ui] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
          }
      case '[Ui] - CloseLogin':
         return {
            ...state,
            isLoginOpen: false
            }
      case '[Ui] - OpenLogin':
         return {
            ...state,
            isLoginOpen: true
            }
      case '[Ui] - CloseRegister':
         return {
            ...state,
            isRegisterOpen: false
            }
      case '[Ui] - OpenRegister':
         return {
            ...state,
            isRegisterOpen: true
            }
       default:
          return state;
   }

}