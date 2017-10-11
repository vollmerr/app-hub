import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';


describe('<Input />', () => {
  it('should render an <input> tag', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.type()).toEqual('input');
  });

  it('should have a className attribute', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = shallow(<Input id={id} />);
    expect(wrapper.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = shallow(<Input attribute={'test'} />);
    expect(wrapper.prop('attribute')).toBeUndefined();
  });
});
