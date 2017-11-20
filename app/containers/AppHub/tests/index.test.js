import React from 'react';
import { shallow } from 'enzyme';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import LoadingMessage from 'components/Loading/LoadingMessage';
import { testStyledComponent } from 'utils/testUtils';
import Router from 'components/Router';

import AppHubRoot, { Wrapper, Content } from '../index';
import AppHub from '../AppHub';
import routes from '../routes';

testStyledComponent(Wrapper, Fabric);
testStyledComponent(Content);


describe('<AppHubRoot />', () => {
  let wrapper;
  beforeEach(() => {
    localStorage.setItem = jest.fn();
    localStorage.getItem = jest.fn();
    wrapper = shallow(<AppHubRoot />);
  });

  it('should render correctly if not authenticated', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if authenticated', () => {
    wrapper.setState({ isAuthenticated: true });
    expect(wrapper).toMatchSnapshot();
  });


  it('should render the AppHub container', () => {
    expect(wrapper.find(AppHub).length).toEqual(1);
    wrapper.setState({ isAuthenticated: true });
    expect(wrapper.find(AppHub).length).toEqual(1);
  });

  it('should render a loading message if not authenticated', () => {
    expect(wrapper.find(LoadingMessage).length).toEqual(1);
  });

  it('should render the Router (apps / content) if authenticated', () => {
    wrapper.setState({ isAuthenticated: true });
    expect(wrapper.find(Router).length).toEqual(1);
  });

  it('should pass the routes to the AppHub', () => {
    expect(wrapper.find(AppHub).prop('routes')).toEqual(routes);
    wrapper.setState({ isAuthenticated: true });
    expect(wrapper.find(AppHub).prop('routes')).toEqual(routes);
  });

  it('should pass the routes to the Router', () => {
    wrapper.setState({ isAuthenticated: true });
    expect(wrapper.find(Router).prop('routes')).toEqual(routes);
  });

  describe('handleDisplayRoutes', () => {
    let instance;
    beforeEach(() => {
      jest.resetAllMocks();
      localStorage.getItem = jest.fn(() => global.jwt.valid);
      wrapper = shallow(<AppHubRoot />);
      instance = wrapper.instance();
    });

    it('should clear the timeout when a valid token is found', () => {
      instance.handleDisplayRoutes();
      expect(global.clearTimeout).toHaveBeenCalled();
    });

    it('should set the user as being authenticated when a valid token is found', () => {
      instance.handleDisplayRoutes();
      expect(wrapper.state('isAuthenticated')).toEqual(true);
    });

    it('should set the timeout when there is no token or an invalid one', () => {
      localStorage.getItem = jest.fn(() => global.jwt.expired);
      global.setTimeout = jest.fn();
      wrapper = shallow(<AppHubRoot />);
      instance = wrapper.instance();
      instance.handleDisplayRoutes();
      expect(global.setTimeout).toHaveBeenCalled();
    });
  });
});
