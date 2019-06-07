import { noteConstants, userConstants } from '../_constants';

export function notes(state = {}, action) {
    switch (action.type) {
        case noteConstants.NOTE_GETALL_REQUEST:
            return {
                loading: true,
                items: []
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
        case noteConstants.NOTE_UPDATE_REQUEST:
            return Object.assign({}, state)
        case noteConstants.NOTE_UPDATE_SUCCESS:
            return {
                items: state.items.map(note => note.id === action.note.id ? action.note : note)
            };
        case noteConstants.NOTE_UPDATE_FAILURE:
            return {
                items: state.items,
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
