import { createSelector } from 'reselect';

import { STATUS } from './constants';

const selectSpa = (state) => state.get('spa');
const selectData = (state) => state.getIn(['spa', 'data']);
const selectRecipientsById = (state, id) => state.getIn(['recipients', String(id)]);

const makeSelectSpa = () => createSelector(
  selectSpa,
  (substate) => substate
);

const makeSelectPendingAcks = () => createSelector(
  selectData,
  (substate) => substate.filter((x) => x.get('status') === STATUS.ACTIVE)
);

const makeSelectPreviousAcks = () => createSelector(
  selectData,
  (substate) => substate.filter((x) => x.get('status') !== STATUS.ACTIVE)
);

export {
  makeSelectSpa,
  makeSelectPendingAcks,
  makeSelectPreviousAcks,
  selectRecipientsById,
};
