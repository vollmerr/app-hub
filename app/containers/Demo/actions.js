import { createAction } from 'redux-actions';

import {
  EXAMPLE_DATA_REQUEST,
  EXAMPLE_DATA_SUCCESS,
  EXAMPLE_DATA_FAILURE,
} from './constants';

export const exampleDataRequest = createAction(EXAMPLE_DATA_REQUEST);
export const exampleDataSuccess = createAction(EXAMPLE_DATA_SUCCESS);
export const exampleDataFailure = createAction(EXAMPLE_DATA_FAILURE);
