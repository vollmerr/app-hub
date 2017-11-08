import { createAction } from 'redux-actions';

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  CHANGE_APP_STATUS,
  AUTH_USER,
  AUTH_USER_DONE,
} from './constants';

// VIEW
export const changeMobile = createAction(CHANGE_MOBILE);
export const changePanelOpen = createAction(CHANGE_PANEL_OPEN);
export const changePanelSelected = createAction(CHANGE_PANEL_SELECTED);
// APP
export const changeApp = createAction(CHANGE_APP);
export const changeAppStatus = createAction(CHANGE_APP_STATUS);
// USER
export const authUser = createAction(AUTH_USER);
export const authUserDone = createAction(AUTH_USER_DONE);
