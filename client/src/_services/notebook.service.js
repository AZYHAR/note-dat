import axios from 'axios';

export const notebookService = {
    getAll
};

function getAll() {
    return axios.get('/api/notebook')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(err.response.data.message);
        });
}