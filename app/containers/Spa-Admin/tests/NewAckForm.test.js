import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { Form, FormButtons } from 'components/Form';

import { NewAckForm } from '../NewAckForm';
import fields from '../fields';

const props = {
  handleSubmit: jest.fn(),
  reset: jest.fn(),
  pristine: false,
  submitting: false,
};


describe('<NewAckForm />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<NewAckForm {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Form`', () => {
    expect(wrapper.find(Form).length).toEqual(1);
  });

  it('should render a title (h3)', () => {
    expect(wrapper.find(Form).find('h3').length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual(fields.title);
  });

  it('should render a `FormButtons` section for action buttons', () => {
    expect(wrapper.find(Form).find(FormButtons).length).toEqual(1);
  });

  it('should submit and clear `DefaultButton`s in the buttons seciton', () => {
    expect(wrapper.find(FormButtons).find(DefaultButton).length).toEqual(2);
  });

  it('should render all the fields', () => {
    expect(wrapper.find('WrappedField').length).toEqual(fields.allNames.length);
  });

  it('should disable the buttons when `pristine` or `submitting`', () => {
    wrapper.setProps({ pristine: true });
    expect(wrapper.find(DefaultButton).at(0).prop('disabled')).toEqual(true);
    wrapper.setProps({ pristine: false, submitting: true });
    expect(wrapper.find(DefaultButton).at(1).prop('disabled')).toEqual(true);
  });
});
