import { createAction } from 'redux-actions';

import {
  INIT_DATA_REQUEST,
  INIT_DATA_SUCCESS,
  INIT_DATA_FAILURE,
  NEW_ACK_REQUEST,
  NEW_ACK_SUCCESS,
  NEW_ACK_FAILURE,
  DISABLE_ACK_REQUEST,
  DISABLE_ACK_SUCCESS,
  DISABLE_ACK_FAILURE,
  GET_RECIPIENTS_REQUEST,
  GET_RECIPIENTS_SUCCESS,
  GET_RECIPIENTS_FAILURE,
} from './constants';
// INITAL DATA
export const initDataRequest = createAction(INIT_DATA_REQUEST);
export const initDataSuccess = createAction(INIT_DATA_SUCCESS);
export const initDataFailure = createAction(INIT_DATA_FAILURE);
// NEW ACKNOWLEDGMENT
export const newAckRequest = createAction(NEW_ACK_REQUEST);
export const newAckSuccess = createAction(NEW_ACK_SUCCESS);
export const newAckFailure = createAction(NEW_ACK_FAILURE);
// DSIABLE ACKNOWLEDGMENT
export const disableAckRequest = createAction(DISABLE_ACK_REQUEST);
export const disableAckSuccess = createAction(DISABLE_ACK_SUCCESS);
export const disableAckFailure = createAction(DISABLE_ACK_FAILURE);
// GET LIST OF RECIPIENTS FOR EXISTSING ACK
export const getRecipientsRequest = createAction(GET_RECIPIENTS_REQUEST);
export const getRecipientsSuccess = createAction(GET_RECIPIENTS_SUCCESS);
export const getRecipientsFailure = createAction(GET_RECIPIENTS_FAILURE);
