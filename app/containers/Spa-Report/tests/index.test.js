import React from 'react';
import { shallow } from 'enzyme';

import SpaReport from '../index';

const ChartProp = () => <div>test chart...</div>;

const props = {
  chart: <ChartProp />,
  data: [],
  dataKey: 'test',
  selectedItem: {},
  connectFauxDOM: jest.fn(),
  animateFauxDOM: jest.fn(),
};


describe('<SpaReport />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<SpaReport {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
