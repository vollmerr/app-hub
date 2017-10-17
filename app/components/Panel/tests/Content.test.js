import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Content from '../Content';

testStyledComponent(Content);

describe('<Content />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Content left={false} />);
  });

  it('should render correctly right', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border-left', /.*/);
    expect(wrapper).toHaveStyleRule('right', /\d/);
  });

  it('should render correctly left', () => {
    wrapper.setProps({ left: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border-right', /.*/);
    expect(wrapper).toHaveStyleRule('left', /\d/);
  });
});
