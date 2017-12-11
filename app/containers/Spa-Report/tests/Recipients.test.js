import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';

import ListSection from 'components/List/ListSection';
import List from 'components/List';

import Recipients, { Wrapper } from '../Recipients';

testStyledComponent(Wrapper, ListSection);

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

  it('shoudl render a List', () => {
    expect(wrapper.find(List).length).toEqual(1);
  });
});
