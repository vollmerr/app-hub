/**
 * Test the requestWithToken function
 */

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import decode from 'jwt-decode';
import { authUserSuccess, authUserFailure } from 'containers/AppHub/actions';
import requestWithToken, { authenticate, putToken, config, validToken } from '../requestWithToken';

jest.mock('../request');
const request = require('../request').default;

const url = 'testUrl';
const defaultOptions = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${global.jwt.valid}`,
  },
};

describe('requestWithToken', () => {
  beforeEach(() => {
    window.localStorage = {};
    window.localStorage.getItem = () => global.jwt.valid;
  });

  it('should pull the users token form localstorage', () => {
    window.localStorage.getItem = jest.fn();
    requestWithToken(url);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('id_token');
  });

  it('should call request with defaults if no options passed', () => {
    requestWithToken(url);
    expect(request).toHaveBeenCalledWith(url, defaultOptions);
  });

  it('should call request with a stringified body and different methods', () => {
    const options = { ...defaultOptions };
    options.method = 'post';
    options.body = { test1: 'test data', test2: 'test 2 data' };

    const expectedOptions = { ...options };
    expectedOptions.body = JSON.stringify(options.body);

    requestWithToken(url, options);
    expect(request).toHaveBeenCalledWith(url, expectedOptions);
  });
});


describe('authenticate', () => {
  let appName;
  beforeEach(() => {
    window.fetch = jest.fn();
    window.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
    };
    appName = 'test app name';
  });

  it('should pull the users token from localstorage', () => {
    window.localStorage.getItem = jest.fn();
    authenticate().next();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('id_token');
  });

  it('should update the user is a valid token in localStorage', () => {
    window.localStorage.getItem = () => global.jwt.valid;
    expectSaga(authenticate, appName)
      .call(putToken, global.jwt.valid, appName)
      .run();
  });

  it('should get a new token if the token in localStorage is expired', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    expectSaga(authenticate, appName)
      .provide([
        [call(request, config.url, config.defaultOptions), { id_token: global.jwt.valid }] // eslint-disable-line
      ])
      .call(request, config.url, config.defaultOptions)
      .call(putToken, global.jwt.valid, appName)
      .run();
  });

  it('should handle errors', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    expectSaga(authenticate, appName)
      .provide([
        [call(request, config.url, config.defaultOptions), { id_token: '' }] // eslint-disable-line
      ])
      .call(request, config.url, config.defaultOptions)
      .put(authUserFailure())
      .run();
  });
});


describe('putToken', () => {
  it('should decode the jwt token and dispatch success', () => {
    const token = global.jwt.valid;
    const appName = 'BARS';
    const decoded = decode(token);
    const sam = decoded.sub;
    const roles = decoded.BARS;

    expectSaga(putToken, token, appName)
      .put(authUserSuccess(sam, roles))
      .run();
  });
});


describe('validToken', () => {
  it('should decode the jwt token and return true if not expired', () => {
    const token = global.jwt.valid;
    expect(validToken(token)).toEqual(true);
  });

  it('should decode the jwt token and return false if expired', () => {
    const token = global.jwt.expired;
    expect(validToken(token)).toEqual(false);
  });

  it('should return false if any errors', () => {
    const token = global.jwt.invalid;
    expect(validToken(token)).toEqual(false);
  });
});
