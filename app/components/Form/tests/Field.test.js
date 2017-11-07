import React from 'react';
import { shallow } from 'enzyme';
import { Field as ReduxField } from 'redux-form/immutable';

import Field from '../Field';
import { Field as Index } from '../index';

const WrappedComponent = () => <input type={'text'} />;
const requiredFunc = jest.fn();

const props = {
  name: 'test input',
  required: false,
  disabled: false,
  validate: [],
};

describe('Field', () => {
  let Hoc;
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    Hoc = Field(WrappedComponent, requiredFunc);
    wrapper = shallow(<Hoc {...props} />);
  });

  it('should be a HOC (returns a class or function)', () => {
    expect(Field()).toBeInstanceOf(Function);
  });

  it('should render the returned component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a redux-form Field with the passed component', () => {
    expect(wrapper.find(ReduxField).length).toEqual(1);
    expect(wrapper.find(ReduxField).prop('component')).toEqual(WrappedComponent);
  });

  it('should be required if not disabled', () => {
    wrapper.setProps({ required: true });
    expect(wrapper.find(ReduxField).prop('required')).toEqual(true);
    expect(wrapper.find(ReduxField).prop('validate')).toEqual([requiredFunc]);
  });

  it('should be not be required if disabled', () => {
    wrapper.setProps({ required: true, disabled: true });
    expect(wrapper.find(ReduxField).prop('required')).toEqual(false);
    expect(wrapper.find(ReduxField).prop('validate')).toEqual([]);
  });

  it('should pass addtional validation if not disabled', () => {
    const validate = [jest.fn(), jest.fn()];
    wrapper.setProps({ validate });
    expect(wrapper.find(ReduxField).prop('validate')).toEqual(validate);

    wrapper.setProps({ required: true });
    expect(wrapper.find(ReduxField).prop('validate')).toEqual([...validate, requiredFunc]);
  });

  it('should not pass addtional validation if disabled', () => {
    const validate = [jest.fn(), jest.fn()];
    wrapper.setProps({ disabled: true, validate });
    expect(wrapper.find(ReduxField).prop('validate')).toEqual([]);

    wrapper.setProps({ required: true });
    expect(wrapper.find(ReduxField).prop('validate')).toEqual([]);
  });

  it('should format empty strings correctly', () => {
    const value = 'test value';
    expect(wrapper.find(ReduxField).prop('format')('')).toEqual([]);
    expect(wrapper.find(ReduxField).prop('format')(value)).toEqual(value);
  });

  it('should be exported in the index', () => {
    expect(Field).toBe(Index);
  });
});
