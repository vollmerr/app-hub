/* eslint-disable redux-saga/yield-effects */
import { delay } from 'redux-saga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import decode from 'jwt-decode';
import { authUserDone } from 'containers/AppHub/actions';
import requestWithToken, {
  authenticate,
  putToken,
  validToken,
  DEFAULT_EXPIRE,
} from '../requestWithToken';

expectSaga.DEFAULT_TIMEOUT = 50;

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
  beforeEach(() => {
    window.fetch = jest.fn();
    window.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
    };
  });

  it('should pull the users token from localstorage', () => {
    window.localStorage.getItem = jest.fn();
    authenticate().next();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('id_token');
  });

  it('should update the user is a valid token in localStorage', () => {
    window.localStorage.getItem = () => global.jwt.valid;
    testSaga(authenticate)
      .next()
      .call(putToken, global.jwt.valid)
      .next(1)
      .call(delay, 1)
      .finish()
      .isDone();
  });

  it('should get a new token if the token in localStorage is expired', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    testSaga(authenticate)
      .next()
      .call(request, global.API.JWT, authOptions)
      .next({ id_token: global.jwt.valid })
      .call(putToken, global.jwt.valid)
      .next(1)
      .call(delay, 1)
      .finish()
      .isDone();
  });

  it('should handle errors', () => {
    const error = new Error('Bad jwt');
    window.localStorage.getItem = () => global.jwt.expired;
    // expects first arg as action but doesnt use, seeting max attempts to 1 so fails first try
    testSaga(authenticate, null, 1)
      .next()
      .call(request, global.API.JWT, authOptions)
      .next({ id_token: '' })
      .throw(error)
      .put(authUserDone(error))
      .next()
      .call(delay, DEFAULT_EXPIRE)
      .finish()
      .isDone();
  });
});


describe('putToken', () => {
  it('should decode the jwt token, dispatch success, then return the exipre time', () => {
    const token = global.jwt.valid;
    const { sub, roles, exp, iat } = decode(token);
    const sid = sub;
    const expire = (exp - iat) * 1000;

    return expectSaga(putToken, token)
      .put(authUserDone({ sid, roles, expire }))
      .returns(expire)
      .run();
  });

  it('should handle errors', () => {
    const error = new Error('InvalidTokenError: Invalid token specified');
    const token = global.jwt.invalid;

    const gen = putToken(token);
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
