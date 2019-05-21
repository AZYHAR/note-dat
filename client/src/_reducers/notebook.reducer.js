import { notebookConstants, userConstants } from '../_constants';

export function notebooks(state = {}, action) {
    switch (action.type) {
        case notebookConstants.NOTEBOOK_GETALL_REQUEST:
            return {
                loading: true
            };
        case notebookConstants.NOTEBOOK_GETALL_SUCCESS:
            return {
                items: action.notebooks
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
                items: [...state.items, action.notebook]
            };
        case notebookConstants.NOTEBOOK_ADD_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
