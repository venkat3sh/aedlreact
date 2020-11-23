import { userConstants } from "../actionTypes/user.constants";
import { userService } from '../services/user.service';

const login = pw => {
    return dispatch => {
        dispatch(request());

        userService.login(pw)
            .then(
                // if we get a message back, its because the password was wrong
                msg => {
                    msg === '' ? dispatch(success()) : dispatch(failure(msg))
                    // history.push('/');
                },
                error => {
                    console.log(error)
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success() {
        console.log("dispatched login success") 
        return { type: userConstants.LOGIN_SUCCESS } 
    }
    function failure(error) { 
        console.log("dispatched login failure") 
        return { type: userConstants.LOGIN_FAILURE, error } 
    }
};

const logout = () => {
    userService.logout();
    return { type: userConstants.LOGOUT };
};

export const userActions = {
    login,
    logout
}