import React from 'react';
import { shallow } from 'enzyme';

import Link from 'components/Link';
import ErrorMessage, { Header, Message } from '../ErrorMessage';


describe('<ErrorMessage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ErrorMessage />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a header', () => {
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it('should render a link to the homepage', () => {
    expect(wrapper.find(Link).length).toEqual(1);
  });

  it('should not render a message if none given', () => {
    expect(wrapper.find(Message).length).toEqual(0);
  });

  it('should render a message if given one', () => {
    const error = { message: 'test error message' };
    wrapper.setProps({ error });
    expect(wrapper.find(Message).length).toEqual(1);
    expect(wrapper.find(Message).contains(error.message)).toEqual(true);
  });
});
