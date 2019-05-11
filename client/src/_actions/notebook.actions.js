import { notebookConstants } from '../_constants/notebook.constants';
import { notebookService } from '../_services';

// We wrapped all Actions creators for easier accessing them in other files
export const notebookActions = {
    get_all
};

// This is 1 Action Creator for alert Notebook Actions
function get_all(){
    return dispatch => {
        dispatch(request());

        notebookService.getAll()
        .then(
            notebooks => dispatch(success(notebooks)),
            error => { 
                dispatch(failure(error));
                dispatch(alertActions.error(error))
            }
        );

    };

    function request() { return { type: notebookConstants.GET_ALL_REQUEST} }
    function success(notebooks) { return { type: notebookConstants.GET_ALL_SUCCESS, notebooks } }
    function failure(error) { return { type: noteConstants.GET_ALL_FAILURE, error} }
}