/**
 * Test the request function
 */

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import decode from 'jwt-decode';
import { authUserSuccess, authUserFailure } from 'containers/AppHub/actions';

import { authApi, request, authenticate, putToken, validToken } from '../request';

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((json) => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('stubbing 204 response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('', {
        status: 204,
        statusText: 'No Content',
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should return null on 204 response', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((json) => {
          expect(json).toBeNull();
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .catch((err) => {
          expect(err.response.status).toBe(404);
          expect(err.response.statusText).toBe('Not Found');
          done();
        });
    });
  });
});

const mockFetch = (error) => {
  const res = new Response(`{"id_token":"${global.jwt.valid}"}`, {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  window.fetch.mockReturnValue(error ? Promise.reject(error) : Promise.resolve(res));
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
    mockFetch();
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
        [call(request, authApi.url, authApi.defaultOptions), { id_token: global.jwt.valid }] // eslint-disable-line
      ])
      .call(request, authApi.url, authApi.defaultOptions)
      .call(putToken, global.jwt.valid, appName)
      .run();
  });

  it('should handle errors', () => {
    window.localStorage.getItem = () => global.jwt.expired;
    expectSaga(authenticate, appName)
      .provide([
        [call(request, authApi.url, authApi.defaultOptions), { id_token: '' }] // eslint-disable-line
      ])
      .call(request, authApi.url, authApi.defaultOptions)
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
