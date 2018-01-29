import { createSelector } from 'reselect';


export const selectAppHub = (state) => state.get('appHub');
export const selectUser = (state) => selectAppHub(state).get('user');
export const selectApp = (state) => selectAppHub(state).get('app');
export const selectView = (state) => selectAppHub(state).get('view');


export const getUser = createSelector(selectUser, (user) => user);
export const getApp = createSelector(selectApp, (app) => app);
export const getView = createSelector(selectView, (view) => view);

// TODO: tests
