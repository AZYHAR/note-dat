//Not finished
import { authHeader } from '../_helpers';
import axios from 'axios';

export const noteService = {
    getAll
}

// (??)Find out how to get from specific notebook

function get_all() {
    return axios.get('/not')
}