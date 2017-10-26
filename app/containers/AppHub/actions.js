import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  CLEAR_ERRORS,
} from './constants';

export function changeMobile(isMobile) {
  return {
    isMobile,
    type: CHANGE_MOBILE,
  };
}

export function changePanelOpen(isOpen) {
  return {
    isOpen,
    type: CHANGE_PANEL_OPEN,
  };
}

export function changePanelSelected(selected) {
  return {
    selected,
    type: CHANGE_PANEL_SELECTED,
  };
}

export function changeApp({ routes, meta, name }) {
  return {
    routes,
    meta,
    name,
    type: CHANGE_APP,
  };
}

// TODO: SIMPLIFY USING FACTORY
export function authUserRequest() {
  return {
    type: AUTH_USER_REQUEST,
  };
}

export function authUserSuccess(sam, roles) {
  return {
    sam,
    roles,
    type: AUTH_USER_SUCCESS,
  };
}

export function authUserFailure() {
  return {
    type: AUTH_USER_FAILURE,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}
