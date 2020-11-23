import { userConstants } from '../actionTypes/user.constants';

let hasToken = localStorage.getItem('AEDLDashboardToken');
const initialState = {
    isLoggedIn: hasToken ? true : false,
    loginError: false,
    errorMessage: ''
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        isLoggedIn: false,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
        errorMessage: ''
      };
    case userConstants.LOGIN_FAILURE:
      console.log(action.error)
      return {
        ...state,
        loggingIn: false,
        errorMessage: action.error
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state
  }
}