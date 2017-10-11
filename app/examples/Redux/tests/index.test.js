import React from 'react';
import { shallow } from 'enzyme';

import { Redux } from '../index';
import Input from '../Input';

const mockData = 'Test Data';
const mockFn = jest.fn();


describe('<Redux />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Redux exampleData={mockData} handleExampleAction={mockFn} />
    );
  });

  it('should render a single input', () => {
    expect(wrapper.find(Input).length).toBe(1);
  });

  it('should handle entering text in the input', () => {
    const onChange = jest.fn();
    wrapper.find(Input).dive().setProps({ onChange }).simulate('change');
    expect(onChange).toHaveBeenCalled();
  });

  it('should render data if it exists', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render data if it does not exist', () => {
    wrapper = shallow(<Redux handleExampleAction={mockFn} />);
    expect(wrapper.find('p').length).toBe(0);
  });
});
