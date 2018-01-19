import React from 'react';
import { shallow } from 'enzyme';

import { PaasReport } from '../index';


const items = [
  { key: 'one', text: 'item 1' },
  { key: 'two', text: 'item 2' },
  { key: 'three', text: 'item 3' },
  { key: 'four', text: 'item 4' },
];

const props = {
  allItems: items,
  approvedItems: [items[0]],
  deniedItems: [items[1]],
  pendingItems: [items[2]],
  noManagerItems: [items[3]],
  onGetReportDataRequest: jest.fn(),
};


describe('<PaasReport />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PaasReport {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
