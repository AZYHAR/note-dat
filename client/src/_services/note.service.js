import { setAuthHeader } from '../_helpers';
import axios from 'axios';

export const noteService = {
  getAll,
  addNote,
  updateNote,
  deleteNote
};

// (??)Find out how to get from specific notebook

function getAll() {
  return axios
    .get('/api/note')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function addNote(title, body, notebook_id, notebook_move) {
  return axios
    .post('/api/note', { title: title, body: body, notebook_id: notebook_id })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function updateNote(id, title, body, notebook_id) {
  console.log('Service: Updating');
  return axios
    .put('/api/note', {
      id: id,
      title: title,
      body: body,
      notebook_id: notebook_id
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function deleteNote(id, title, body) {
  return axios
    .delete('/api/note', { params: { id: id, title: title, body: body } })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}
