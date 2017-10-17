import React from 'react';
import { shallow } from 'enzyme';

import { Redux, mapDispatchToProps } from '../index';
import { exampleAction } from '../actions';
import Input from '../Input';


describe('<Redux />', () => {
  let wrapper;
  let mockFn;
  let mockData;

  beforeEach(() => {
    mockFn = jest.fn();
    mockData = 'test data';
    wrapper = shallow(
      <Redux exampleData={mockData} onExampleAction={mockFn} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a single input', () => {
    expect(wrapper.find(Input).length).toBe(1);
  });

  it('should handle entering text in the input', () => {
    wrapper.find(Input).dive().setProps({ onChange: mockFn }).simulate('change');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should render data if it exists', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render data if it does not exist', () => {
    wrapper.setProps({ exampleData: null });
    expect(wrapper.find('p').length).toBe(0);
  });

  describe('handleUpdateData', () => {
    it('should exist', () => {
      const instance = wrapper.instance();
      expect(instance.handleUpdateData).toBeDefined();
    });

    it('should dispatch onExampleAction when called', () => {
      const instance = wrapper.instance();
      const event = { target: { value: mockData } };
      instance.handleUpdateData(event);
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    let mappedDispatch;
    beforeEach(() => {
      mappedDispatch = mapDispatchToProps(mockFn);
    });

    describe('onExampleAction', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onExampleAction).toBeDefined();
      });

      it('should dispatch exampleRequest when called', () => {
        mappedDispatch.onExampleAction();
        expect(mockFn).toHaveBeenCalledWith(exampleAction());
      });
    });
  });
});
