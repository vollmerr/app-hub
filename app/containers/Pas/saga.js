// import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { getUserRoles } from '../AppHub/selectors';
import * as api from '../../utils/api';

import * as actions from './actions';
import * as C from './constants';


export const base = API.PAS;


export function* getManagerData() {
  try {
    const url = `${base}/auth`;
    const data = yield call(api.requestWithToken, url);
    yield put(actions.getManagerDataSuccess(data));
  } catch (error) {
    yield put(actions.getManagerDataFailure(error));
  }
}


export function* getReportData() {
  try {
    const roles = yield select(getUserRoles);
    // default to getting the manager data
    let url = `${base}/auth`;
    let isAdmin = false;
    // if user is security or admin, get report data
    const adminRoles = [C.ROLES.HR, C.ROLES.SECURITY];
    if (roles.some((x) => adminRoles.includes(x))) {
      url = `${base}/report`;
      isAdmin = true;
    }

    const data = yield call(api.requestWithToken, url);
    yield put(actions.getReportDataSuccess({ data, isAdmin }));
  } catch (error) {
    yield put(actions.getReportDataFailure(error));
  }
}


export function* updateUsers(action) {
  try {
    const url = `${base}/auth`;
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

export function* updateUserManager(action) {
  try {
    const url = `${base}/manager`;
    const options = {
      method: 'POST',
      body: [{
        [C.MANAGE.EMPLOYEE_ID]: action.payload[C.MANAGE.EMPLOYEE_ID],
        [C.MANAGE.MANAGER_ID]: action.payload[C.MANAGE.MANAGER_ID],
      }],
    };

    yield call(api.requestWithToken, url, options);
    yield put(actions.updateUserManagerSuccess(action.payload));
  } catch (error) {
    yield put(actions.updateUserManagerFailure(error));
  }
}


export default function* pasSaga() {
  yield [
    // manager (current / previous)
    takeLatest(C.GET_MANAGER_DATA_REQUEST, getManagerData),
    takeLatest(C.UPDATE_USERS_REQUEST, updateUsers),
    // report
    takeLatest(C.GET_REPORT_DATA_REQUEST, getReportData),
    // manager
    takeLatest(C.UPDATE_USER_MANAGER_REQUEST, updateUserManager),
  ];
}
