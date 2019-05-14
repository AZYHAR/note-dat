import { notebookConstants } from '../_constants';

const initialState = {
    fetching: false,
    notebooks: []
};

export function notebooks(state = initialState, action) {
    switch (action.type) {
        case notebookConstants.NOTEBOOK_GETALL_REQUEST:
            return {
                fetching: true,
                notebooks: []
            };
        case notebookConstants.NOTEBOOK_GETALL_SUCCESS:
            return {
                notebooks: action.notebooks
            };
        case notebookConstants.NOTEBOOK_GETALL_FAILURE:
            return {
                notebooks: []
            }
        default:
            return state
    }
}