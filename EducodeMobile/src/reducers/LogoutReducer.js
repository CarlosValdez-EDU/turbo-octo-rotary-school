import {
    LOGOUT
  } from '@constants/Types';
  
  const INITIAL_STATE = {
    emailStatus: null,
    email: 'admin@mail.com',
    password: '123',
    error: '',
    loading: false,
    logedin: false,
    showAlert: false,
    keepLogin: true
  }


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGOUT: {
          console.log('this btn was pressed');
        return { ...state, keepLogin: false };
      }
      default:
        return state;
    }
}