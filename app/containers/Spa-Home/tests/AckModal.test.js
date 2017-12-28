import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

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
  reset: jest.fn(),
  onSubmit: jest.fn(),
  onRead: jest.fn(),
  onClose: jest.fn(),
  hasAck: false,
  hasRead: false,
  hideModal: false,
  handleSubmit: jest.fn(),
};

describe('<AckModal />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AckModal {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Dialog`', () => {
    expect(wrapper.find(Dialog).length).toEqual(1);
    expect(wrapper.find(Dialog).prop('hidden')).toEqual(false);
  });

  it('should render a `DialogFooter`', () => {
    expect(wrapper.find(Dialog).find(DialogFooter).length).toEqual(1);
  });

  it('should hide the model when `hideModal`', () => {
    wrapper.setProps({ hideModal: true });
    expect(wrapper.find(Dialog).prop('hidden')).toEqual(true);
  });

  it('should render a primary action button in the footer', () => {
    const button = wrapper.find(Dialog).find(DialogFooter).find(PrimaryButton);
    expect(button.length).toEqual(1);
  });

  it('should render a secondary action button in the footer', () => {
    const button = wrapper.find(Dialog).find(DialogFooter).find(DefaultButton);
    expect(button.length).toEqual(1);
  });

  it('should handle reading when pressing the primary button if not read', () => {
    expect(wrapper.find(PrimaryButton).prop('onClick')).toEqual(props.onRead);
    expect(wrapper.find(PrimaryButton).prop('text')).toEqual('Download');
  });

  it('should handle acknowledging when pressing the primary button if read', () => {
    wrapper.setProps({ hasRead: true });
    expect(wrapper.find(PrimaryButton).prop('onClick')).toEqual(props.onSubmit);
    expect(wrapper.find(PrimaryButton).prop('text')).toEqual('Submit');
  });

  it('should reset the form before closing (should be in parent component but wont work..)', () => {
    wrapper.instance().handleClose();
    expect(props.reset).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
