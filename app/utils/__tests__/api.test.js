/* eslint-disable redux-saga/yield-effects */
import { delay } from 'redux-saga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import decode from 'jwt-decode';

import { authUserDone } from '../../containers/AppHub/actions';

import * as api from '../api';


expectSaga.DEFAULT_TIMEOUT = 50;


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


describe('api', () => {
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('shouldFetch', () => {
    it('should be true if a falsey date provided', () => {
      expect(api.shouldFetch(undefined)).toEqual(true);
      expect(api.shouldFetch('')).toEqual(true);
    });

    it('should be true if given a date that is past the cache time', () => {
      expect(api.shouldFetch(new Date('01/01/1900'))).toEqual(true);
    });

    it('should be false if given a date that is not past the cache time', () => {
      expect(api.shouldFetch(new Date('01/01/9999'))).toEqual(false);
    });
  });


  describe('setToken', () => {
    it('should set the token in localStorage', () => {
      const token = 'abc';
      api.setToken(token);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(api.TOKEN, token);
    });
  });


  describe('getToken', () => {
    it('should get the token from localStorage', () => {
      api.getToken();
      expect(window.localStorage.getItem).toHaveBeenCalledWith(api.TOKEN);
    });
  });


  describe('clearToken', () => {
    it('should clear the token from localStorage', () => {
      api.clearToken();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(api.TOKEN);
    });
  });


  describe('validToken', () => {
    it('should decode the jwt token and return true if not expired', () => {
      const token = global.jwt.valid;
      expect(api.validToken(token)).toEqual(true);
    });

    it('should decode the jwt token and return false if expired', () => {
      const token = global.jwt.expired;
      expect(api.validToken(token)).toEqual(false);
    });

    it('should return false if any errors', () => {
      const token = global.jwt.invalid;
      expect(api.validToken(token)).toEqual(false);
    });
  });


  describe('putToken', () => {
    it('should decode the jwt token, dispatch success, then return the exipre time', () => {
      const token = global.jwt.valid;
      const { sub, sid, roles, exp, iat } = decode(token);
      const sam = sub;
      const expire = (exp - iat) * 1000;

      return expectSaga(api.putToken, token)
        .put(authUserDone({ sam, sid, roles, expire }))
        .returns(expire)
        .run();
    });

    it('should handle errors', () => {
      const error = new Error('InvalidTokenError: Invalid token specified');
      const token = global.jwt.invalid;

      const gen = api.putToken(token);
      try {
        gen.next();
      } catch (err) {
        expect(err).toEqual(error);
      }

      expect(gen.next()).toEqual({ done: true, value: undefined });
    });


    describe('authenticate', () => {
      const authOptions = {
        method: 'get',
        credentials: 'include',
      };

      it('should pull the users token from localstorage', () => {
        api.authenticate().next();
        expect(window.localStorage.getItem).toHaveBeenCalled();
      });

      it('should update the user if a valid token in localStorage', () => {
        window.localStorage.getItem = () => global.jwt.valid;
        testSaga(api.authenticate)
          .next()
          .call(api.putToken, global.jwt.valid)
          .next(1)
          .call(delay, 1)
          .finish()
          .isDone();
      });

      it('should get a new token if the token in localStorage is expired', () => {
        window.localStorage.getItem = () => global.jwt.expired;
        testSaga(api.authenticate)
          .next()
          .call(api.request, global.API.JWT, authOptions)
          .next({ id_token: global.jwt.valid })
          .call(api.putToken, global.jwt.valid)
          .next(1)
          .call(delay, 1)
          .finish()
          .isDone();
      });

      it('should handle errors', () => {
        const error = new Error('Bad jwt');
        window.localStorage.getItem = () => global.jwt.expired;
        // expects first arg as action but doesnt use, seeting max attempts to 1 so fails first try
        testSaga(api.authenticate, null, 1)
          .next()
          .call(api.request, global.API.JWT, authOptions)
          .next({ id_token: '' })
          .throw(error)
          .put(authUserDone(error))
          .next()
          .call(delay, api.DEFAULT_EXPIRE)
          .finish()
          .isDone();
      });
    });
  });


  describe('request', () => {
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
        api.request('/thisurliscorrect')
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
        api.request('/thisurliscorrect')
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
        api.request('/thisdoesntexist')
          .catch((err) => {
            expect(err.response.status).toBe(404);
            expect(err.response.statusText).toBe('Not Found');
            done();
          });
      });
    });
  });


  describe('requestWithToken', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
      window.localStorage.getItem = jest.fn(() => global.jwt.valid);
    });

    it('should pull the users token from localstorage', () => {
      api.requestWithToken(url);
      expect(window.localStorage.getItem).toHaveBeenCalled();
    });

    it('should call request with defaults if no options passed', () => {
      api.requestWithToken(url);
      expect(window.fetch).toHaveBeenCalledWith(url, defaultOptions);
    });

    it('should call request with a stringified body and different methods', () => {
      const options = { ...defaultOptions };
      options.method = 'post';
      options.body = { test1: 'test data', test2: 'test 2 data' };

      const expectedOptions = { ...options };
      expectedOptions.body = JSON.stringify(options.body);

      api.requestWithToken(url, options);
      expect(window.fetch).toHaveBeenCalledWith(url, expectedOptions);
    });
  });
});
