import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';

import List from 'components/List';

import Recipients, { StyledList } from '../Recipients';


testStyledComponent(StyledList, List);


const props = {
  columns: [],
  items: [],
};


describe('<Recipients />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Recipients {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
