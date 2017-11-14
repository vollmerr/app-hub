import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { testStyledComponent } from 'utils/testUtils';

import EmptyMessage, { Wrapper } from '../EmptyMessage';

testStyledComponent(Wrapper);

const props = {
  message: 'test message',
  onClick: jest.fn(),
  buttonText: 'test button text',
  buttonIcon: 'testIcon',
};


describe('<EmptyMessage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EmptyMessage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Wrapper`', () => {
    expect(wrapper.find(Wrapper).length).toEqual(1);
  });

  it('should render the `message`', () => {
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual(props.message);
  });

  it('should render a button if there is `buttonText`', () => {
    expect(wrapper.find(DefaultButton).length).toEqual(1);
  });

  it('should not render a button if there is no `buttonText`', () => {
    wrapper.setProps({ buttonText: '' });
    expect(wrapper.find(DefaultButton).length).toEqual(0);
  });
});
