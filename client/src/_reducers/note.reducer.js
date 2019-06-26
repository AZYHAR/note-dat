import { noteConstants, userConstants } from '../_constants';

export function notes(state = {}, action) {
    switch (action.type) {
        case noteConstants.NOTE_GETALL_REQUEST:
            return {
                loading: true,
                items: [],
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_GETALL_SUCCESS:
            return {
                items: action.notes.sort(function(a, b) {
                    return new Date(b.modified_date) - new Date(a.modified_date);
                }),
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_GETALL_FAILURE:
            return {
                error: action.error,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_ADD_REQUEST:
            return {
                loading: true,
                items: state.items,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_ADD_SUCCESS:
            return {
                items: [action.note, ...state.items],
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_ADD_FAILURE:
            return {
                error: action.error,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_DELETE_REQUEST:
            return {
                loading: true,
                items: state.items,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_DELETE_SUCCESS:
            return {
                items: state.items.filter(item => item.id != action.note.id),
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_DELETE_FAILURE:
            return {
                error: action.error,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_UPDATE_REQUEST:
            return Object.assign({}, state)
        case noteConstants.NOTE_UPDATE_SUCCESS:
            return {
                items: state.items.map(note => note.id === action.note.id ? action.note : note).sort(function(a, b) {
                    return new Date(b.modified_date) - new Date(a.modified_date);
                }),
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_UPDATE_FAILURE:
            return {
                items: state.items,
                error: action.error,
                NoteFullScreen: state.NoteFullScreen,
            };
        case noteConstants.NOTE_RESIZE:
            return {
                items: state.items,
                NoteFullScreen: action.NoteFullScreen,
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
