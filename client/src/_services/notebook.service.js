//Not finished
import { authHeader } from '../_helpers';
import axios from 'axios';

export const noteService = {
    getAll
}

// I have to specify notebooks by witch user

function get_all() {
    return axios.get('/notebooks')
    .then(res => {
        localStorage.getItem('notebooks', JSON.stringify(res.data));

        return res.data;
    })
    
}