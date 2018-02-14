import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';

import NavItem from '../NavItem';


testStyledComponent(NavItem);


describe('<Item />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItem />);
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
