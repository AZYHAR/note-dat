import { setAuthHeader } from '../_helpers';
import axios from 'axios';

export const noteService = {
    getAll,
    addNote
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

function addNote(title, body, notebook_id) {
    return axios.post('/api/note', { 'title': title, 'body' : body, 'notebook_id': notebook_id })
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            return Promise.reject(err.response.data.message);
        });
}