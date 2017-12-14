/**
 * Test the request function
 */
import { fromJS } from 'immutable';

import request, { normalizeById, mergeById, doneLoading } from '../request';

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


describe('normalizeById', () => {
  let arr;
  let expected;
  beforeEach(() => {
    arr = [
      { a: 'a', id: '1', z: [1, 2, 3] },
      { a: 'm', id: '2', p: { r: 'test' } },
    ];
    expected = {
      byId: {
        [arr[0].a]: arr[0],
        [arr[1].a]: arr[1],
      },
      allIds: [arr[0].a, arr[1].a],
    };
  });

  it('should return an array of all ids', () => {
    expect(normalizeById(arr, 'a').byId).toEqual(expected.byId);
  });

  it('should return the objects indexed by id', () => {
    expect(normalizeById(arr, 'a').allIds).toEqual(expected.allIds);
  });

  it('should set a default key if none provided', () => {
    expected = {
      byId: {
        [arr[0].id]: arr[0],
        [arr[1].id]: arr[1],
      },
      allIds: [arr[0].id, arr[1].id],
    };
    expect(normalizeById(arr)).toEqual(expected);
  });
});


describe('mergeById', () => {
  const testSection = {
    byId: {
      a: {
        b: 'test 1',
      },
      z: {
        m: [1, 2, 3],
      },
    },
    allIds: ['a', '0'],
  };
  const section = 'testSection';

  let state;
  let data;
  let expected;
  beforeEach(() => {
    state = fromJS({
      testSection,
    });
    data = [
      { a: 'c', id: '78', test: 1 },
      { a: 'f', id: '90', stuff: [1, 3, 5] },
    ];
    expected = fromJS({
      byId: {
        ...testSection.byId,
        [data[0].a]: data[0],
        [data[1].a]: data[1],
      },
      allIds: [...testSection.allIds, data[0].a, data[1].a],
    });
  });

  it('should return a List of all ids merged with the old ones', () => {
    expect(mergeById(state, section, data, 'a').get('byId')).toEqual(expected.get('byId'));
  });

  it('should return the objects indexed by id', () => {
    expect(mergeById(state, section, data, 'a').get('allIds')).toEqual(expected.get('allIds'));
  });

  it('should set a default key if none provided', () => {
    expected = fromJS({
      byId: {
        ...testSection.byId,
        [data[0].id]: data[0],
        [data[1].id]: data[1],
      },
      allIds: [...testSection.allIds, data[0].id, data[1].id],
    });
    expect(mergeById(state, section, data).toJS()).toEqual(expected.toJS());
  });
});


describe('doneLoading', () => {
  let component;
  beforeEach(() => {
    global.setTimeout = jest.fn(() => Promise.resolve());
    component = {
      props: {
        Loading: false,
      },
    };
  });

  it('should resolve if the component is done loading', () => {
    expect(doneLoading(component)).resolves.toEqual();
    expect(global.setTimeout).not.toHaveBeenCalled();
  });

  it('should call the callback passed if the component is done loading', () => {
    const cb = jest.fn();
    doneLoading(component, cb);
    expect(cb).toHaveBeenCalled();
    expect(global.setTimeout).not.toHaveBeenCalled();
  });

  it('should wait until the component is done loading', () => {
    component.props.Loading = true;
    doneLoading(component).then(() => {
      expect(global.setTimeout).toHaveBeenCalled();
    });
  });

  // it('should timeout if the compoennt is still loading', () => {
  //   expect(doneLoading)
  // });
});
