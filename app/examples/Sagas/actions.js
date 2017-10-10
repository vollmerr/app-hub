/*
 *
 * Sagas actions
 *
 */

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
} from './constants';

export function exampleRequest() {
  return {
    type: EXAMPLE_DATA_REQUEST,
  };
}

export function exampleSuccess(data) {
  return {
    data,
    type: EXAMPLE_DATA_SUCCESS,
  };
}

export function exampleFailure(error = {}) {
  return {
    message: error.message,
    type: EXAMPLE_DATA_FAILURE,
  };
}
