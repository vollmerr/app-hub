import React from 'react';
import { shallow } from 'enzyme';

import {
  testStyledComponent,
  testMapDispatchToProps,
} from '../../../../utils/testUtils';
import { PieChart as Chart } from '../../../../components/D3';
import { incrementRenderCount } from '../../../AppHub/actions';

import { PieChart, Wrapper, mapDispatchToProps } from '../PieChart';


testStyledComponent(Wrapper);


const props = {
  data: [[{ key: 0, value: 29 }], [{ key: 1, value: 129 }]],
  dataKey: 0,
  stats: {
    approved: {
      count: 5,
      percent: 30,
    },
    denied: {
      count: 20,
      percent: 70,
    },
    pending: {
      count: 3,
      percent: 30,
    },
    noManager: {
      count: 1,
      percent: 20,
    },
  },
  hasData: true,
  onClick: jest.fn(),
};


describe('PieChart', () => {
  let wrapper;
  beforeEach(() => {
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


  describe('handleClick', () => {
    it('should return a function thats calls the passed onClick with a passed key', () => {
      const key = 'test';
      wrapper.instance().handleClick(key)();
      expect(props.onClick).toHaveBeenCalledWith(key);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      incrementRenderCount,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
