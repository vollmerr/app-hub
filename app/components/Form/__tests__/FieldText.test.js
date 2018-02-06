import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import Default, { FieldText } from '../FieldText';
import { FieldText as Index } from '../index';


const props = {
  name: 'test name',
  meta: {
    error: null,
    touched: false,
  },
  input: {
    value: '',
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn(),
  },
};


describe('FieldText', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<FieldText {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `TextField`', () => {
    expect(wrapper.find(TextField).length).toEqual(1);
  });

  it('should handle errors if touched', () => {
    const error = 'test error';
    const meta = { error, touched: true };
    wrapper.setProps({ meta });
    expect(wrapper.find(TextField).prop('errorMessage')).toEqual(error);
  });

  it('should not render errors if not touched or no error', () => {
    let meta = { error: 'test error' };
    wrapper.setProps({ meta });
    expect(wrapper.find(TextField).prop('errorMessage')).toEqual('');

    meta = { touched: true, error: null };
    wrapper.setProps({ meta });
    expect(wrapper.find(TextField).prop('errorMessage')).toEqual('');
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });


  describe('componentWillReceiveProps', () => {
    it('should clear the `value` when redux form resets', () => {
      wrapper.setState({ value: 'test value' });
      instance.componentWillReceiveProps({ input: { value: undefined } });
      expect(wrapper.state('value')).toEqual('');
    });

    it('should not clear or update the `value` if redux form has a value', () => {
      const value = 'test value';
      wrapper.setState({ value });
      instance.componentWillReceiveProps({ input: { value } });
      expect(wrapper.state('value')).toEqual(value);
    });
  });


  describe('handleChange', () => {
    it('should handle changing the `value` to the redux stores value', () => {
      const value = 'test value';
      wrapper.setProps({ input: { ...props.input, value } });
      instance.handleChange();
      expect(wrapper.state('value')).toEqual(value);
    });

    it('should handle changing the `value` a default if none provided', () => {
      const value = undefined;
      wrapper.setProps({ input: { ...props.input, value } });
      instance.handleChange();
      expect(wrapper.state('value')).toEqual('');
    });
  });
});
