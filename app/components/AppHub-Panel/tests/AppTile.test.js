import React from 'react';
import { shallow } from 'enzyme';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import testStyledComponent from 'utils/testStyledComponent';

import Link from 'components/Link';
import AppTile, { App, StyledIcon, Text } from '../AppTile';

testStyledComponent(App, Link);
testStyledComponent(StyledIcon, Icon);
testStyledComponent(Text);

const route = {
  path: '/test-route',
  name: 'test name',
  icon: 'test icon',
};

describe('<AppTile />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppTile route={route} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a link', () => {
    expect(wrapper.find(App).length).toEqual(1);
    expect(wrapper.find(App).prop('to')).toEqual(route.path);
  });

  it('should render an icon', () => {
    expect(wrapper.find(StyledIcon).length).toEqual(1);
    expect(wrapper.find(StyledIcon).prop('iconName')).toEqual(route.icon);
  });

  it('should render the name as text', () => {
    expect(wrapper.find(Text).length).toEqual(1);
    expect(wrapper.find(Text).children().text()).toEqual(route.name);
  });

  it('should call onClick when clicked on', () => {
    const onClick = jest.fn();
    wrapper.setProps({ onClick });
    wrapper.find(App).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
