import React from 'react';
import { shallow } from 'enzyme';

import testStyledComponent from 'utils/testStyledComponent';

import AppTile from '../AppTile';
import Apps, { Wrapper } from '../Apps';

testStyledComponent(Wrapper);

const onClick = jest.fn();
const routes = [
  { name: 'route 1', key: 'test key 1' },
  { name: 'route 2', key: 'test key 2' },
];

describe('<Apps />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Apps onClick={onClick} routes={routes} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render a h2 header', () => {
    expect(wrapper.find('h2').length).toEqual(0);
  });

  it('should render the routes as AppTile`s', () => {
    expect(wrapper.find(AppTile).length).toEqual(routes.length);
  });
});
