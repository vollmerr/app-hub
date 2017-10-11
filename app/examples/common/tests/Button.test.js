import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';


describe('<Button />', () => {
  it('should render an <button> tag', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.type()).toEqual('button');
  });

  it('should have a className attribute', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = shallow(<Button id={id} />);
    expect(wrapper.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = shallow(<Button attribute={'test'} />);
    expect(wrapper.prop('attribute')).toBeUndefined();
  });
});
