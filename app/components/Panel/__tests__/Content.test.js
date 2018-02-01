import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../utils/testUtils';

import Content from '../Content';


testStyledComponent(Content);


describe('<Content />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Content isLeft={false} />);
  });

  it('should render correctly right', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border-left', /.*/);
    expect(wrapper).toHaveStyleRule('right', /\d/);
  });

  it('should render correctly left', () => {
    wrapper.setProps({ isLeft: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border-right', /.*/);
    expect(wrapper).toHaveStyleRule('left', /\d/);
  });
});
