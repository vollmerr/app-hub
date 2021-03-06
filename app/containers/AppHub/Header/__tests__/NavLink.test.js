import React from 'react';
import { shallow } from 'enzyme';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { testStyledComponent } from 'utils/testUtils';

import Link from 'components/Link';
import NavLink, { ButtonStyled, Button } from '../NavLink';


testStyledComponent(ButtonStyled, CommandButton);


const href = 'http://www.google.com';
const to = '/test-route';


describe('<NavLink />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavLink />);
  });

  it('should render a link by default', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Link).length).toEqual(0);
  });

  it('should render an internal link if passed `to`', () => {
    wrapper.setProps({ to });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Link).length).toEqual(1);
    expect(wrapper.find(Link).prop('to')).toEqual(to);
  });

  it('should render an external link if passed `href`', () => {
    wrapper.setProps({ href });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Link).length).toEqual(1);
    expect(wrapper.find(Link).prop('href')).toEqual(href);
  });

  it('should be a button', () => {
    expect(wrapper.find(Button).length).toEqual(1);
    wrapper.setProps({ href });
    expect(wrapper.find(Button).length).toEqual(1);
    wrapper.setProps({ to });
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it('should generate the correct iconProps', () => {
    const iconProps = { name: 'test icon name' };
    const expected = { style: { fontSize: '20px' }, ...iconProps };
    wrapper.setProps({ iconProps });
    expect(wrapper.find(Button).prop('iconProps')).toEqual(expected);
  });
});


const onClick = jest.fn();
const panel = 'test panel';


describe('<Button />', () => {
  let wrapper;
  beforeEach(() => {
    onClick.mockReset();
    wrapper = shallow(<Button onClick={onClick} panel={panel} />);
  });

  it('should not have an onClick if not passed one', () => {
    wrapper.setProps({ onClick: undefined });
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should pass the panel to the onClick', () => {
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledWith(panel);
  });
});
