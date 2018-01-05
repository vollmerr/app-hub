import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { mergeById } from 'utils/request';

import * as C from './constants';


export const initialState = {
  authorizations: {
    byId: {},
    allIds: [],
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
