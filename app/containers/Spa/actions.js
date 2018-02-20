import { createAction } from 'redux-actions';

import * as C from './constants';

// GET ACK STATUS CODES
export const getAckStatusRequest = createAction(C.GET_ACK_STATUS_REQUEST);
export const getAckStatusSuccess = createAction(C.GET_ACK_STATUS_SUCCESS);
export const getAckStatusFailure = createAction(C.GET_ACK_STATUS_FAILURE);


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
// SAVE ACKNOWLEDGMENT
export const saveAckRequest = createAction(C.SAVE_ACK_REQUEST);
export const saveAckSuccess = createAction(C.SAVE_ACK_SUCCESS);
export const saveAckFailure = createAction(C.SAVE_ACK_FAILURE);
// DSIABLE ACKNOWLEDGMENT
export const deactivateAckRequest = createAction(C.DEACTIVATE_ACK_REQUEST);
export const deactivateAckSuccess = createAction(C.DEACTIVATE_ACK_SUCCESS);
export const deactivateAckFailure = createAction(C.DEACTIVATE_ACK_FAILURE);


/* REPORT PAGE */
// GET LIST OF RECIPIENTS FOR EXISTSING ACK
export const getReportDataRequest = createAction(C.GET_REPORT_DATA_REQUEST);
export const getReportDataSuccess = createAction(C.GET_REPORT_DATA_SUCCESS);
export const getReportDataFailure = createAction(C.GET_REPORT_DATA_FAILURE);

export const setReportKey = createAction(C.SET_REPORT_KEY);
