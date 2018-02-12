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
    lastFetched: null,
    currentIds: [],
    previousIds: [],
    allIds: [],
  },
  report: {
    lastFetched: null,
    key: C.REPORT.PENDING,
    data: null,
    filters: {},
  },
};


export default handleActions({
  [C.GET_MANAGER_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const authorizations = mergeById(state, 'authorizations', payload, C.AUTH.ID);
    const manager = {
      lastFetched: new Date().toISOString(),
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
      const udpatedUser = {
        ...user,
        [C.AUTH.LAST_APPROVED]: new Date().toISOString(),
        [C.AUTH.LAST_MODIFIED]: new Date().toISOString(),
      };
      // merge the updated data
      newState = newState
        .mergeIn(['authorizations', 'byId', user[C.AUTH.ID]], fromJS(udpatedUser));
    });
    // gimme that new state
    return newState;
  },


  [C.GET_REPORT_DATA_SUCCESS]: (state, action) => {
    const { payload } = action;
    const data = {
      all: [],
      [C.REPORT.APPROVED]: [],
      [C.REPORT.DENIED]: [],
      [C.REPORT.PENDING]: [],
      [C.REPORT.NO_MANAGER]: [],
    };
    // map out ids based off if approved, denied, pending,or no manager
    payload.forEach((auth) => {
      if (auth[C.AUTH.STATUS] === C.STATUS.NO_MANAGER) {
        data[C.REPORT.NO_MANAGER].push(auth);
      } else if (C.APP_LIST.every((app) => auth[app] === C.APPROVAL.APPROVE)) {
        data[C.REPORT.APPROVED].push(auth);
      } else if (C.APP_LIST.some((app) => auth[app] === C.APPROVAL.DENY)) {
        data[C.REPORT.DENIED].push(auth);
      } else {
        data[C.REPORT.PENDING].push(auth);
      }
      data.all.push(auth);
    });
    // add the last fetched date for caching
    const report = {
      data,
      lastFetched: new Date().toISOString(),
    };
    // add entries to authorizations, merging with existing ones
    const authorizations = mergeById(state, 'authorizations', payload, C.AUTH.ID);
    // combine with current state
    return state.mergeDeep(fromJS({
      report,
      authorizations,
    }));
  },


  [C.SET_REPORT_KEY]: (state, action) => (
    state.setIn(['report', 'key'], action.payload)
  ),


  [C.SET_REPORT_FILTER]: (state, action) => {
    const filter = action.payload;
    if (filter) {
      // add filter to lookup of filters
      return state.setIn(['report', 'filters', Object.keys(filter)[0]], Object.values(filter)[0]);
    }
    // reset filters on empty
    return state.setIn(['report', 'filters'], {});
  },
}, fromJS(initialState));
