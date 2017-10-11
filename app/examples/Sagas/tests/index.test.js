import React from 'react';
import { shallow } from 'enzyme';
import Button from 'examples/common/Button';

import { Sagas, mapDispatchToProps } from '../index';
import { exampleRequest } from '../actions';


describe('<Sagas />', () => {
  let wrapper;
  let mockFn;
  let mockData;

  beforeEach(() => {
    mockData = { a: 1, b: 4 };
    mockFn = jest.fn();
    wrapper = shallow(
      <Sagas data={mockData} onExampleRequest={mockFn} />
    );
  });

  it('should render the button for fetching data', () => {
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('should handle clicking on the button for fetching data', () => {
    const onClick = jest.fn();
    wrapper.find(Button).dive().setProps({ onClick }).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should render data if it exists', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should not render data if it does not exist', () => {
    wrapper.setProps({ data: null });
    expect(wrapper.find('p').length).toBe(0);
  });

  describe('handleFetchData', () => {
    it('should exist', () => {
      const instance = wrapper.instance();
      expect(instance.handleFetchData).toBeDefined();
    });

    it('should dispatch exampleRequest when called', () => {
      const instance = wrapper.instance();
      instance.handleFetchData();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    let mappedDispatch;
    beforeEach(() => {
      mappedDispatch = mapDispatchToProps(mockFn);
    });

    describe('onExampleRequest', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onExampleRequest).toBeDefined();
      });

      it('should dispatch exampleRequest when called', () => {
        mappedDispatch.onExampleRequest();
        expect(mockFn).toHaveBeenCalledWith(exampleRequest());
      });
    });
  });
});
