import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  INIT_DATA_SUCCESS,
} from './constants';

export const initialState = {
  data: {
    pendingAcks: [],
    previousAcks: [],
  },
};

const data = {
  pendingAcks: [
    {
      name: 'item 1',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/13/2100',
      dateRead: null,
    },
    {
      name: 'item 2',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/15/2100',
      dateRead: '12/15/2100',
    },
    {
      name: 'item 3',
      status: 'status 4',
      startDate: '12/12/1900',
      endDate: '12/12/2019',
      dateRead: null,
    },
  ],
  previousAcks: [
    {
      name: 'item 01',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/13/2100',
      dateRead: '12/12/2019',
    },
    {
      name: 'item 82',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/15/2100',
      dateRead: '12/15/2100',
    },
    {
      name: 'item 6',
      status: 'status 2',
      startDate: '12/12/1900',
      endDate: '12/12/2019',
      dateRead: '12/12/2019',
    },
  ],
};


// export default handleActions({
//   [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
// }, fromJS(initialState));

export default handleActions({
  [INIT_DATA_SUCCESS]: (state) => state.set('data', fromJS(data)),
}, fromJS(initialState));
