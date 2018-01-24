import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-final-form';

import { testStyledComponent } from 'utils/testUtils';
import { FormSection, FormButtons } from 'components/Form';
import { acknowledgment, newAckForm } from 'containers/Spa/data';

import { NewAckForm, Fields, FieldSection } from '../NewAckForm';

testStyledComponent(Fields);
testStyledComponent(FieldSection);


const props = {
  title: 'test title',
  fields: acknowledgment,
  sections: newAckForm.sections,
  onSubmit: jest.fn(),
};

const formProps = {
  reset: jest.fn(),
  pristine: false,
  submitting: false,
  handleSubmit: jest.fn(),
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


  describe('renderForm', () => {
    let form;
    beforeEach(() => {
      const C = () => wrapper.instance().renderForm(formProps);
      form = shallow(<C />);
    });

    it('should render a `FormSection`', () => {
      expect(form.find(FormSection).length).toEqual(1);
    });

    it('should render a title (h3)', () => {
      expect(form.find('h3').length).toEqual(1);
      expect(form.find('h3').text()).toEqual(props.title);
    });

    it('should render all the fields', () => {
      const len = newAckForm.sections.left.length + newAckForm.sections.right.length;
      expect(form.find('WrappedField').length).toEqual(len);
    });

    it('should render a `FormButtons` section for action buttons', () => {
      expect(form.find(FormButtons).length).toEqual(1);
    });
  });
});
