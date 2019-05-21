import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { notebooks } from './notebook.reducer';

import { LOGOUT } from '../_constants/user.constants';


const rootReducer = combineReducers({
  authentication,
  alert,
  notebooks
});

export default rootReducer;