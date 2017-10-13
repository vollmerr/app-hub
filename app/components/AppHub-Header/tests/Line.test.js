import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import testStyledComponent from 'utils/testStyledComponent';

import Line from '../Line';

testStyledComponent(Line);


describe('<Line />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Line />);
  });

  it('should render correctly if is `partial`', () => {
    wrapper.setProps({ partial: true });
    expect(wrapper).toMatchSnapshot();
  });
});
