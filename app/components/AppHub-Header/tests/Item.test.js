import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import testStyledComponent from 'utils/testStyledComponent';

import Item from '../Item';

testStyledComponent(Item);


describe('<Item />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Item />);
  });

  it('should render correctly if `isLink`', () => {
    wrapper.setProps({ isLink: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if is `checked`', () => {
    wrapper.setProps({ checked: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if is `dark`', () => {
    wrapper.setProps({ isLink: true, dark: true });
    expect(wrapper).toMatchSnapshot();
  });
});
