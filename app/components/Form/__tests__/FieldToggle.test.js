import React from 'react';
import { shallow } from 'enzyme';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { testStyledComponent } from '../../../utils/testUtils';

import Default, { FieldToggle, StyledToggle } from '../FieldToggle';
import { FieldToggle as Index } from '../index';


testStyledComponent(StyledToggle, Toggle);


const styledToggleProps = {
  warning: false,
  disabled: false,
  required: false,
  checked: false,
  readOnly: false,
  errorMessage: null,
};


describe('StyledToggle', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StyledToggle {...styledToggleProps} />);
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when checked', () => {
    wrapper.setProps({ checked: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when is readOnly', () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ checked: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when is disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when is required', () => {
    wrapper.setProps({ required: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when has warning', () => {
    wrapper.setProps({ warning: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ checked: null });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when has errorMessage', () => {
    wrapper.setProps({ errorMessage: 'error!' });
    expect(wrapper).toMatchSnapshot();
  });
});


const props = {
  meta: {
    error: null,
    touched: false,
  },
  input: {
    value: 0,
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onChange: jest.fn(),
  },
  isNullable: false,
};


describe('FieldToggle', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<FieldToggle {...props} />);
    instance = wrapper.instance();
  });

  it('should have a format property that coerces to a Number, and defaults to undefined', () => {
    expect(FieldToggle.format(undefined)).toEqual(undefined);
    expect(FieldToggle.format('1')).toEqual(1);
    expect(FieldToggle.format(0)).toEqual(0);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });

  describe('componentWillReceiveProps', () => {
    it('should update if `checked`', () => {
      const value = 1;
      instance.componentWillReceiveProps({ input: { value }, meta: {} });
      expect(wrapper.state('checked')).toEqual(value);
    });

    it('should update the `errorMessage`', () => {
      const error = 'test error';
      const meta = { error, touched: true };
      instance.componentWillReceiveProps({ input: {}, meta });
      expect(wrapper.state('errorMessage')).toEqual(error);
    });
  });


  describe('getChecked', () => {
    it('should return the value as a number', () => {
      expect(instance.getChecked(true)).toEqual(1);
      expect(instance.getChecked(1)).toEqual(1);
    });

    it('should return null and undefined values as 0', () => {
      expect(instance.getChecked(null)).toEqual(0);
      expect(instance.getChecked(undefined)).toEqual(0);
    });

    it('should return null and undefined values as undefined if `isNullable`', () => {
      wrapper.setProps({ isNullable: true });
      expect(instance.getChecked(null)).toEqual(undefined);
      expect(instance.getChecked(undefined)).toEqual(undefined);
    });
  });


  describe('handleChange', () => {
    it('should update redux form', () => {
      const value = 0;
      instance.handleChange(value);
      expect(props.input.onChange).toHaveBeenCalledWith(value);
    });
  });


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a `StyledToggle`', () => {
      expect(wrapper.find(StyledToggle).length).toEqual(1);
    });

    it('should handle errors if touched', () => {
      const error = 'test error';
      const meta = { error, touched: true };
      wrapper.setProps({ meta });
      expect(wrapper.find(StyledToggle).prop('errorMessage')).toEqual(error);
    });

    it('should not render errors if not touched or no error', () => {
      let meta = { error: 'test error' };
      wrapper.setProps({ meta });
      expect(wrapper.find(StyledToggle).prop('errorMessage')).toEqual('');

      meta = { touched: true, error: null };
      wrapper.setProps({ meta });
      expect(wrapper.find(StyledToggle).prop('errorMessage')).toEqual('');
    });
  });
});
