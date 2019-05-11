import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// The redux authentication reducer manages the state related to login (and logout) actions, 
// on successful login the current user object and a loggedIn flag are stored in the authentication 
// section of the application state.
export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.SIGNUP_REQUEST:
            return {
                signingUp: true,
                user: action.user
            };
        case userConstants.SIGNUP_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.SIGNUP_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}