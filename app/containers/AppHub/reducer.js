import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import Header from './Header';


export const initialState = {
  user: {
    name: '',
    sam: '',
    sid: '',
    roles: [],
    routes: [],
    isAuthenticated: false,
  },
  // commandBar visible
};


export default handleActions({}, fromJS(initialState));


// handle user actions
// tests....
