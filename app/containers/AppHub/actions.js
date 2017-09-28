/*
 *
 * AppHub actions
 *
 */

import {
  CHANGE_MOBILE,
  CHANGE_PANEL_OPEN,
  CHANGE_PANEL_SELECTED,
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
