import { createSelector } from 'reselect';


const selectAppHub = (state) => state.get('appHub');
const selectUser = (state) => selectAppHub(state).get('user');
const selectApp = (state) => selectAppHub(state).get('app');
const selectView = (state) => selectAppHub(state).get('view');


export const getUser = createSelector(selectUser, (user) => user);
export const getUserSid = createSelector(selectUser, (user) => user.get('sid'));
export const getUserRoles = createSelector(selectUser, (user) => user.get('roles'));

export const getApp = createSelector(selectApp, (app) => app);

export const getView = createSelector(selectView, (view) => view);
export const getViewPanel = createSelector(selectView, (view) => view.get('panel'));
