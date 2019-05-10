import { notebookConstants } from '../_constants/notebook.constants';

export const notebookActions = {
    get_all
};

function get_all(){
    return dispatch => {
        dispatch(request());
    };

    function request() { return { type: notebookConstants.NOTEBOOKS_GET_REQUEST } }
    function success(notebook) { return { type: notebookConstants.NOTEBOOKS_GET_SUCCESS, notebook } }
    function failure(error) { return { type: noteConstants.NOTEBOOOKS_GET_FAILURE, error} }
}