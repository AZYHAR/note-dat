import { noteConstants, userConstants } from '../_constants';

export function notes(state = {}, action) {
    switch (action.type) {
        case noteConstants.NOTE_GETALL_REQUEST:
            return {
                loading: true
            };
        case noteConstants.NOTE_GETALL_SUCCESS:
            return {
                items: action.notes
            };
        case noteConstants.NOTE_GETALL_FAILURE:
            return {
                error: action.error
            };
        case noteConstants.NOTE_ADD_REQUEST:
            return {
                loading: true,
                items: state.items
            };
        case noteConstants.NOTE_ADD_SUCCESS:
            return {
                items: [...state.items, action.note]
            };
        case noteConstants.NOTE_ADD_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
