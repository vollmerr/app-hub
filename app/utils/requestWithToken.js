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

    return Number(exp) > Number(now);
  } catch (e) {
    return false;
  }
}


/**
 * Helper function to put jwt token into global redux store
 * @param {string} token    - jwt token
 */
export function* putToken(token) {
  try {
    const {
      sub: sam,
      sid,
      roles,
      exp,
      iat,
    } = decode(token);

    const expire = (exp - iat) * 1000; // convert from ms to s

    yield put(authUserDone({ sam, sid, roles, expire }));
    return expire;
  } catch (error) {
    throw new Error(error);
  }
}


export const DEFAULT_EXPIRE = 1000;

/**
 * Authenticates a user
 * Checks local storage for token first
 */
export function* authenticate(action, maxTries = 3) {
  let expire = DEFAULT_EXPIRE; // try again in 1s by default
  let tries = 0;
  let error = new Error('Failed to authenticate');
  while (tries < maxTries) { // eslint-disable-line
    const token = localStorage.getItem('id_token');
    // if valid local token use that, otherwise get new token
    if (validToken(token)) {
      // update user in global appHub state
      expire = yield call(putToken, token);
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
        expire = yield call(putToken, id_token);
        // reset max tries
        tries = 0;
      } catch (err) {
        // increment max tries
        tries += 1;
        error = err;
      }
      // max number of tires, set error
      if (tries === maxTries) {
        yield put(authUserDone(error));
      }
    }
    // authenicate again when token has expired
    yield call(delay, expire);
  }
}


/**
 * Requests a URL with jwt token in header for authorization, returning a promise
 * Waits until jwt token is set in localStorage before making call
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function requestWithToken(url, options = {}) {
  let timer = null;

  const requestIfToken = () => { // eslint-disable-line
    // get users jwt token form storage else they dont have one
    const token = localStorage.getItem('id_token') || null;
    // valid token, call api
    if (validToken(token)) {
      clearTimeout(timer);
      // config settings to send api
      const newOptions = {
        method: options.method || 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        ...options,
      };
      // append optional body to request (POSTs)
      if (options.body) {
        newOptions.body = JSON.stringify(options.body);
      }

      return request(url, newOptions);
    }
    // wait again until token set
    timer = setTimeout(requestIfToken, 100);
  };

  return requestIfToken();
}

export default requestWithToken;
