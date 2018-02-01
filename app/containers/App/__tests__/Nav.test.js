import React from 'react';
import { shallow, mount } from 'enzyme';
import { Nav as OfficeNav } from 'office-ui-fabric-react/lib/Nav';

import { testStyledComponent } from '../../../utils/testUtils';

import { Nav, Items } from '../Nav';


testStyledComponent(Items, OfficeNav);


describe('<Items />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Items isMobile={false} />);
  });

  it('should render correctly in desktop view', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in desktop view', () => {
    wrapper.setProps({ isMobile: true });
    expect(wrapper).toMatchSnapshot();
  });
});


const props = {
  onClick: jest.fn(),
  app: {
    routes: [
      { name: 'routePublic', path: '/routePublic', key: 'key1' },
      { name: 'routeUnauth', path: '/routeUnauth', key: 'key2', roles: ['otherRole'] },
      { name: 'routeAuth', path: '/routeAuth', key: 'key3', roles: ['role1'] },
    ],
  },
  view: {
    isMobile: false,
  },
  user: {
    roles: ['role1'],
  },
  history: {
    location: {
      pathname: '/routePublic',
    },
    listen: jest.fn(),
    push: jest.fn(),
  },
};


describe('<Nav />', () => {
  let wrapper;
  let instance;
  let event;
  let element;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Nav {...props} />);
    instance = wrapper.instance();
    event = { preventDefault: jest.fn() };
    element = { path: '/test' };
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  describe('componentDidMount', () => {
    beforeEach(() => {
      instance.getRoutes = jest.fn();
      const history = { ...props.history, listen: jest.fn(() => instance.getRoutes) };
      wrapper.setProps({ history });
      instance.componentDidMount();
    });

    it('should update the routes to only those the user has access to', () => {
      expect(instance.getRoutes).toHaveBeenCalledWith(props.app.routes, props.history.location);
    });

    it('should bind the history listener to `this.history`', () => {
      expect(instance.history).toBeDefined();
    });
  });


  describe('componentWillReceiveProps', () => {
    // not resetting between tests to preserve state
    const mounted = mount(<Nav {...props} />);
    const newProps = { ...props, app: { routes: [{ name: 'new route' }, ...props.app.routes] } };
    const inst = mounted.instance();
    const render = jest.spyOn(inst, 'render');
    inst.getSelectedKey = jest.fn();

    it('should re-render and update the selectedKey when new `appRoutes` passed', () => {
      mounted.setProps({ ...newProps });
      expect(inst.getSelectedKey).toHaveBeenCalled();
      expect(render).toHaveBeenCalled();
    });

    it('should not update when same new props passed', () => {
      jest.resetAllMocks();
      mounted.setProps({ ...newProps });
      expect(inst.getSelectedKey).not.toHaveBeenCalled();
      expect(render).not.toHaveBeenCalled();
    });

    it('should re-render but not update the selectedKey when new props but same `app.routes` passed', () => {
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
    let filteredRoutes;
    beforeEach(() => {
      instance.getSelectedKey = jest.fn();
      filteredRoutes = [props.app.routes[0], props.app.routes[2]]; // routes user is authed for
    });

    it('should update the `selectedKey`', () => {
      instance.getRoutes(props.app.routes, history.location);
      expect(instance.getSelectedKey).toHaveBeenCalledWith(filteredRoutes, history.location);
    });

    it('should update the `routes` in state', () => {
      instance.getRoutes(props.app.routes, history.location);
      expect(wrapper.state('routes')).toEqual(filteredRoutes);
    });
  });


  describe('getSelectedKey', () => {
    it('should exist', () => {
      expect(instance.getSelectedKey).toBeDefined();
    });

    it('should set the selectedKey if path found', () => {
      const location = { pathname: props.app.routes[2].path };
      instance.getSelectedKey(props.app.routes, location);
      expect(wrapper.state('selectedKey')).toEqual(props.app.routes[2].key);
    });

    it('should set not the selectedKey if path not found', () => {
      const location = { pathname: '' };
      instance.getSelectedKey(props.app.routes, location);
      expect(wrapper.state('selectedKey')).toEqual(props.app.routes[0].key);
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
      expect(props.history.push).toHaveBeenCalledWith(element.path);
    });

    it('should handle routing for external links (href)', () => {
      element = { href: 'http://www.google.com' };
      instance.handleClickLink(event, element);
      expect(props.history.push).toHaveBeenCalledWith(element.href);
    });
  });
});
