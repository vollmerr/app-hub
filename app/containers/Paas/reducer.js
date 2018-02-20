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
    isAdmin: false,
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
      if (auth[C.AUTH.STATUS] === C.STATUS.ACTIVE ||
        auth[C.AUTH.STATUS] === C.STATUS.ASSIGNED_MANAGER) {
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
      [C.STATUS.ASSIGNED_MANAGER]: [],
      [C.REPORT.APPROVED]: [],
      [C.REPORT.DENIED]: [],
      [C.REPORT.PENDING]: [],
      [C.REPORT.NO_MANAGER]: [],
    };
    // map out ids based off if approved, denied, pending,or no manager
    payload.data.forEach((auth) => {
      if (auth[C.AUTH.STATUS] === C.STATUS.ASSIGNED_MANAGER) {
        data[C.STATUS.ASSIGNED_MANAGER].push(auth);
      }

      if (auth[C.AUTH.STATUS] === C.STATUS.NO_MANAGER) {
        data[C.REPORT.NO_MANAGER].push(auth);
        // TODO: strict comparison when API guarenteed to return number
      } else if (C.APP_LIST.every((app) => auth[app] == C.APPROVAL.APPROVE)) { // eslint-disable-line
        data[C.REPORT.APPROVED].push(auth);
      } else if (C.APP_LIST.some((app) => auth[app] == C.APPROVAL.DENY)) { // eslint-disable-line
        data[C.REPORT.DENIED].push(auth);
      } else {
        data[C.REPORT.PENDING].push(auth);
      }
      data.all.push(auth);
    });
    // add the last fetched date for caching
    const report = {
      data,
      isAdmin: payload.isAdmin,
      lastFetched: new Date().toISOString(),
    };
    // add entries to authorizations, merging with existing ones
    const authorizations = mergeById(state, 'authorizations', payload.data, C.AUTH.ID);
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
      return state.setIn(['report', 'filters', Object.keys(filter)[0]], fromJS(Object.values(filter)[0]));
    }
    // reset filters on empty
    return state.setIn(['report', 'filters'], fromJS({}));
  },

  [C.UPDATE_USER_MANAGER_SUCCESS]: (state, action) => {
    let newState = state;
    // for each user
    const user = {
      ...action.payload.employee,
      [C.AUTH.MANAGER_NAME]: action.payload.manager[C.AUTH.FULL_NAME],
      [C.AUTH.MANAGER_SID]: action.payload.manager[C.AUTH.SID],
      [C.AUTH.STATUS]: C.STATUS.ASSIGNED_MANAGER,
    };

    const valid = action.payload.employee[C.AUTH.ID];
   // insert new assigned manager
    const assignedManagers = newState
      .getIn(['report', 'data', 'assignedManager'])
      .filter((e) => e.get(C.AUTH.ID) !== valid)
      .push(fromJS(user));

    newState = newState.setIn(['report', 'data', 'assignedManager'], fromJS(assignedManagers));

    // remove from no mananger
    const noManagers = newState
      .getIn(['report', 'data', `${C.REPORT.NO_MANAGER}`])
      .filter((e) => e.get(C.AUTH.ID) !== valid);

    newState = newState.setIn(['report', 'data', C.REPORT.NO_MANAGER], fromJS(noManagers));

    // add to all
    const all = newState
      .getIn(['report', 'data', 'all'])
      .filter((e) => e.get(C.AUTH.ID) !== valid)
      .push(fromJS(user));
    newState = newState.setIn(['report', 'data', 'all'], fromJS(all));

    // add to pending
    const pending = newState
      .getIn(['report', 'data', `${C.REPORT.PENDING}`])
      .filter((e) => e.get(C.AUTH.ID) !== valid)
      .push(fromJS(user));
    newState = newState.setIn(['report', 'data', `${C.REPORT.PENDING}`], fromJS(pending));

    // gimme that new state
    return newState;
  },
}, fromJS(initialState));
