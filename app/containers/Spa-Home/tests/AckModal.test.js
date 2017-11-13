import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import AckModal from '../AckModal';

const props = {
  item: {
    name: 'test name',
    details: 'test details',
  },
  onAck: jest.fn(),
  onRead: jest.fn(),
  onClose: jest.fn(),
  hasRead: false,
  hideModal: false,
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
    expect(wrapper.find(PrimaryButton).prop('text')).toEqual('Read');
  });

  it('should handle acknowledging when pressing the primary button if read', () => {
    wrapper.setProps({ hasRead: true });
    expect(wrapper.find(PrimaryButton).prop('onClick')).toEqual(props.onAck);
    expect(wrapper.find(PrimaryButton).prop('text')).toEqual('Confirm');
  });
});