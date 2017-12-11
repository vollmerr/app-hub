import React from 'react';
import { shallow } from 'enzyme';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Default, { FieldDate, Picker } from '../FieldDate';
import { FieldDate as Index } from '../index';

testStyledComponent(Picker, DatePicker);

describe('Picker', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Picker disabled={false} />);
  });

  it('should render properly when not disabled', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });
});


describe('DatePicker.prototype', () => {
  it('DatePicker.prototype.componentWillReceiveProps should stay the same, or be updated/tested if changed', () => {
    expect(DatePicker.prototype.componentWillReceiveProps).toMatchSnapshot();
  });
  it('DatePicker.prototype._validateTextInput should stay the same, or be updated/tested if changed', () => {
    expect(DatePicker.prototype._validateTextInput).toMatchSnapshot(); // eslint-disable-line
  });
});


const props = {
  name: 'test name',
  meta: {
    error: null,
    touched: false,
  },
  input: {
    value: null,
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

describe('FieldDate', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FieldDate {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Picker`', () => {
    expect(wrapper.find(Picker).length).toEqual(1);
  });

  it('should handle errors if touched', () => {
    const error = 'test error';
    const meta = { error, touched: true };
    wrapper.setProps({ meta });
    expect(wrapper.find(Picker).prop('errorMessage')).toEqual(error);
  });

  it('should not render errors if not touched or no error', () => {
    let meta = { error: 'test error' };
    wrapper.setProps({ meta });
    expect(wrapper.find(Picker).prop('errorMessage')).toEqual(null);

    meta = { touched: true, error: null };
    wrapper.setProps({ meta });
    expect(wrapper.find(Picker).prop('errorMessage')).toEqual(null);
  });

  it('should not pass onBlur or onFocus', () => {
    expect(wrapper.find(Picker).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(Picker).prop('onFocus')).toEqual(undefined);
  });

  it('should handle changing the value', () => {
    const instance = wrapper.instance();
    expect(wrapper.find(Picker).prop('onSelectDate')).toEqual(instance.handleChange);

    const date = new Date('12/12/2010');
    instance.handleChange(date);
    expect(props.input.onChange).toHaveBeenCalledWith(date);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });
});
