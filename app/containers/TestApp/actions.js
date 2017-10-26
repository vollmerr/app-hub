import { createActions } from 'redux-actions';

import {
  INIT_DATA_REQUEST,
  INIT_DATA_SUCCESS,
  INIT_DATA_FAILURE,
  CLEAR_ERRORS,
} from './constants';

const actions = createActions({
  [INIT_DATA_REQUEST]: () => {},
  [INIT_DATA_SUCCESS]: (payload) => payload,
  [INIT_DATA_FAILURE]: (payload) => payload,
  [CLEAR_ERRORS]: () => {},
});

export default actions.app.testApp;
