import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Form } from 'react-final-form';

import { ACK } from 'containers/Spa/constants';
import { FieldChecks } from 'components/Form';
import { testStyledComponent } from 'utils/testUtils';

import { AckModal, FieldChecksTop } from '../AckModal';


testStyledComponent(FieldChecksTop, FieldChecks);


const props = {
  item: {
    [ACK.TITLE]: 'test title',
    [ACK.DETAILS]: 'test details',
    [ACK.STATEMENT]: 'test statement',
  },
  onSubmit: jest.fn(),
  onRead: jest.fn(),
  onClose: jest.fn(),
  hasRead: false,
  hideModal: false,
};

const formProps = {
  values: props.item,
  handleSubmit: jest.fn(),
};


describe('<AckModal />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AckModal {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Dialog`', () => {
    expect(wrapper.find(Dialog).length).toEqual(1);
    expect(wrapper.find(Dialog).prop('hidden')).toEqual(false);
  });

  it('should render a `Form`', () => {
    expect(wrapper.find(Form).length).toEqual(1);
  });

  it('should hide the model when `hideModal`', () => {
    wrapper.setProps({ hideModal: true });
    expect(wrapper.find(Dialog).prop('hidden')).toEqual(true);
  });


  describe('handleClose', () => {
    it('should handle closing the modal', () => {
      instance.handleClose();
      expect(props.onClose).toHaveBeenCalled();
    });
  });


  describe('renderForm', () => {
    let form;
    beforeEach(() => {
      const C = () => instance.renderForm(formProps);
      form = shallow(<C />);
    });

    it('should render a form', () => {
      expect(form.find('form').length).toEqual(1);
    });

    it('should render a checkbox', () => {
      expect(form.find(FieldChecksTop).length).toEqual(1);
    });

    it('should render a `DialogFooter`', () => {
      expect(form.find(DialogFooter).length).toEqual(1);
    });

    it('should render a primary action button in the footer', () => {
      const button = form.find(DialogFooter).find(PrimaryButton);
      expect(button.length).toEqual(1);
    });

    it('should render a secondary action button in the footer', () => {
      const button = form.find(DialogFooter).find(DefaultButton);
      expect(button.length).toEqual(1);
    });

    it('should handle reading when pressing the primary button if not read', () => {
      expect(form.find(PrimaryButton).prop('onClick')).toEqual(props.onRead);
      expect(form.find(PrimaryButton).prop('text')).toEqual('Download');
    });

    it('should handle acknowledging when pressing the primary button if read', () => {
      wrapper.setProps({ hasRead: true });
      const C = () => instance.renderForm(formProps);
      form = shallow(<C />);
      expect(form.find(PrimaryButton).prop('onClick')).toEqual(props.onSubmit);
      expect(form.find(PrimaryButton).prop('text')).toEqual('Submit');
    });
  });
});
