import { createAction } from 'redux-actions';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
  CLEAR_ERRORS,
} from './constants';

export const exampleRequest = createAction(EXAMPLE_DATA_REQUEST);
export const exampleSuccess = createAction(EXAMPLE_DATA_SUCCESS);
export const exampleFailure = createAction(EXAMPLE_DATA_FAILURE);

export const clearErrors = createAction(CLEAR_ERRORS);
