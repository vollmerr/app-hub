import React from 'react';
import { shallow } from 'enzyme';
import { Field as ReactField } from 'react-final-form';

import { testStyledComponent } from '../../../utils/testUtils';

import Field, { composeValidators, format, StyledField } from '../Field';
import { Field as Index } from '../index';


testStyledComponent(StyledField, ReactField);


const WrappedComponent = () => <input type={'text'} />;
const requiredFunc = jest.fn();

const props = {
  name: 'test input',
  required: false,
  disabled: false,
  validate: [],
};


describe('composeValidators', () => {
  it('should return a function that reduces the validators to the first error', () => {
    const validators = [jest.fn(() => 'error message 1'), jest.fn(() => 'error message 2')];
    expect(composeValidators(...validators)('test')).toEqual('error message 1');
  });

  it('should  return a function that reduces the validators to undefined if no errors', () => {
    const validators = [jest.fn(() => undefined), jest.fn(() => undefined)];
    expect(composeValidators(...validators)('test')).toEqual(undefined);
  });
});


describe('format', () => {
  it('should return a function that formats based off the `format` property', () => {
    const component = { format: (x) => x.toUpperCase() };
    expect(format(component)('test')).toEqual('TEST');
  });

  it('should the value if no format provided', () => {
    expect(format({})('test')).toEqual('test');
  });

  it('should be a empty string if no format provided and no value', () => {
    expect(format({})()).toEqual('');
  });
});


describe('Field', () => {
  let Hoc;
  let wrapper;
  beforeEach(() => {
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
    expect(wrapper.find(StyledField).length).toEqual(1);
    expect(wrapper.find(StyledField).prop('component')).toEqual(WrappedComponent);
  });

  it('should be required if not disabled', () => {
    wrapper.setProps({ required: true });
    expect(wrapper.find(StyledField).prop('required')).toEqual(true);
  });

  it('should be not be required if disabled', () => {
    wrapper.setProps({ required: true, disabled: true });
    expect(wrapper.find(StyledField).prop('required')).toEqual(false);
  });

  // it('should pass addtional validation if not disabled', () => {
  //   const validate = [jest.fn(), jest.fn()];
  //   wrapper.setProps({ validate });
  //   expect(wrapper.find(ReactField).prop('validate')).toEqual(validate);

  //   wrapper.setProps({ required: true });
  //   expect(wrapper.find(ReactField).prop('validate')).toEqual([...validate, requiredFunc]);
  // });

  // it('should not pass addtional validation if disabled', () => {
  //   const validate = [jest.fn(), jest.fn()];
  //   wrapper.setProps({ disabled: true, validate });
  //   expect(wrapper.find(ReactField).prop('validate')).toEqual([]);

  //   wrapper.setProps({ required: true });
  //   expect(wrapper.find(ReactField).prop('validate')).toEqual([]);
  // });

  it('should be exported in the index', () => {
    expect(Field).toBe(Index);
  });
});
