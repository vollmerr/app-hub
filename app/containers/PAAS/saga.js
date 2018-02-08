// import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';

import * as api from '../../utils/api';

import * as actions from './actions';
import * as C from './constants';


export const base = API.PAAS;


export function* getManagerData() {
  try {
    const url = `${base}`;
    const data = yield call(api.requestWithToken, url);
    yield put(actions.getManagerDataSuccess(data));
  } catch (error) {
    yield put(actions.getManagerDataFailure(error));
  }
}


export function* getReportData() {
  try {
    const url = `${base}/reports`;
    const data = yield call(api.requestWithToken, url);
    yield put(actions.getReportDataSuccess(data));
  } catch (error) {
    yield put(actions.getReportDataFailure(error));
  }
}


export function* updateUsers(action) {
  try {
    const url = `${base}`;
    const options = {
      method: 'POST',
      body: action.payload,
    };

    yield call(api.requestWithToken, url, options);
    yield put(actions.updateUsersSuccess(action.payload));
  } catch (error) {
    yield put(actions.updateUsersFailure(error));
  }
}


export default function* paasSaga() {
  yield [
    // manager (current / previous)
    takeLatest(C.GET_MANAGER_DATA_REQUEST, getManagerData),
    takeLatest(C.UPDATE_USERS_REQUEST, updateUsers),
    // report
    takeLatest(C.GET_REPORT_DATA_REQUEST, getReportData),
  ];
}
