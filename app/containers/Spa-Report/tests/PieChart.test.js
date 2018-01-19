import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';
import { PieChart as Chart } from 'components/D3';

import { PieChart, Wrapper } from '../PieChart';


testStyledComponent(Wrapper);


const props = {
  stats: {
    pending: {
      count: 5,
      percent: 30,
    },
    acknowledged: {
      count: 20,
      percent: 70,
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
