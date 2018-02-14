import React from 'react';
import { shallow } from 'enzyme';

import Panel from '../index';
import Wrapper from '../Wrapper';
import Overlay from '../Overlay';

const Children = () => <div>test children</div>;

const props = {
  isOpen: true,
  onClick: jest.fn(),
  isLeft: false,
};


describe('<Panel />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Panel {...props}><Children /></Panel>
    );
  });

  it('should render correctly', () => {
    expect(wrapper.find(Wrapper).length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render nothing if not open', () => {
    wrapper.setProps({ isOpen: false });
    expect(wrapper.find(Wrapper).length).toEqual(0);
  });

  it('should call onClick when Overlay is clicked', () => {
    wrapper.find(Overlay).simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should render its children', () => {
    expect(wrapper.find(Children).length).toEqual(1);
  });
});
