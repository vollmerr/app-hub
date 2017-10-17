import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Wrapper from '../Wrapper';

testStyledComponent(Wrapper);

describe('<Wrapper />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Wrapper isMobile={false} />);
  });

  it('should be visible in desktop view', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('display', 'block');
  });

  it('should be hidden in mobile view', () => {
    wrapper.setProps({ isMobile: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('display', 'none');
  });
});
