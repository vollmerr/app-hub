import React from 'react';
import { shallow } from 'enzyme';
import { CommandBar as OfficeBar } from 'office-ui-fabric-react/lib/CommandBar';

import { testStyledComponent, testMapDispatchToProps } from '../../../utils/testUtils';
import LoadingMessage from '../../../components/Loading/LoadingMessage';

import { initialState } from '../../AppHub/reducer';
import { changeApp } from '../../AppHub/actions';

import {
  App,
  Wrapper,
  Body,
  Content,
  CommandBar,
  mapDispatchToProps,
} from '../index';


testStyledComponent(Wrapper);
testStyledComponent(Body);
testStyledComponent(Content);
testStyledComponent(CommandBar, OfficeBar);


describe('<Content />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Content isMobile={false} />);
  });

  it('should render correctly in desktop view', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in mobile view', () => {
    wrapper.setProps({ isMobile: true });
    expect(wrapper).toMatchSnapshot();
  });
});


const props = {
  appProps: { name: 'app' }, // eslint-disable-line
  app: {
    error: null,
    loading: 0,
    home: {
      key: 'testHome',
      path: '/test',
    },
    routes: [
      { key: 'routeAuth', path: '/routeAuth', roles: ['valid'] },
      { key: 'routeUnauth', path: '/routeUnauth', roles: ['invalid'] },
      { key: 'routePublic', path: '/routePublic' },
      { key: 'routeRedirect', path: '/routeRedirect', roles: ['invalid'], rolesRedirect: { valid: 'routePublic' } },
    ],
  },
  user: {
    roles: ['valid', 'valid2'],
  },
  view: {
    isMobile: false,
  },
  onChangeApp: jest.fn(),
  history: {
    location: {
      pathname: '/route1',
    },
    push: jest.fn(),
  },
  location: {
    pathname: '/route1',
  },
};


describe('App', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
    instance = wrapper.instance();
  });


  describe('componentDidMount', () => {
    it('should dispatch `onChangeApp`', () => {
      expect(props.onChangeApp).toHaveBeenCalledWith(props.appProps);
    });
  });


  describe('componentWillReceiveProps', () => {
    it('should authorize the route when the location changes', () => {
      instance.authorizeRoute = jest.fn();
      wrapper.setProps({ location: { pathname: '/otherRoute' } });
      expect(instance.authorizeRoute).toHaveBeenCalledWith(props.app);
    });

    it('should authorize the route when the routes change', () => {
      instance.authorizeRoute = jest.fn();
      const app = { ...props.app, routes: [{ key: 'otherRoute', path: '/other' }] };
      wrapper.setProps({ app });
      expect(instance.authorizeRoute).toHaveBeenCalledWith(app);
    });
  });


  describe('componentWillUnmount', () => {
    it('should reset redux stores app state when unmounting', () => {
      jest.resetAllMocks();
      wrapper.unmount();
      expect(props.onChangeApp).toHaveBeenCalledWith(initialState.app);
    });
  });


  describe('setCommandBar', () => {
    it('should set the commandBar in state', () => {
      const commandBar = { a: 'test' };
      instance.setCommandBar(commandBar);
      expect(wrapper.state('commandBar')).toEqual(commandBar);
    });
  });


  describe('authorizeRoute', () => {
    it('should not redirect if going to a valid route with no permissions needed', async () => {
      const history = { ...props.history, location: { pathname: '/routePublic' } };
      wrapper.setProps({ history });
      await instance.authorizeRoute(props.app);
      expect(props.history.push).not.toHaveBeenCalled();
    });

    it('should not redirect if going to a valid route user has permissions for', async () => {
      const history = { ...props.history, location: { pathname: '/routeAuth' } };
      wrapper.setProps({ history });
      await instance.authorizeRoute(props.app);
      expect(props.history.push).not.toHaveBeenCalled();
    });

    it('should redirect to the routes redirect if it exists when going to a route user doesnt have permissions for', async () => {
      const history = { ...props.history, location: { pathname: '/routeRedirect' } };
      wrapper.setProps({ history });
      await instance.authorizeRoute(props.app);
      expect(props.history.push).toHaveBeenCalledWith('/routePublic');
    });

    it('should redirect to the app home if going to a route user doesnt have permissions for', async () => {
      const history = { ...props.history, location: { pathname: '/routeUnauth' } };
      wrapper.setProps({ history });
      await instance.authorizeRoute(props.app);
      expect(props.history.push).toHaveBeenCalledWith(props.app.home.path);
    });

    it('should redirect to the AppHub home if going to a route user doesnt have permissions for and no app home route', async () => {
      const history = { ...props.history, location: { pathname: '/routeUnauth' } };
      const app = { ...props.app, home: {} };
      wrapper.setProps({ history });
      await instance.authorizeRoute(app);
      expect(props.history.push).toHaveBeenCalledWith('/');
    });
  });


  describe('render', () => {
    it('should render a `LoadingMessage` if the app is not done being changed (in redux)', () => {
      expect(wrapper.find(LoadingMessage).length).toEqual(1);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly if not changing the app', () => {
      wrapper.setState({ changingApp: false });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the `CommandBar` if it `isVisible`', () => {
      const commandBar = {
        items: [{ key: 'item1' }],
      };

      expect(wrapper.find(CommandBar).length).toEqual(0);
      wrapper.setState({ changingApp: false, commandBar });
      expect(wrapper.find(CommandBar).length).toEqual(1);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      changeApp,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
