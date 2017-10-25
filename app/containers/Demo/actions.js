import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
  CLEAR_ERRORS,
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

export function exampleDataFailure(error) {
  return {
    error,
    type: EXAMPLE_DATA_FAILURE,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}
