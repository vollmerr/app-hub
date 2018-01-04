import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_SUCCESS,
} from './constants';

export const initialState = {
  data: null,
  authorizations: { // TODO: API!
    byId: {
      sid1: { sid: 'sid1', fullName: 'fullName 1', app1: 1, app2: undefined, app3: 0, app4: undefined },
      sid2: { sid: 'sid2', fullName: 'fullName 2', app1: 1, app2: 1, app3: 1, app4: 1 },
      sid3: { sid: 'sid3', fullName: 'fullName 3', app1: 0, app2: 0, app3: 0, app4: undefined },
      sid4: { sid: 'sid4', fullName: 'fullName 4', app1: undefined, app2: undefined, app3: undefined, app4: undefined },
    },
    allIds: ['sid1', 'sid2', 'sid3', 'sid4'],
  },
};

export default handleActions({
  [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
}, fromJS(initialState));
