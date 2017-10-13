import React from 'react';
import { shallow } from 'enzyme';

import testStyledComponent from 'utils/testStyledComponent';

import Link from 'components/Link';
import HelpItem, { StlyedLink, Item } from '../HelpItem';

testStyledComponent(StlyedLink, Link);
testStyledComponent(Item);


describe('<HelpItem />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HelpItem />);
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
