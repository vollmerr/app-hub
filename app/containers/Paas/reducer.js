import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { mergeById } from 'utils/request';

import * as C from './constants';


export const initialState = {
  authorizations: { // TODO: API!
    byId: {
      sid1: { sid: 'sid1', firstName: 'firstName 1', lastName: 'lastName 1', app1: 1, app2: undefined, app3: 0, app4: undefined },
      sid2: { sid: 'sid2', firstName: 'firstName 2', lastName: 'lastName 2', app1: 1, app2: 1, app3: 1, app4: 1 },
      sid3: { sid: 'sid3', firstName: 'firstName 3', lastName: 'lastName 3', app1: 0, app2: 0, app3: 0, app4: undefined },
      sid4: { sid: 'sid4', firstName: 'firstName 4', lastName: 'lastName 4', app1: undefined, app2: undefined, app3: undefined, app4: undefined },
    },
    allIds: ['sid1', 'sid2', 'sid3', 'sid4'],
  },
  manager: {
    newIds: [],
    currentIds: [],
    allIds: [],
  },
};


export default handleActions({
  [C.GET_MANAGER_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const authorizations = mergeById(state, 'authorizations', payload, C.AUTH.SID);
    // combine with current state
    return state.mergeDeep(fromJS({
      authorizations,
    }));
  },
}, fromJS(initialState));
