import { createBrowserHistory } from 'history';

// the reason I used a custom history object instead of the built
// into React Router is to enable redirecting users from outside React components
export const history = createBrowserHistory();
