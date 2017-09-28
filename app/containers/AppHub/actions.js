/*
 *
 * AppHub actions
 *
 */

import {
  CHANGE_MOBILE,
} from './constants';

export function changeMobile(isMobile) {
  return {
    isMobile,
    type: CHANGE_MOBILE,
  };
}
