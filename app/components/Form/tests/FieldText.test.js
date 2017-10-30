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
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FieldText {...props} />);
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
});
