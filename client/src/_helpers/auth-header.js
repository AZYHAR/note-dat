// Auth header is a helper function that returns an HTTP Authorization 
// header containing the Json Web Token (JWT) of the currently logged 
// in user from local storage.
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    // make authenticated HTTP requests to the server api using JWT authentication
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}