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

// /**
//  * map api response to:
//  *
//  *  {
//  *    byId: {
//  *      id1: { ... },
//  *      id2: { ... },
//  *      id3: { ... },
//  *    },
//  *    allIds: [ 'id1', 'id2', 'id3' ],
//  *    activeIds: [ 'id1', 'id3' ],
//  *    previousIds: [ 'id2' ],
//  *  }
//  *
//  * @param {*} response
//  */
// const mapResponse = (response) => {
//   const data = {
//     byId: {},
//     allIds: [],
//     activeIds: [],
//     previousIds: [],
//   };

//   response.forEach((item) => {
//     // add to byId
//     data.byId[item.id] = item;
//     // add to allIds
//     data.allIds.push(item.id);

//     if (item.isActive) {
//       // add to active items if active
//       data.activeIds.push(item.id);
//     } else {
//       // otherwise add to previous items
//       data.previousIds.push(item.id);
//     }
//   });

//   return data;
// };


const mapResponse = (response) => {
  const data = {
    pendingAcks: [],
    previousAcks: [],
  };

  response.forEach((item) => {
    if (item.isActive) {
      // add to active items if active
      data.pendingAcks.push(item);
    } else {
      // otherwise add to previous items
      data.previousAcks.push(item);
    }
  });

  return data;
};

export default handleActions({
  [INIT_DATA_SUCCESS]: (state, action) => state.set('data', fromJS(mapResponse(action.payload))),
}, fromJS(initialState));
