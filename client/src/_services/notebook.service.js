import { setAuthHeader } from '../_helpers';
import axios from 'axios';

export const notebookService = {
  getAll,
  addNotebook,
  deleteNotebook,
  renameNotebook
};

function getAll() {
  return axios
    .get('/api/notebook')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function addNotebook(title) {
  return axios
    .post('/api/notebook', { title: title })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function deleteNotebook(id) {
  return axios
    .delete('/api/notebook', { params: { id: id } })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}

function renameNotebook(id, title) {
  return axios
    .put('/api/notebook', { id: id, title: title })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.message);
    });
}
