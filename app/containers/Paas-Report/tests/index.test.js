import React from 'react';
import { shallow } from 'enzyme';

import { PaasReport } from '../index';


const items = [
  { key: 'one', text: 'item 1' },
  { key: 'two', text: 'item 2' },
  { key: 'three', text: 'item 3' },
];

const props = {
  allList: items,
  approvedList: [items[0]],
  deniedList: [items[1]],
  pendingList: [items[2]],
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
