import { call, put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import 'whatwg-fetch';

import { authUserSuccess, authUserFailure } from 'containers/AppHub/actions';
import request from './request';

// export function sleep(ms) {
//   console.log('sleeping to simulate server delay...'); // eslint-disable-line
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

/**
 * Helper function to valdate that token exists and is not expired
 * @param {object} token  - jwt token
 *
 * @return {bool}         - valid ? true : false
 */
export function validToken(token) {
  try {
    const { exp } = decode(token);
    const now = new Date().getTime().toString().substring(0, 10);

    return exp > now;
  } catch (e) {
    return false;
  }
}


/**
 * Helper function to put jwt token into global redux store
 * @param {string} token    - jwt token
 * @param {string} appName  - name of app supplied in jwt for roles
 */
export function* putToken(token, appName) {
  const {
    sub: sam,
    [appName]: roles,
  } = decode(token);

  yield put(authUserSuccess(sam, roles));
}


/**
 * Authenticates a user
 * Checks local storage for token first
 * @param {string} appName  - name of app supplied in jwt for roles
 */
export function* authenticate(appName = 'AppHub') {
  const token = localStorage.getItem('id_token');

  if (validToken(token)) {
    // update user in global appHub state
    yield call(putToken, token, appName);
  } else {
    try {
      const options = {
        method: 'get',
        credentials: 'include',
      };
      const { id_token } = yield call(request, API.JWT, options); // eslint-disable-line
      // set into local storage for future authentication caching
      localStorage.setItem('id_token', id_token);
      // update user in global appHub state
      yield call(putToken, id_token, appName);
    } catch (err) {
      yield put(authUserFailure(err));
    }
  }
}


/**
 * Requests a URL with jwt token in header for authorization, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function requestWithToken(url, options = {}) {
  // get users jwt token form storage else they dont have one
  const token = localStorage.getItem('id_token') || null;
  // config settings to send api
  const newOptions = {
    method: options.method || 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  if (options.body) {
    newOptions.body = JSON.stringify(options.body);
  }

  return request(url, newOptions);
}

export default requestWithToken;

