import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import DisableModal from '../DisableModal';

const props = {
  item: {
    name: 'test name',
    details: 'test details',
  },
  onConfirm: jest.fn(),
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

  it('should render a `DialogFooter` to contain action buttons', () => {
    expect(wrapper.find(Dialog).find(DialogFooter).length).toEqual(1);
  });

  it('should render a `PrimaryButton` for primary actions', () => {
    expect(wrapper.find(DialogFooter).find(PrimaryButton).length).toEqual(1);
  });

  it('should render a `DefaultButton` for secondary actions', () => {
    expect(wrapper.find(DialogFooter).find(DefaultButton).length).toEqual(1);
  });

  it('should `onConfirm` when clicking the primary button', () => {
    wrapper.find(PrimaryButton).simulate('click');
    expect(props.onConfirm).toHaveBeenCalled();
  });

  it('should `onClose` when clicking the secondary button', () => {
    wrapper.find(DefaultButton).simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });
});
