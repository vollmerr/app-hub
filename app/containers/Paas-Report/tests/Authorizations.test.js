import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from 'utils/testUtils';

import List from 'components/List';

import Authorizations, { StyledList } from '../Authorizations';


testStyledComponent(StyledList, List);


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
});
