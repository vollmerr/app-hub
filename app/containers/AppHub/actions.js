import { createAction } from 'redux-actions';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
} from './constants';

// VIEW
export const changeMobile = createAction(CHANGE_MOBILE);
export const changePanelOpen = createAction(CHANGE_PANEL_OPEN);
export const changePanelSelected = createAction(CHANGE_PANEL_SELECTED);
// APP
export const changeApp = createAction(CHANGE_APP);
export const changeAppStatus = createAction(CHANGE_APP_STATUS);
// USER
export const authUserRequest = createAction(AUTH_USER_REQUEST);
export const authUserSuccess = createAction(AUTH_USER_SUCCESS);
export const authUserFailure = createAction(AUTH_USER_FAILURE);
