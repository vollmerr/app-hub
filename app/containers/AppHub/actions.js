/*
 *
 * AppHub actions
 *
 */

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
  CHANGE_APP,
  AUTH_USER,
  EXAMPLE_REQUEST,
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

export function changeApp({ routes, meta }) {
  return {
    routes,
    meta,
    type: CHANGE_APP,
  };
}

export function authUser(sam, roles) {
  return {
    sam,
    roles,
    type: AUTH_USER,
  };
}

export function testRequest() {
  return {
    type: EXAMPLE_REQUEST,
  };
}
