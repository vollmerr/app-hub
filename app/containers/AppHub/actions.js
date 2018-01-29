import { createAction } from 'redux-actions';

import * as C from './constants';

// VIEW
export const changeMobile = createAction(C.CHANGE_MOBILE);
export const changePanelOpen = createAction(C.CHANGE_PANEL_OPEN);
export const changePanelSelected = createAction(C.CHANGE_PANEL_SELECTED);
// APP
export const changeApp = createAction(C.CHANGE_APP);
export const changeAppStatus = createAction(C.CHANGE_APP_STATUS);
// USER
export const authUser = createAction(C.AUTH_USER);
export const authUserDone = createAction(C.AUTH_USER_DONE);

// D3
export const incrementRenderCount = createAction(
  C.INCREMENT_RENDER_COUNT,
  (component, mode) => ({ component, mode }),
);

// TODO: tests
