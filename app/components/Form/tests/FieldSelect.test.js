import React from 'react';
import { shallow } from 'enzyme';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';

import Default, { FieldSelect } from '../FieldSelect';
import { FieldSelect as Index } from '../index';

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
    wrapper = shallow(<FieldSelect {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `TextField`', () => {
    expect(wrapper.find(ComboBox).length).toEqual(1);
  });

  it('should handle errors if touched', () => {
    const error = 'test error';
    const meta = { error, touched: true };
    wrapper.setProps({ meta });
    expect(wrapper.find(ComboBox).prop('errorMessage')).toEqual(error);
  });

  it('should not render errors if not touched or no error', () => {
    let meta = { error: 'test error' };
    wrapper.setProps({ meta });
    expect(wrapper.find(ComboBox).prop('errorMessage')).toEqual('');

    meta = { touched: true, error: null };
    wrapper.setProps({ meta });
    expect(wrapper.find(ComboBox).prop('errorMessage')).toEqual('');
  });

  it('should call handle changing the selected key', () => {
    const option = props.options[2];
    const instance = wrapper.instance();
    instance.handleChange(option);
    expect(props.input.onChange).toHaveBeenCalledWith(option.key);
  });

  it('should not pass onBlur', () => {
    expect(wrapper.find(ComboBox).prop('onBlur')).toEqual(undefined);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });
});
