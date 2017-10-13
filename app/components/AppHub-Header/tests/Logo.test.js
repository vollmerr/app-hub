import React from 'react';
import { shallow } from 'enzyme';
import testStyledComponent from 'utils/testStyledComponent';

import Logo, { Img } from '../Logo';
import Link from '../Link';

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
    expect(wrapper.find(Link).length).toEqual(1);
    expect(wrapper.find(Link).prop('href')).toMatch(/.+/);
    expect(wrapper.find(Link).prop('title')).toMatch(/.+/);
  });
});
