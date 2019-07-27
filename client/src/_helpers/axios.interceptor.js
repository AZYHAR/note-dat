/*
    Credits to: https://www.techynovice.com/setting-up-JWT-token-refresh-mechanism-with-axios/
*/
import axios from 'axios';
import { setAuthHeader } from './auth-header';

export function setInterceptors() {
  axios.interceptors.response.use(
    function(response) {
      // If the request succeeds, we don't have to do anything and just return the response
      return response;
    },
    function(error) {
      const errorResponse = error.response;
      if (isTokenExpiredError(errorResponse)) {
        return resetTokenAndReattemptRequest(error);
      }
      // If the error is due to other reasons, we just throw it back to axios
      return Promise.reject(error);
    }
  );

  function isTokenExpiredError(errorResponse) {
    // Your own logic to determine if the error is due to JWT token expired returns a boolean value
    if (errorResponse.status === 401) {
      return true;
    }
    return false;
  }

  function getRefreshToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.refresh_token;
    }

    return null;
  }

  let isAlreadyFetchingAccessToken = false;

  // This is the list of waiting requests that will retry after the JWT refresh complete
  let subscribers = [];

  async function resetTokenAndReattemptRequest(error) {
    try {
      const { response: errorResponse } = error;
      const refreshToken = getRefreshToken(); // Your own mechanism to get the refresh token to refresh the JWT token
      if (!refreshToken) {
        // We can't refresh, throw the error anyway
        return Promise.reject(error);
      }
      /* Proceed to the token refresh procedure
            We create a new Promise that will retry the request,
            clone all the request configuration from the failed
            request in the error object. */
      const retryOriginalRequest = new Promise(resolve => {
        /* We need to add the request retry to the queue
                since there another request that already attempt to
                refresh the token */
        addSubscriber(access_token => {
          errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
          resolve(axios(errorResponse.config));
        });
      });
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + refreshToken;
        axios.post('/api/auth/token/refresh').then(response => {
          if (!response.data) {
            return Promise.reject(error);
          }
          const newToken = response.data.access_token;
          let user = JSON.parse(localStorage.getItem('user'));
          user.access_token = newToken;
          localStorage.setItem('user', JSON.stringify(user)); // save the newly refreshed token for other requests to use
          setAuthHeader();
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(newToken);
        });
      }
      return retryOriginalRequest;
    } catch (err) {
      setAuthHeader();
      return Promise.reject(err);
    }
  }

  function onAccessTokenFetched(access_token) {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
  }

  function addSubscriber(callback) {
    subscribers.push(callback);
  }
}
