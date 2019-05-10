import { noteConstants } from '../_constants/note.constants';

export const noteActions = {
    get_all
};

function get_all(){
    return dispatch => {
        dispatch(request());
    };

    function request() { return { type: noteConstants.NOTE_GET_REQUEST } }
    function success(note) { return { type: noteConstants.NOTE_GET_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.NOTE_GET_FAILURE, error} }
}