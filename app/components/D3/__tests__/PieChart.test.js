import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';

import Default, { PieChart, Wrapper, Legend, LegendItem } from '../PieChart';
import { PieChart as Index } from '../index';


testStyledComponent(Wrapper);
testStyledComponent(Legend);
testStyledComponent(LegendItem, ActionButton);


const Chart = () => <div>chart...</div>;

const props = {
  data: [{ key: 0, value: 3 }, { key: 1, value: 20 }],
  width: 10,
  height: 20,
  legend: [{ key: 0, text: 'test1' }, { key: 1, text: 'test2' }],
  onClick: jest.fn(),
  chart: <Chart />,
  connectFauxDOM: jest.fn(),
  animateFauxDOM: jest.fn(),
};


describe('FieldText', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PieChart {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the chart', () => {
    expect(wrapper.find(Chart).length).toEqual(1);
  });

  it('should render a `Legend` if given one', () => {
    expect(wrapper.find(Legend).length).toEqual(1);
  });

  it('should not render a `Legend` if not given one', () => {
    wrapper.setProps({ legend: undefined });
    expect(wrapper.find(Legend).length).toEqual(0);
  });

  it('should render a `LegendItems` equal to the number of legend items passed', () => {
    expect(wrapper.find(LegendItem).length).toEqual(props.legend.length);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });
});
