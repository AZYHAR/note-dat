import { noteConstants } from '../_constants/note.constants';
import { noteService } from '../_services';
import { alertActions } from './alert.actions';

// We wrapped all Actions creators for easier accessing them in other files
export const noteActions = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote
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

function addNote(title, body, notebook_id, notebook_move) {
    return dispatch => {
        dispatch(request({}));

        noteService.addNote(title, body, notebook_id, notebook_move)
            .then(
                note => {
                    dispatch(success(note.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: noteConstants.NOTE_ADD_REQUEST } }
    function success(note) { return { type: noteConstants.NOTE_ADD_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.NOTE_ADD_FAILURE, error } }
}

function updateNote(id, title, body, notebook_id){
    console.log('Actions: updating');
    return dispatch => {
        dispatch(request({}));
        console.log('Request dispatched');
        noteService.updateNote(id, title, body, notebook_id)
            .then(
                note => {
                    dispatch(success(note.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    }

    function request() { return { type: noteConstants.NOTE_UPDATE_REQUEST } }
    function success(note) { return { type: noteConstants.NOTE_UPDATE_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.NOTE_UPDATE_FAILURE, error } }
}

function deleteNote(id, title, body) {
    return dispatch => {
        dispatch(request({}));

        noteService.deleteNote(id, title, body)
            .then(
                note => {
                    dispatch(success(note.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: noteConstants.NOTE_DELETE_REQUEST } }
    function success(note) { return { type: noteConstants.NOTE_DELETE_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.NOTE_DELETE_FAILURE, error } }
}