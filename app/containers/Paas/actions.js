import { createAction } from 'redux-actions';

import * as C from './constants';

// MANAGER
export const getManagerDataRequest = createAction(C.GET_MANAGER_DATA_REQUEST);
export const getManagerDataSuccess = createAction(C.GET_MANAGER_DATA_SUCCESS);
export const getManagerDataFailure = createAction(C.GET_MANAGER_DATA_FAILURE);

export const updateUsersRequest = createAction(C.UPDATE_USERS_REQUEST);
export const updateUsersSuccess = createAction(C.UPDATE_USERS_SUCCESS);
export const updateUsersFailure = createAction(C.UPDATE_USERS_FAILURE);

// REPORTS
export const getReportDataRequest = createAction(C.GET_REPORT_DATA_REQUEST);
export const getReportDataSuccess = createAction(C.GET_REPORT_DATA_SUCCESS);
export const getReportDataFailure = createAction(C.GET_REPORT_DATA_FAILURE);

export const setReportKey = createAction(C.SET_REPORT_KEY);
export const setReportFilter = createAction(C.SET_REPORT_FILTER);
