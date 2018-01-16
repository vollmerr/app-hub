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
    currentIds: [],
    previousIds: [],
    allIds: [],
  },
};


export default handleActions({
  [C.GET_MANAGER_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const authorizations = mergeById(state, 'authorizations', payload, C.AUTH.ID);
    const manager = {
      currentIds: [],
      previousIds: [],
      allIds: [],
    };
    // map out manager ids by past and current
    payload.forEach((auth) => {
      const id = auth[C.AUTH.ID];
      manager.allIds.push(id);
      if (auth[C.AUTH.STATUS] === C.STATUS.ACTIVE) {
        manager.currentIds.push(id);
      } else {
        manager.previousIds.push(id);
      }
    });
    // combine with current state
    return state.mergeDeep(fromJS({
      manager,
      authorizations,
    }));
  },

  [C.UPDATE_USERS_SUCCESS]: (state, action) => {
    const { payload } = action;
    let newState = state;
    // for each user
    payload.forEach((user) => {
      // merge the updated data
      newState = newState
        .mergeIn(['authorizations', 'byId', user[C.AUTH.ID]], fromJS(user));
    });
    // gimme that new state
    return newState;
  },
}, fromJS(initialState));
