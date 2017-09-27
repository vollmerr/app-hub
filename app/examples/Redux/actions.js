/*
 *
 * WithRedux actions
 *
 */

import {
  EXAMPLE_ACTION,
} from './constants';

export function exampleAction(data) {
  return {
    data,
    type: EXAMPLE_ACTION,
  };
}
