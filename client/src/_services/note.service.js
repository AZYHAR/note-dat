import { setAuthHeader } from '../_helpers';
import axios from 'axios';

export const noteService = {
    getAll
};

// (??)Find out how to get from specific notebook

function getAll() {
    return axios.get('/api/note')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(err.response.data.message);
        });
}