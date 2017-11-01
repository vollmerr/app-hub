import React from 'react';
import { shallow } from 'enzyme';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Default, { FieldRadios, Radios } from '../FieldRadios';
import { FieldRadios as Index } from '../index';
import FieldError from '../FieldError';

testStyledComponent(Radios, ChoiceGroup);

describe('Radios', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Radios errorMessage={null} />);
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

describe('FieldSelect', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FieldRadios {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Radios`', () => {
    expect(wrapper.find(Radios).length).toEqual(1);
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

  it('should handle changing the selected key', () => {
    const option = props.options[2];
    const instance = wrapper.instance();
    instance.handleChange(null, option);
    expect(props.input.onChange).toHaveBeenCalledWith(option.key);
  });

  it('should not pass onBlur or onFocus', () => {
    expect(wrapper.find(Radios).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(Radios).prop('onFocus')).toEqual(undefined);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });
});
