import React from 'react';
import { shallow } from 'enzyme';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { testStyledComponent } from '../../../utils/testUtils';

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
  let instance;
  beforeEach(() => {
    wrapper = shallow(<FieldRadios {...props} />);
    instance = wrapper.instance();
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

  it('should not pass `onBlur` or `onFocus`', () => {
    expect(wrapper.find(Radios).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(Radios).prop('onFocus')).toEqual(undefined);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });


  describe('componentWillReceiveProps', () => {
    it('should clear the `selectedKey` when redux form resets', () => {
      wrapper.setState({ selectedKey: 'testKey' });
      instance.componentWillReceiveProps({ input: { value: undefined } });
      expect(wrapper.state('selectedKey')).toEqual(null);
    });

    it('should not clear or update the `selectedKey` if redux form has value', () => {
      wrapper.setState({ selectedKey: 'testKey' });
      instance.componentWillReceiveProps({ input: { value: 'test value' } });
      expect(wrapper.state('selectedKey')).toEqual('testKey');
    });
  });


  describe('handleChange', () => {
    it('should handle changing the `selectedKey`', () => {
      const option = props.options[2];
      instance.handleChange(null, option);
      // update redux store
      expect(props.input.onChange).toHaveBeenCalledWith(option.key);
      // update local state (UI)
      expect(wrapper.state('selectedKey')).toEqual(option.key);
    });
  });
});
