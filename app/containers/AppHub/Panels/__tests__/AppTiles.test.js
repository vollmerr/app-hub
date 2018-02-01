import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';
import AppTile from '../../../../components/AppTile';

import AppTiles, { Wrapper } from '../AppTiles';


testStyledComponent(Wrapper);


const onClick = jest.fn();
const routes = [
  { name: 'route 1', key: 'test key 1' },
  { name: 'route 2', key: 'test key 2' },
];

describe('<AppTiles />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppTiles onClick={onClick} routes={routes} />);
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
