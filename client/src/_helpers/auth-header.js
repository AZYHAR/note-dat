import axios from 'axios';

export function setAuthHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token){
        axios.defaults.headers.common['Authorization'] = "Bearer " + user.access_token;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}