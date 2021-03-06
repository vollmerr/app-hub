import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import Link from 'components/Link';
import { changeAppStatus } from 'containers/AppHub/actions';

import { ErrorMessage, Header, Message, mapDispatchToProps } from '../ErrorMessage';

const props = {
  onAuthUser: jest.fn(),
  onChangeAppStatus: jest.fn(),
  to: undefined,
  error: null,
};

describe('<ErrorMessage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ErrorMessage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a header', () => {
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it('should render a link to the homepage by default', () => {
    expect(wrapper.find(Link).length).toEqual(1);
    expect(wrapper.find(Link).prop('to')).toEqual('/');

    wrapper.find(Link).simulate('click');
    expect(props.onChangeAppStatus).toHaveBeenCalled();
  });

  it('should render the link passed', () => {
    const to = '/test';
    wrapper.setProps({ to });
    expect(wrapper.find(Link).length).toEqual(1);
    expect(wrapper.find(Link).prop('to')).toEqual(to);
  });

  it('should not render a message if none given', () => {
    expect(wrapper.find(Message).length).toEqual(0);
  });

  it('should render a message if given one', () => {
    const error = { message: 'test error message' };
    wrapper.setProps({ error });
    expect(wrapper.find(Message).length).toEqual(1);
    expect(wrapper.find(Message).contains(error.message)).toEqual(true);

    wrapper.setProps({ error: error.message });
    expect(wrapper.find(Message).length).toEqual(1);
    expect(wrapper.find(Message).contains(error.message)).toEqual(true);
  });

  describe('mapDispatchToProps', () => {
    const actions = {
      changeAppStatus,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
