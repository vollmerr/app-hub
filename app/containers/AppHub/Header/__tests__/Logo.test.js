import React from 'react';
import { shallow } from 'enzyme';
import { testStyledComponent } from '../../../../utils/testUtils';

import Logo, { Img } from '../Logo';
import NavLink from '../NavLink';


testStyledComponent(Img);


describe('<Logo />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Logo />);
  });

  it('should render the logo as an image', () => {
    expect(wrapper.find(Img).length).toEqual(1);
    expect(wrapper.find(Img).prop('alt')).toMatch(/.+/);
    expect(wrapper.find(Img).prop('src')).toMatch(/.+/);
  });

  it('should be an external link', () => {
    expect(wrapper.find(NavLink).length).toEqual(1);
    expect(wrapper.find(NavLink).prop('href')).toMatch(/.+/);
    expect(wrapper.find(NavLink).prop('title')).toMatch(/.+/);
  });
});
