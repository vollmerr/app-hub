import React from 'react';
import { shallow } from 'enzyme';
import Dropzone from 'react-dropzone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import Default, { FieldFile, FilePicker, FileName } from '../FieldFile';
import { FieldFile as Index } from '../index';
import FieldError from '../FieldError';

testStyledComponent(FilePicker, Dropzone);
testStyledComponent(FileName);

describe('FieldFile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FilePicker disabled={false} data-error={null} />);
  });

  it('should render properly when not disabled or errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when disabled', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when errors', () => {
    wrapper.setProps({ 'data-error': 'test error' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when disabled and errors', () => {
    wrapper.setProps({ disabled: true, 'data-error': 'test error' });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('FileName', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FileName disabled={false} />);
  });

  it('should render properly when not disabled', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when disabled', () => {
    wrapper.setProps({ disabled: true });
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
  disabled: false,
  required: false,
  placeholder: '',
};

const files = [{ name: 'file1' }];

describe('FieldFile', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FieldFile {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `label`', () => {
    expect(wrapper.find(Label).length).toEqual(1);
  });

  it('should not render a `label` if none passed', () => {
    wrapper.setProps({ label: undefined });
    expect(wrapper.find(Label).length).toEqual(0);
  });

  it('should render a FilePicker', () => {
    expect(wrapper.find(FilePicker).length).toEqual(1);
  });

  it('should render the file name', () => {
    const name = 'test name';
    wrapper.setState({ files: [{ name }] });
    expect(wrapper.find(FileName).length).toEqual(1);
    expect(wrapper.find(FileName).dive().text()).toEqual(name);
  });

  it('should render the placeholder when no file selected', () => {
    const placeholder = 'test placeholder';
    wrapper.setProps({ placeholder });
    expect(wrapper.find(FileName).length).toEqual(1);
    expect(wrapper.find(FileName).dive().text()).toEqual(placeholder);
  });

  it('should render the a `DefaultButton` to attach a file', () => {
    expect(wrapper.find(DefaultButton).length).toEqual(1);
    expect(wrapper.find(DefaultButton).prop('text')).toEqual('Attach File');
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

  it('should not pass onBlur, onFocus, or onChange', () => {
    expect(wrapper.find(FilePicker).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(FilePicker).prop('onFocus')).toEqual(undefined);
    expect(wrapper.find(FilePicker).prop('onChange')).toEqual(undefined);
    expect(wrapper.find(DefaultButton).prop('onBlur')).toEqual(undefined);
    expect(wrapper.find(DefaultButton).prop('onFocus')).toEqual(undefined);
    expect(wrapper.find(DefaultButton).prop('onChange')).toEqual(undefined);
  });

  it('should be exported (wrapped) in the index', () => {
    expect(Default).toBe(Index);
  });

  describe('componentWillReceiveProps', () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
    });

    it('should handle clearing the files and error when no value from redux-form (on form reset)', () => {
      // start state off with files
      const attachError = 'test error';
      wrapper.setState({ files, attachError });
      // set an input value, should not change files
      let input = { ...props.input, value: [...files, { name: 'other file' }] };
      instance.componentWillReceiveProps({ ...props, input });
      expect(wrapper.state('files')).toEqual(files);
      // simulate clearing form (no input.value), should clear all files
      input = { ...props.input, value: undefined };
      instance.componentWillReceiveProps({ ...props, input });
      expect(wrapper.state('files')).toEqual([]);
      // test again with empy array
      input = { ...props.input, value: [] };
      instance.componentWillReceiveProps({ ...props, input });
      expect(wrapper.state('files')).toEqual([]);
    });
  });

  describe('onDrop', () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
    });

    it('should handle calling redux-form`s onChange', () => {
      // acceptedFiles
      instance.onDrop(files, []);
      expect(props.input.onChange).toHaveBeenCalledWith(files);
      // rejectedFiles
      instance.onDrop([], files);
      expect(props.input.onChange).toHaveBeenCalledWith(files);
    });

    it('should handle updating `files` and `attachError` in the state', () => {
      // acceptedFiles
      instance.onDrop(files, []);
      expect(wrapper.state('files')).toEqual(files);
      expect(wrapper.state('attachError')).toEqual(null);
      // rejectedFiles
      instance.onDrop([], files);
      expect(wrapper.state('files')).toEqual(files);
      expect(wrapper.state('attachError')).toEqual('Failed to attch file.');
    });
  });
});
