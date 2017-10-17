import { call, put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import 'whatwg-fetch';

import { authUserSuccess, authUserFailure } from 'containers/AppHub/actions';

export const authApi = {
  url: 'https://testsec.api.technology.ca.gov/createToken',
  defaultOptions: {
    method: 'get',
    credentials: 'include',
  },
};

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
      const { id_token } = yield call(request, authApi.url, authApi.defaultOptions);
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
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}


/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
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
  const config = {
    method: options.method || 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  return exports.request(url, config);
}

export default requestWithToken;
