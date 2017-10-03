/*
 *
 * SpaHome actions
 *
 */

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
} from './constants';

export function exampleDataRequest() {
  return {
    type: EXAMPLE_DATA_REQUEST,
  };
}

export function exampleDataSuccess(data) {
  return {
    data,
    type: EXAMPLE_DATA_SUCCESS,
  };
}
