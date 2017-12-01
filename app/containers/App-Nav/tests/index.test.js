import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';

import { history } from 'configureStore';
import { AppNav } from '../index';

const roles = [
  'test role1',
  'test role 2',
];

const routes = [
  { name: 'test route1', path: '/test-route1', key: 'test-key1' },
  { name: 'test route2', path: '/test-route2', key: 'test-key2', roles: ['otherRole'] },
  { name: 'test route3', path: '/test-route3', key: 'test-key3', roles: [roles[1]] },
];

const filteredRoutes = [routes[0], routes[2]]; // routes user has permissions for

const props = {
  onClick: jest.fn(),
  isMobile: false,
  appRoutes: routes,
  userRoles: fromJS(roles),
};

history.location = routes[0].path;
history.push = jest.fn();

describe('<AppNav />', () => {
  let wrapper;
  let instance;
  let event;
  let element;
  beforeEach(() => {
    wrapper = shallow(<AppNav {...props} />);
    instance = wrapper.instance();
    jest.resetAllMocks();
    event = { preventDefault: jest.fn() };
    element = { path: '/test' };
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  describe('componentDidMount', () => {
    it('should update the routes to only those the user has access to', () => {
      instance.getRoutes = jest.fn();
      instance.componentDidMount();
      expect(instance.getRoutes).toHaveBeenCalledWith(props.appRoutes, history.location);
    });

    it('should bind the history listener to `this.history`', () => {
      instance.componentDidMount();
      expect(instance.history).toBeDefined();
    });
  });


  describe('componentWillReceiveProps', () => {
    // not resetting between tests to preserve state
    const render = jest.spyOn(AppNav.prototype, 'render');
    const mounted = mount(<AppNav {...props} />);
    const newProps = { ...props, appRoutes: [{ name: 'new route' }, ...props.appRoutes] };
    const inst = mounted.instance();
    inst.getSelectedKey = jest.fn();

    it('should re-render and update the selectedKey when new `appRoutes` passed', () => {
      mounted.setProps({ ...newProps });
      expect(inst.getSelectedKey).toHaveBeenCalled();
      expect(render).toHaveBeenCalled();
    });

    it('should not update when new same props passed', () => {
      jest.resetAllMocks();
      mounted.setProps({ ...newProps });
      expect(inst.getSelectedKey).not.toHaveBeenCalled();
      expect(render).not.toHaveBeenCalled();
    });

    it('should re-render but not update the selectedKey when new props but same `appRoutes` passed', () => {
      jest.resetAllMocks();
      newProps.isMobile = true;
      mounted.setProps({ ...newProps });
      expect(inst.getSelectedKey).not.toHaveBeenCalled();
      expect(render).toHaveBeenCalled();
    });
  });


  describe('componentWillUnmount', () => {
    it('should unsubscribe from history', () => {
      instance.history = jest.fn();
      wrapper.unmount();
      expect(instance.history).toHaveBeenCalled();
    });
  });


  describe('getRoutes', () => {
    beforeEach(() => {
      instance.getSelectedKey = jest.fn();
    });

    it('should update the `selectedKey`', () => {
      instance.getRoutes(props.appRoutes, history.location);
      expect(instance.getSelectedKey).toHaveBeenCalledWith(filteredRoutes, history.location);
    });

    it('should update the `routes` in state', () => {
      instance.getRoutes(props.appRoutes, history.location);
      expect(wrapper.state('routes')).toEqual(filteredRoutes);
    });
  });


  describe('getSelectedKey', () => {
    it('should exist', () => {
      expect(instance.getSelectedKey).toBeDefined();
    });

    it('should set the selectedKey if path found', () => {
      const location = { pathname: routes[0].path };
      instance.getSelectedKey(props.appRoutes, location);
      expect(wrapper.state('selectedKey')).toEqual(routes[0].key);
    });

    it('should set not the selectedKey if path not found', () => {
      const location = { pathname: '' };
      instance.getSelectedKey(props.appRoutes, location);
      expect(wrapper.state('selectedKey')).toEqual(null);
    });
  });


  describe('handleClickLink', () => {
    it('should exist', () => {
      expect(instance.handleClickLink).toBeDefined();
    });

    it('should call onClick if passed one', () => {
      instance.handleClickLink(event, element);
      expect(props.onClick).toHaveBeenCalledWith(event, element);
    });

    it('should not call onClick if not passed one', () => {
      wrapper.setProps({ onClick: undefined });
      instance.handleClickLink(event, element);
      expect(props.onClick).not.toHaveBeenCalled();
    });

    it('should handle routing for internal links (path)', () => {
      instance.handleClickLink(event, element);
      expect(history.push).toHaveBeenCalledWith(element.path);
    });

    it('should handle routing for external links (href)', () => {
      element = { href: 'http://www.google.com' };
      instance.handleClickLink(event, element);
      expect(history.push).toHaveBeenCalledWith(element.href);
    });
  });
});
