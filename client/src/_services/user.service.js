import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    signup
};

function login(email, password) {
    return axios.post('/api/auth/login', { email, password })
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));

            return res.data;
        })
        .catch(err => {
            logout();
            //location.reload(true);
            return Promise.reject(err.response.data.message);
        });
}

function signup(email, password, name) {
    return axios.post('/api/auth/signup', { email, password, name })
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));

            return res.data;
        })
        .catch(err => {
            logout();
            return Promise.reject(err.response.data.message);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}