import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';
import { PieChart as Chart } from 'components/D3';

import { PieChart, Wrapper } from '../PieChart';


testStyledComponent(Wrapper);


const props = {
  stats: {
    approved: {
      count: 5,
      percent: 10,
    },
    denied: {
      count: 30,
      percent: 70,
    },
    pending: {
      count: 10,
      percent: 20,
    },
  },
  selectedKey: 0,
  onClick: jest.fn(),
  hasData: true,
  data: [],
};


describe('PieChart', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PieChart {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a no data indicator and no chart if there is no data', () => {
    wrapper.setProps({ hasData: false });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Chart).length).toEqual(0);
  });

  it('should render the chart', () => {
    expect(wrapper.find(Chart).length).toEqual(1);
  });
});
