import { createSelector } from 'reselect';


export const getUser = (state) => state.get('user');

export const getIsAuthenticated = createSelector(
  getUser,
  (user) => user.get('isAuthenticated')
);
