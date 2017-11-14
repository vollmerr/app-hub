import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import 'whatwg-fetch';

import { authUserDone } from 'containers/AppHub/actions';
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
  try {
    const {
      sub: sam,
      [appName]: roles,
      exp,
      iat,
    } = decode(token);

    const expire = exp - iat;

    yield put(authUserDone({ sam, roles, expire }));
    return expire;
  } catch (error) {
    throw new Error(error);
  }
}


export const MAX_TRIES = 3;
export const DEFAULT_EXPIRE = 1000;

/**
 * Authenticates a user
 * Checks local storage for token first
 * @param {string} appName  - name of app supplied in jwt for roles
 */
export function* authenticate(appName = 'AppHub') {
  const token = localStorage.getItem('id_token');
  let expire = DEFAULT_EXPIRE; // try again in 1s by default
  let tries = 0;
  let error = 'Failed to authenticate';

  while (tries < MAX_TRIES) { // eslint-disable-line
    if (validToken(token)) {
      // update user in global appHub state
      expire = yield call(putToken, token, appName);
      // reset max tries
      tries = 0;
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
        expire = yield call(putToken, id_token, appName);
        // reset max tries
        tries = MAX_TRIES;
      } catch (err) {
        // increment max tries
        tries += 1;
        error = err;
      }

      if (tries === MAX_TRIES) {
        // max number of tires, set error
        yield put(authUserDone(error));
      }
    }
    // authenicate again when token has expired
    yield call(delay, expire);
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

