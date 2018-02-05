import { createAction } from 'redux-actions';

import * as C from './constants';


/* HOME PAGE */
// GET DATA FOR A USER
export const getUserDataRequest = createAction(C.GET_USER_DATA_REQUEST);
export const getUserDataSuccess = createAction(C.GET_USER_DATA_SUCCESS);
export const getUserDataFailure = createAction(C.GET_USER_DATA_FAILURE);
// READ ACKNOWLEDGMENT
export const readAckRequest = createAction(C.READ_ACK_REQUEST);
export const readAckSuccess = createAction(C.READ_ACK_SUCCESS);
export const readAckFailure = createAction(C.READ_ACK_FAILURE);


/* ADMIN PAGE */
// GET DATA FOR AN ADMIN
export const getAdminDataRequest = createAction(C.GET_ADMIN_DATA_REQUEST);
export const getAdminDataSuccess = createAction(C.GET_ADMIN_DATA_SUCCESS);
export const getAdminDataFailure = createAction(C.GET_ADMIN_DATA_FAILURE);
// GET DATA FOR AN ADMIN
export const getGroupsRequest = createAction(C.GET_GROUPS_REQUEST);
export const getGroupsSuccess = createAction(C.GET_GROUPS_SUCCESS);
export const getGroupsFailure = createAction(C.GET_GROUPS_FAILURE);
// NEW ACKNOWLEDGMENT
export const newAckRequest = createAction(C.NEW_ACK_REQUEST);
export const newAckSuccess = createAction(C.NEW_ACK_SUCCESS);
export const newAckFailure = createAction(C.NEW_ACK_FAILURE);
// DSIABLE ACKNOWLEDGMENT
export const disableAckRequest = createAction(C.DISABLE_ACK_REQUEST);
export const disableAckSuccess = createAction(C.DISABLE_ACK_SUCCESS);
export const disableAckFailure = createAction(C.DISABLE_ACK_FAILURE);


/* REPORT PAGE */
// GET LIST OF RECIPIENTS FOR EXISTSING ACK
export const getReportDataRequest = createAction(C.GET_REPORT_DATA_REQUEST);
export const getReportDataSuccess = createAction(C.GET_REPORT_DATA_SUCCESS);
export const getReportDataFailure = createAction(C.GET_REPORT_DATA_FAILURE);

export const setReportKey = createAction(C.SET_REPORT_KEY);
