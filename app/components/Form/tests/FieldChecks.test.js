import React from 'react';
import { shallow } from 'enzyme';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Default, { FieldChecks, Check } from '../FieldChecks';
import { FieldChecks as Index } from '../index';
import FieldError from '../FieldError';

testStyledComponent(Check, Checkbox);

describe('Check', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Check errorMessage={null} />);
  });

  it('should render properly when no errorMessage', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when errorMessage', () => {
    wrapper.setProps({ errorMessage: 'test error' });
    expect(wrapper).toMatchSnapshot();
  });
});

const props = {
  label: 'test label',
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
  options: [
    { key: 'key1', text: 'text 1' },
    { key: 'key2', text: 'text 2' },
    { key: 'key3', text: 'text 3' },
  ],
};

describe('FieldChecks', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FieldChecks {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `label`', () => {
    expect(wrapper.find(Label).length).toEqual(1);
  });

  it('should render 3 `Check` boxes', () => {
    expect(wrapper.find(Check).length).toEqual(3);
  });

  it('should handle errors if touched', () => {
    const error = 'test error';
    const meta = { error, touched: true };
    wrapper.setProps({ meta });
    expect(wrapper.find(FieldError).length).toEqual(1);
    expect(wrapper.find(FieldError).dive().text()).toContain(error);
  });

  it('should not render errors if not touched or no error', () => {
    let meta = { error: 'test error' };
    wrapper.setProps({ meta });
    expect(wrapper.find(FieldError).length).toEqual(0);

    meta = { touched: true, error: null };
    wrapper.setProps({ meta });
    expect(wrapper.find(FieldError).length).toEqual(0);
  });

  it('should not pass onBlur or onFocus', () => {
    expect(wrapper.find(Check).at(0).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(Check).at(0).prop('onFocus')).toEqual(undefined);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });

  describe('componentWillReceiveProps', () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
    });

    it('should handle setting the options to unchecked when no value from redux-form (on form reset)', () => {
      // start state off with value
      let options = [...props.options];
      options[2].checked = true;
      wrapper.setState({ options });
      // set an input value, should not change options
      let input = { ...props.input, value: 'test value' };
      instance.componentWillReceiveProps({ ...props, input });
      expect(wrapper.state('options')).toEqual(options);
      // simulate clearing form (no input.value), should make all `checked: false`
      options = options.map((option) => ({ ...option, checked: false }));
      input = { ...props.input, value: undefined };
      instance.componentWillReceiveProps({ ...props, input });
      expect(wrapper.state('options')).toEqual(options);
    });
  });

  describe('handleChange', () => {
    let instance;
    let key;
    beforeEach(() => {
      key = props.options[2].key;
      instance = wrapper.instance();
    });

    it('should handle calling redux-form`s onChange', () => {
      // check
      instance.handleChange(null, true, key);
      expect(props.input.onChange).toHaveBeenCalledWith([key]);
      // uncheck
      instance.handleChange(null, false, key);
      expect(props.input.onChange).toHaveBeenCalledWith([]);
    });

    it('should handle updating `options` in the state', () => {
      const options = [...props.options];
      // check
      options[2].checked = true;
      instance.handleChange(null, true, key);
      expect(wrapper.state('options')).toEqual(options);
      // uncheck
      options[2].checked = false;
      instance.handleChange(null, false, key);
      expect(wrapper.state('options')).toEqual(options);
    });

    it('should be called when a checkbox is changed', () => {
      instance.handleChange = jest.fn();
      wrapper.find(Check).at(2).simulate('change', null, true);
      expect(instance.handleChange).toHaveBeenCalledWith(null, true, key);
    });
  });
});
