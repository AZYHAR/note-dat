import { notebookConstants } from '../_constants/notebook.constants';
import { notebookService } from '../_services/notebook.service';
import { alertActions } from './alert.actions';

export const notebookActions = {
  getAllNotebooks,
  addNotebook,
  deleteNotebook,
  renameNotebook,
  sortNotebook
};

function getAllNotebooks() {
  return dispatch => {
    dispatch(request({}));

    notebookService.getAll().then(
      notebooks => {
        dispatch(success(notebooks.data));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: notebookConstants.NOTEBOOK_GETALL_REQUEST };
  }
  function success(notebooks) {
    return { type: notebookConstants.NOTEBOOK_GETALL_SUCCESS, notebooks };
  }
  function failure(error) {
    return { type: notebookConstants.NOTEBOOK_GETALL_FAILURE, error };
  }
}

function addNotebook(title) {
  return dispatch => {
    dispatch(request({}));

    notebookService.addNotebook(title).then(
      notebook => {
        dispatch(success(notebook.data));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: notebookConstants.NOTEBOOK_ADD_REQUEST };
  }
  function success(notebook) {
    return { type: notebookConstants.NOTEBOOK_ADD_SUCCESS, notebook };
  }
  function failure(error) {
    return { type: notebookConstants.NOTEBOOK_ADD_FAILURE, error };
  }
}

function deleteNotebook(id) {
  return dispatch => {
    dispatch(request({}));

    notebookService.deleteNotebook(id).then(
      notebook => {
        dispatch(success(notebook.data));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: notebookConstants.NOTEBOOK_DELETE_REQUEST };
  }
  function success(notebook) {
    return { type: notebookConstants.NOTEBOOK_DELETE_SUCCESS, notebook };
  }
  function failure(error) {
    return { type: notebookConstants.NOTEBOOK_DELETE_FAILURE, error };
  }
}

function renameNotebook(id, title) {
  return dispatch => {
    dispatch(request({}));

    notebookService.renameNotebook(id, title).then(
      notebook => {
        dispatch(success(notebook.data));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: notebookConstants.NOTEBOOK_RENAME_REQUEST };
  }
  function success(notebook) {
    return { type: notebookConstants.NOTEBOOK_RENAME_SUCCESS, notebook };
  }
  function failure(error) {
    return { type: notebookConstants.NOTEBOOK_RENAME_FAILURE, error };
  }
}

function sortNotebook(notebook_id) {
  return dispatch => {
    dispatch(update(notebook_id));
  };

  function update(notebook_id) {
    return { type: notebookConstants.NOTEBOOK_SORT, notebook_id };
  }
}
