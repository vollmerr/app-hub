import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';
import { Form, FormButtons } from 'components/Form';
import { acknowledgment, newAckForm } from 'containers/Spa/data';

import { NewAckForm, Fields, FieldSection } from '../NewAckForm';

testStyledComponent(Fields);
testStyledComponent(FieldSection);


const props = {
  title: 'test title',
  fields: acknowledgment,
  sections: newAckForm.sections,
  handleSubmit: jest.fn(),
  reset: jest.fn(),
  pristine: false,
  submitting: false,
  onSubmit: jest.fn(),
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
    expect(wrapper.find('h3').text()).toEqual(props.title);
  });

  it('should render a `FormButtons` section for action buttons', () => {
    expect(wrapper.find(Form).find(FormButtons).length).toEqual(1);
  });

  it('should render all the fields', () => {
    const len = newAckForm.sections.left.length + newAckForm.sections.right.length;
    expect(wrapper.find('WrappedField').length).toEqual(len);
  });

  it('should call onSubmit with redux-form`s handleSubmit when submitting the form', () => {
    wrapper.find(Form).simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalledWith(props.onSubmit);
  });
});
