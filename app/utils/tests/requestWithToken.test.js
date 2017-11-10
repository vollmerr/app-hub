/* eslint-disable redux-saga/yield-effects */
import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import decode from 'jwt-decode';
import { authUserDone } from 'containers/AppHub/actions';
import requestWithToken, { authenticate, putToken, validToken } from '../requestWithToken';

jest.mock('../request');
const request = require('../request').default;

global.API = {
  JWT: 'https://urlForGettingAJwtToken',
};

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


const authOptions = {
  method: 'get',
  credentials: 'include',
};

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
    return expectSaga(authenticate, appName)
      .call(putToken, global.jwt.valid, appName)
      .silentRun();
  });

  it('should get a new token if the token in localStorage is expired', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    return expectSaga(authenticate, appName)
      .provide([
        [call(request, global.API.JWT, authOptions), { id_token: global.jwt.valid }],
      ])
      .call(request, global.API.JWT, authOptions)
      .call(putToken, global.jwt.valid, appName)
      .silentRun();
  });

  it('should handle errors', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    return expectSaga(authenticate, appName)
      .provide([
        [call(request, global.API.JWT, authOptions), { id_token: '' }],
      ])
      .call(request, global.API.JWT, authOptions)
      .silentRun()
      .then((result) => {
        const payload = new Error('InvalidTokenError: Invalid token specified: Cannot read property \'replace\' of undefined');
        expect(result.effects.put[0]).toEqual(put(authUserDone(payload)));
      });
  });
});


describe('putToken', () => {
  it('should decode the jwt token, dispatch success, then return the exipre time', () => {
    const token = global.jwt.valid;
    const appName = 'BARS';
    const { sub, BARS, exp, iat } = decode(token);
    const sam = sub;
    const roles = BARS;
    const expire = exp - iat;

    return expectSaga(putToken, token, appName)
      .put(authUserDone({ sam, roles, expire }))
      .returns(expire)
      .run();
  });

  it('should handle errors', () => {
    const error = new Error('InvalidTokenError: Invalid token specified');
    const token = global.jwt.invalid;
    const appName = 'BARS';

    const gen = putToken(token, appName);
    try {
      gen.next();
    } catch (err) {
      expect(err).toEqual(error);
    }

    expect(gen.next()).toEqual({ done: true, value: undefined });
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
