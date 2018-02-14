import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';

import Link from 'components/Link';
import Item, { Wrapper, StlyedLink } from '../Item';


testStyledComponent(Wrapper);
testStyledComponent(StlyedLink, Link);


describe('<Item />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Item />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a link', () => {
    expect(wrapper.find(StlyedLink).length).toEqual(1);
  });

  it('should pass props to the link', () => {
    const to = '/test-route';
    wrapper.setProps({ to });
    expect(wrapper.find(StlyedLink).prop('to')).toEqual(to);
  });
});
