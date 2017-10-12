import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';


describe('<Button />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Button />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <button> tag', () => {
    expect(wrapper.type()).toEqual('button');
  });

  it('should have a className attribute', () => {
    expect(wrapper.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    wrapper.setProps({ id });
    expect(wrapper.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const attribute = 'test';
    wrapper.setProps({ attribute });
    expect(wrapper.prop('attribute')).toBeUndefined();
  });
});
