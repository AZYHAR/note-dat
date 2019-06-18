import { notebookConstants, userConstants } from '../_constants';

export function notebooks(state = {}, action) {
    switch (action.type) {
        case notebookConstants.NOTEBOOK_GETALL_REQUEST:
            return {
                loading: true
            };
        case notebookConstants.NOTEBOOK_GETALL_SUCCESS:
            return {
                items: action.notebooks.sort(function(a, b) {
                    return new Date(b.creation_date) - new Date(a.creation_date);
                })
            };
        case notebookConstants.NOTEBOOK_GETALL_FAILURE:
            return {
                error: action.error
            };
        case notebookConstants.NOTEBOOK_ADD_REQUEST:
            return {
                loading: true,
                items: state.items
            };
        case notebookConstants.NOTEBOOK_ADD_SUCCESS:
            return {
                items: [action.notebook, ...state.items]
            };
        case notebookConstants.NOTEBOOK_ADD_FAILURE:
            return {
                error: action.error
            };
        case notebookConstants.NOTEBOOK_DELETE_REQUEST:
            return {
                loading: true,
                items: state.items
            };
        case notebookConstants.NOTEBOOK_DELETE_SUCCESS:
            return {
                items: state.items.filter(item => item.id != action.notebook.id)
            };
        case notebookConstants.NOTEBOOK_DELETE_FAILURE:
            return {
                error: action.error
            };
        case notebookConstants.NOTEBOOK_RENAME_REQUEST:
            return {
                loading: true,
                items: state.items
            };
        case notebookConstants.NOTEBOOK_RENAME_SUCCESS:
            return {
                items: [...state.items.filter(item => item.id != action.notebook.id), action.notebook]
            };
        case notebookConstants.NOTEBOOK_RENAME_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
