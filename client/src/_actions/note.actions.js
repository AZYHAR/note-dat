import { noteConstants } from '../_constants/note.constants';
import { noteService } from '../_services'

// We wrapped all Actions creators for easier accessing them in other files
export const noteActions = {
    get_all
};

// This is 1 Action Creator for Note
function get_all(){
    return dispatch => {
        dispatch(request());

        noteService.getAll()
            .then(
                notes => dispatch(success(notes)),
                error => { 
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: noteConstants.GET_ALL_REQUEST} }
    function success(notes) { return { type: noteConstants.GET_ALL_SUCCESS, notes } }
    function failure(error) { return { type: noteConstants.GET_ALL_FAILURE, error} }
}