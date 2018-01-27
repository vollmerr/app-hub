import { handleActions } from 'redux-actions';


export const initalState = {
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


export default handleActions({});


// handle user actions
// tests....
