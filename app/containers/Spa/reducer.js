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

export const mockData = {
  pendingAcks: [
    {
      id: 1,
      name: 'item 1',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/13/2100',
      dateRead: null,
      details: 'Details of items 1',
      isActive: true,
    },
    {
      id: 2,
      name: 'item 2',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/15/2100',
      dateRead: '12/15/2100',
      details: 'Details of items 2',
      isActive: true,
    },
    {
      id: 3,
      name: 'item 3',
      status: 'status 4',
      startDate: '12/12/1900',
      endDate: '12/12/2019',
      dateRead: null,
      details: 'Details of items 3',
      isActive: true,
    },
  ],
  previousAcks: [
    {
      id: 4,
      name: 'item 01',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/13/2100',
      dateRead: '12/12/2019',
      details: 'Details of items 4',
      isActive: false,
    },
    {
      id: 5,
      name: 'item 82',
      status: 'status 1',
      startDate: '12/12/2100',
      endDate: '12/15/2100',
      dateRead: '12/15/2100',
      details: 'Details of items 5',
      isActive: false,
    },
    {
      id: 6,
      name: 'item 6',
      status: 'status 2',
      startDate: '12/12/1900',
      endDate: '12/12/2019',
      dateRead: '12/12/2019',
      details: 'Details of items 6',
      isActive: false,
    },
  ],
};


// export default handleActions({
//   [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(action.payload)),
// }, fromJS(initialState));

export default handleActions({
  [INIT_DATA_SUCCESS]: (state) => state.set('data', fromJS(mockData)),
}, fromJS(initialState));
