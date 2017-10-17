import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import { testStyledComponent } from 'utils/testUtils';

import Items from '../Items';

testStyledComponent(Items, Nav);

describe('<Items />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Items isMobile={false} />);
  });

  it('should render correctly in desktop view', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in desktop view', () => {
    wrapper.setProps({ isMobile: true });
    expect(wrapper).toMatchSnapshot();
  });
});
