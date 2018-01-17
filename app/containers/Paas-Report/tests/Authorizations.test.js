import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';

import ListSection from 'components/List/ListSection';
import List from 'components/List';

import Authorizations, { Wrapper } from '../Authorizations';

testStyledComponent(Wrapper, ListSection);

const props = {
  columns: [],
  items: [],
};


describe('<Authorizations />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Authorizations {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shoudl render a List', () => {
    expect(wrapper.find(List).length).toEqual(1);
  });
});
