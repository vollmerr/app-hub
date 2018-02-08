import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { mergeById } from '../../utils/data';

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
  report: {
    deniedIds: [],
    approvedIds: [],
    pendingIds: [],
    noManagerIds: [],
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

  [C.GET_REPORT_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const authorizations = mergeById(state, 'authorizations', payload, C.AUTH.ID);
    const report = {
      deniedIds: [],
      approvedIds: [],
      pendingIds: [],
      noManagerIds: [],
    };
    // map out ids based off if approved, denied, or pending
    payload.forEach((auth) => {
      const id = auth[C.AUTH.ID];
      if (auth[C.AUTH.STATUS] === C.STATUS.NO_MANAGER) {
        report.noManagerIds.push(id);
      } else if (C.APP_LIST.every((app) => auth[app] === C.APPROVAL.APPROVE)) {
        report.approvedIds.push(id);
      } else if (C.APP_LIST.some((app) => auth[app] === C.APPROVAL.DENY)) {
        report.deniedIds.push(id);
      } else {
        report.pendingIds.push(id);
      }
    });
    // combine with current state
    return state.mergeDeep(fromJS({
      report,
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
