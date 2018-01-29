import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import decode from 'jwt-decode';
import 'whatwg-fetch';

import { authUserDone } from '../containers/AppHub/actions';
import request from './request';


export const DEFAULT_EXPIRE = 1000;
export const TOKEN = 'id_token';


/**
 * Sets a token for authenication in localStorage
 * @param {String} token  - token to set
 */
export function setToken(token) {
  localStorage.setItem({ [TOKEN]: token });
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
