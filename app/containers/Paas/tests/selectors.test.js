import { fromJS } from 'immutable';
import * as selectors from '../selectors';

const a = { id: 'a', key: 'test a' };
const b = { id: 'b', key: 'test b' };
const c = { id: 'c', key: 'test c' };

const paas = {
  authorizations: {
    byId: { a, b, c },
    allIds: ['a', 'b', 'c'],
  },
  manager: {
    currentIds: ['b'],
    previousIds: ['a'],
    allIds: ['a', 'b'],
  },
  report: {
    deniedIds: ['a'],
    approvedIds: ['b'],
    pendingIds: ['c'],
  },
};

const state = fromJS({
  paas,
  otherStuff: { b: 'other stuff' },
});

describe('getAuthorizations', () => {
  const selector = selectors.getAuthorizations();
  it('should select the `authorizations` section of state', () => {
    const expected = fromJS(paas.authorizations);
    expect(selector(state)).toEqual(expected);
  });
});

describe('getAuthorizationItems', () => {
  const selector = selectors.getAuthorizationItems();
  it('should make a List of `authorizations` based off `allIds`', () => {
    const expected = fromJS([a, b, c]);
    expect(selector(state)).toEqual(expected);
  });
});

describe('getManagerById', () => {
  const selector = selectors.getManagerById('current');
  it('should make a Map of a mangers `authorizations` based off the type passed in', () => {
    const expected = fromJS({ b });
    expect(selector(state)).toEqual(expected);
  });
});

describe('getManagerItems', () => {
  const selector = selectors.getManagerItems('previous');
  it('should make a List of a mangers `authorizations` based off the type passed in', () => {
    const expected = fromJS([a]);
    expect(selector(state)).toEqual(expected);
  });
});

describe('getReportItems', () => {
  const selector = selectors.getReportItems('denied');
  it('should make a List of `report` `authorizations` based off the type passed in', () => {
    const expected = fromJS([a]);
    expect(selector(state)).toEqual(expected);
  });
});
