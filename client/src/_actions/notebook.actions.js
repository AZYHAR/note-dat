import { notebookConstants } from '../_constants/notebook.constants';
import { notebookService } from '../_services/notebook.service';
import { alertActions } from './alert.actions';

export const notebookActions = {
    getAllNotebooks
};

function getAllNotebooks() {
    return dispatch => {
        dispatch(request({}));

        notebookService.getAll()
            .then(
                notebooks => {
                    dispatch(success(notebooks.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(notebooks) { return { type: notebookConstants.NOTEBOOK_GETALL_REQUEST, notebooks } }
    function success(notebooks) { return { type: notebookConstants.NOTEBOOK_GETALL_SUCCESS, notebooks } }
    function failure(error) { return { type: notebookConstants.NOTEBOOK_GETALL_FAILURE, error } }
}