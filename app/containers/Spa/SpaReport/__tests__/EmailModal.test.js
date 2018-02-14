import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Form } from 'react-final-form';

import { testStyledComponent } from '../../../../utils/testUtils';
import { FieldText } from '../../../../components/Form';

import { ACK } from '../../constants';

import EmailModal, { Warning } from '../EmailModal';


testStyledComponent(Warning);


const props = {
  item: {
    [ACK.TITLE]: 'test title',
    [ACK.DETAILS]: 'test details',
  },
  recipients: [{ key: 'rec1' }, { key: 'rec2' }],
  onSubmit: jest.fn(),
  onClose: jest.fn(),
  hidden: false,
};

const formProps = {
  reset: jest.fn(),
  pristine: false,
  submitting: false,
  handleSubmit: jest.fn(),
};


describe('<EmailModal />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<EmailModal {...props} />);
  });


  describe('renderForm', () => {
    let form;
    beforeEach(() => {
      const C = () => wrapper.instance().renderForm(formProps);
      form = shallow(<C />);
    });

    it('should render the number of recipients', () => {
      expect(form.find(Warning).length).toEqual(1);
      expect(form.find(Warning).dive().text()).toMatch(/\d/);
    });

    it('should render a text field to enter the email message', () => {
      expect(form.find(FieldText).length).toEqual(1);
    });

    it('should render a dialog footer', () => {
      expect(form.find(DialogFooter).length).toEqual(1);
    });

    it('should render a submit/primary button', () => {
      expect(form.find(PrimaryButton).length).toEqual(1);
    });

    it('should render a cancel/secondary button', () => {
      expect(form.find(DefaultButton).length).toEqual(1);
    });
  });


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a `Dialog`', () => {
      expect(wrapper.find(Dialog).length).toEqual(1);
    });

    it('should render a `Form`', () => {
      expect(wrapper.find(Form).length).toEqual(1);
    });
  });
});
