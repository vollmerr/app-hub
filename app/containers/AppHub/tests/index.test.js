import React from 'react';
import { shallow } from 'enzyme';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { testStyledComponent } from 'utils/testUtils';
import Router from 'components/Router';

import AppHubEntry, { Wrapper, Content } from '../index';
import AppHub from '../AppHub';
import routes from '../routes';

testStyledComponent(Wrapper, Fabric);
testStyledComponent(Content);

describe('<AppHubEntry />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppHubEntry />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the AppHub container', () => {
    expect(wrapper.find(AppHub).length).toEqual(1);
  });

  it('should render the Router (apps / content)', () => {
    expect(wrapper.find(Router).length).toEqual(1);
  });

  it('should pass the routes to the AppHub', () => {
    expect(wrapper.find(AppHub).prop('routes')).toEqual(routes);
  });

  it('should pass the routes to the Router', () => {
    expect(wrapper.find(Router).prop('routes')).toEqual(routes);
  });
});
