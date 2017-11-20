import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from 'utils/testUtils';

import AppTile from 'components/AppHub-Panel/AppTile';
import Apps, { Wrapper } from '../Apps';

testStyledComponent(Wrapper);

const props = {
  routes: [
    { key: '1', exact: true, path: 'path1', component: () => <div>1</div> },
    { key: '2', exact: false, path: 'path2', component: () => <div>2</div> },
    { key: '3', href: 'testHref' },
  ],
  onClick: jest.fn(),
};

describe('<Apps />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Apps {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map the routes to AppTiles', () => {
    expect(wrapper.find(AppTile).length).toEqual(props.routes.length);
  });

  it('should call the onCLick when clicked', () => {
    wrapper.find(AppTile).at(0).simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
