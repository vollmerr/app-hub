import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  EXAMPLE_ACTION,
} from './constants';

// inital state in the redux store for this part of the state
export const initialState = {
  exampleData: null,
};

/**
 * purpose:
 *  Reducer for this slice of state, updates the store if actions
 *  that have been dispatched (from our action creators in 'actions.js')
 *  match the ones it is looking for.
 *
 *  In this example it is looking for `EXAMPLE_ACTION`, when it sees it has
 *  been dispatched (action.type === EXAMPLE_ACTION) it sets the `exampleData`
 *  state in the redux store to the `action.payload`
 *
 * error handling:
 *  We could also here check if `action.error`, and if true the `action.paylaod` is the
 *  error message (ex from an API call).
 *
 * git:
 *  https://github.com/reduxactions/redux-actions
 */
export default handleActions({
  [EXAMPLE_ACTION]: (state, action) => state.set('exampleData', fromJS(action.payload)),
}, fromJS(initialState));
