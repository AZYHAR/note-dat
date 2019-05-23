import { noteConstants } from '../_constants/note.constants';
import { noteService } from '../_services';
import { alertActions } from './alert.actions';

// We wrapped all Actions creators for easier accessing them in other files
export const noteActions = {
    getAllNotes
};

// This is 1 Action Creator for Note
function getAllNotes(){
    return dispatch => {
        dispatch(request());

        noteService.getAll()
            .then(
                notes => { 
                    dispatch(success(notes.data)); 
                },
                error => { 
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: noteConstants.NOTE_GETALL_REQUEST} }
    function success(notes) { return { type: noteConstants.NOTE_GETALL_SUCCESS, notes } }
    function failure(error) { return { type: noteConstants.NOTE_GETALL_FAILURE, error} }
}