import { createAction } from 'redux-actions';

import * as C from './constants';

export const getManagerDataRequest = createAction(C.GET_MANAGER_DATA_REQUEST);
export const getManagerDataSuccess = createAction(C.GET_MANAGER_DATA_SUCCESS);
export const getManagerDataFailure = createAction(C.GET_MANAGER_DATA_FAILURE);
