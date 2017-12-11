import { createAction } from 'redux-actions';

import * as C from './constants';

// GET DATA FOR A USER
export const getUserDataRequest = createAction(C.GET_USER_DATA_REQUEST);
export const getUserDataSuccess = createAction(C.GET_USER_DATA_SUCCESS);
export const getUserDataFailure = createAction(C.GET_USER_DATA_FAILURE);
// GET DATA FOR AN ADMIN
export const getAdminDataRequest = createAction(C.GET_ADMIN_DATA_REQUEST);
export const getAdminDataSuccess = createAction(C.GET_ADMIN_DATA_SUCCESS);
export const getAdminDataFailure = createAction(C.GET_ADMIN_DATA_FAILURE);
// GET DATA FOR AN ADMIN
export const getGroupsRequest = createAction(C.GET_GROUPS_REQUEST);
export const getGroupsSuccess = createAction(C.GET_GROUPS_SUCCESS);
export const getGroupsFailure = createAction(C.GET_GROUPS_FAILURE);
// GET LIST OF RECIPIENTS FOR EXISTSING ACK
export const getAckRecipientsRequest = createAction(C.GET_ACK_RECIPIENTS_REQUEST);
export const getAckRecipientsSuccess = createAction(C.GET_ACK_RECIPIENTS_SUCCESS);
export const getAckRecipientsFailure = createAction(C.GET_ACK_RECIPIENTS_FAILURE);
// NEW ACKNOWLEDGMENT
export const newAckRequest = createAction(C.NEW_ACK_REQUEST);
export const newAckSuccess = createAction(C.NEW_ACK_SUCCESS);
export const newAckFailure = createAction(C.NEW_ACK_FAILURE);
// DSIABLE ACKNOWLEDGMENT
export const disableAckRequest = createAction(C.DISABLE_ACK_REQUEST);
export const disableAckSuccess = createAction(C.DISABLE_ACK_SUCCESS);
export const disableAckFailure = createAction(C.DISABLE_ACK_FAILURE);
