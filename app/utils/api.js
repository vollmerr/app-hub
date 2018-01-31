import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import 'whatwg-fetch';

import { authUserDone } from '../containers/AppHub/actions';


export const DEFAULT_EXPIRE = 1000;
export const TOKEN = 'id_token';


/**
 * Determines if should fetch based off a cache time
 *
 * @param {Date} date             - date of cache
 * @param {Number} cacheSeconds   - number of seconds to cache
 *
 * @return {Bool}                 - if should fetch
 */
export function shouldFetch(date, cacheSeconds = 350) {
  return !date || (new Date(date).getTime() - (cacheSeconds * 1000)) > new Date().getTime();
}


/**
 * Sets a token for authenication in localStorage
 *
 * @param {String} token  - token to set
 */
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}


/**
 * Gets the authenication token from localStorage
 * @return {String}     - authenication token
 */
export function getToken() {
  return localStorage.getItem(TOKEN);
}


/**
 * Clears the authenication token from localStorage
 */
export function clearToken() {
  localStorage.removeItem(TOKEN);
}


/**
 * Helper function to valdate that token exists and is not expired
 *
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
 *
 * @param {String} token    - jwt token
 *
 * @return {Number}         - exipration time
 */
export function* putToken(token) {
  try {
    const {
      sub: sam,
      exp,
      iat,
      ...rest
    } = decode(token);

    const expire = (exp - iat) * 1000; // convert from ms to s

    yield put(authUserDone({ sam, expire, ...rest }));
    return expire;
  } catch (error) {
    throw new Error(error);
  }
}


/**
 * Authenticates a user
 * Checks local storage for token first
 *
 * @param {Object} action   - redux action to dispatch (must have 'type')
 * @param {Number} maxTries - max tries to re attempt authenicating on fail
 */
export function* authenticate(action, maxTries = 3) {
  let expire = DEFAULT_EXPIRE; // try again in 1s by default
  let tries = 0;
  let error = new Error('Failed to authenticate');
  while (tries < maxTries) { // eslint-disable-line
    const token = getToken();
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
        setToken(id_token);
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
 * Waits until jwt token is set in localStorage before making call
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function requestWithToken(url, options = {}) {
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
