import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { testStyledComponent } from 'utils/testUtils';
import { ACK } from 'containers/Spa/constants';

import DisableModal, { Warning } from '../DisableModal';

testStyledComponent(Warning);

const props = {
  type: 'test type',
  item: {
    [ACK.TITLE]: 'test title',
    [ACK.DETAILS]: 'test details',
  },
  onSubmit: jest.fn(),
  onClose: jest.fn(),
  hideModal: false,
};


describe('<DisableModal />', () => {
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<DisableModal {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Dialog`', () => {
    expect(wrapper.find(Dialog).length).toEqual(1);
  });

  it('should render some warning text', () => {
    expect(wrapper.find(Warning).length).toEqual(1);
  });

  it('should render a `DialogFooter` to contain action buttons', () => {
    expect(wrapper.find(Dialog).find(DialogFooter).length).toEqual(1);
  });

  it('should render a `PrimaryButton` for primary actions', () => {
    expect(wrapper.find(DialogFooter).find(PrimaryButton).length).toEqual(1);
  });

  it('should render a `DefaultButton` for secondary actions', () => {
    expect(wrapper.find(DialogFooter).find(DefaultButton).length).toEqual(1);
  });

  it('should `onSubmit` when clicking the primary button', () => {
    wrapper.find(PrimaryButton).simulate('click');
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('should `onClose` when clicking the secondary button', () => {
    wrapper.find(DefaultButton).simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });
});
