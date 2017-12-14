import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import { REPORT } from 'containers/Spa/constants';
import PieChart, { Wrapper, Chart, Legend, Item, Color } from '../PieChart';

testStyledComponent(Wrapper);
testStyledComponent(Chart);
testStyledComponent(Legend);
testStyledComponent(Item, ActionButton);
testStyledComponent(Color); // TODO: test bg based off props

const ChartProp = () => <div>test chart...</div>;

const props = {
  chart: <ChartProp />,
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
  onClick: jest.fn(),
  hasData: true,
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
    expect(wrapper.find(Chart).prop('children')).toEqual(props.chart);
  });

  it('should render a legend', () => {
    expect(wrapper.find(Legend).length).toEqual(1);
  });

  it('should render two items in the legend for pending and acknowledged stats', () => {
    expect(wrapper.find(Item).length).toEqual(2);
    expect(wrapper.find(Color).length).toEqual(2);
  });

  it('should call the onClick when clicking the pending item in the legend', () => {
    wrapper.find(Item).at(REPORT.PENDING).simulate('click');
    expect(props.onClick).toHaveBeenCalledWith(REPORT.PENDING);
  });

  it('should call the onClick when clicking the previous item in the legend', () => {
    wrapper.find(Item).at(REPORT.PREVIOUS).simulate('click');
    expect(props.onClick).toHaveBeenCalledWith(REPORT.PREVIOUS);
  });
});
