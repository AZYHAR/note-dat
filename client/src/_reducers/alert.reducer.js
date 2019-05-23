import { alertConstants } from '../_constants';

// The redux alert reducer manages the application state for alerts / toaster notifications
// It updates state when an alert action is dispatched from anywhere in the application
export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}