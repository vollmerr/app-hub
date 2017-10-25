import React from 'react';
import { shallow } from 'enzyme';
import Button from 'examples/common/Button';

import { Sagas, mapDispatchToProps } from '../index';
import { exampleRequest, clearErrors } from '../actions';

const props = {
  onExampleRequest: jest.fn(),
  onClearErrors: jest.fn(),
  data: null,
  loading: false,
  error: null,
};


describe('<Sagas />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(
      <Sagas {...props} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
    const data = { test: 'test data' };
    wrapper.setProps({ data });
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toContain(data.test);
  });

  it('should not render data if it does not exist', () => {
    expect(wrapper.find('p').length).toBe(0);
  });

  it('should render a loading message if loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toContain('Loading');
  });

  it('should render an error message if error', () => {
    wrapper.setProps({ error: { message: 'test error' } });
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toContain('error');
  });

  describe('handleFetchData', () => {
    it('should exist', () => {
      const instance = wrapper.instance();
      expect(instance.handleFetchData).toBeDefined();
    });

    it('should dispatch exampleRequest when called', () => {
      const instance = wrapper.instance();
      instance.handleFetchData();
      expect(props.onExampleRequest).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    let mappedDispatch;
    let dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mappedDispatch = mapDispatchToProps(dispatch);
    });

    describe('onExampleRequest', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onExampleRequest).toBeDefined();
      });

      it('should dispatch exampleRequest when called', () => {
        mappedDispatch.onExampleRequest();
        expect(dispatch).toHaveBeenCalledWith(exampleRequest());
      });
    });

    describe('onClearErrors', () => {
      it('should be injected', () => {
        expect(mappedDispatch.onExampleRequest).toBeDefined();
      });

      it('should dispatch clearErrors when called', () => {
        mappedDispatch.onClearErrors();
        expect(dispatch).toHaveBeenCalledWith(clearErrors());
      });
    });
  });
});
