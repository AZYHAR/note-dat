import { alertConstants } from '../_constants';

// We wrapped all Actions creators for easier accessing them in other files
export const alertActions = {
    success,
    error,
    clear
};

// There are 3 Actions Creators for Alert Actions
function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}