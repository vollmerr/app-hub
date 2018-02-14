import { fromJS } from 'immutable';

import paasReducer, { initialState } from '../reducer';
// import * as C from '../constants';


// const state = {

// };


describe('paasReducer', () => {
  it('should return the initial state', () => {
    expect(paasReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  // TODO!>..
});
