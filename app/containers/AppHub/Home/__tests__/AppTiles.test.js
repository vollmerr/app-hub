import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';
import AppTile from '../../../../components/AppTile';

import AppTiles, { Wrapper } from '../AppTiles';


testStyledComponent(Wrapper);


const props = {
  routes: [
    { key: '1', exact: true, path: 'path1', component: () => <div>1</div> },
    { key: '2', exact: false, path: 'path2', component: () => <div>2</div> },
    { key: '3', href: 'testHref' },
  ],
};


describe('<AppTiles />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppTiles {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map the routes to AppTiles', () => {
    expect(wrapper.find(AppTile).length).toEqual(props.routes.length);
  });
});
