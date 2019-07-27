import { setAuthHeader } from '../_helpers';
import axios from 'axios';
import { setInterceptors } from '../_helpers/axios.interceptor';

// The service methods are exported via the userService object
export const userService = {
  login,
  logout,
  signup
};

// Encapsulates all backend api calls for performing CRUD operations on user data,
// as well as logging and out of the example application.

function login(email, password) {
  return axios
    .post('/api/auth/login', { email, password })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      //setAuthHeader();
      setInterceptors();

      return res.data;
    })
    .catch(err => {
      logout();
      //location.reload(true);
      return Promise.reject(err.response.data.message);
    });
}

function signup(email, password, name) {
  return axios
    .post('/api/auth/signup', { email, password, name })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setInterceptors();

      return res.data;
    })
    .catch(err => {
      logout();
      console.log(err);
      return Promise.reject(err.response.data.message);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  setAuthHeader();
}
