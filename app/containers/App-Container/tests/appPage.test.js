import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
import Content from 'components/App-Content/Content';
import { history } from 'configureStore';

import { appPage } from '../appPage';

const Component = () => <div>test component</div>;

const userRoles = ['test role1', 'test role 2'];
const routes = [{ key: 'testHome', path: '/test' }, { key: 'key2', path: '/test2' }];

const props = {
  app: fromJS({
    error: null,
    loading: false,
    routes,
  }),
  userRoles: fromJS(userRoles),
};

history.push = jest.fn();

const error = 'test error';

describe('appPage', () => {
  let wrapper;
  let WithAppPage;
  let instance;
  let newProps;
  beforeEach(() => {
    jest.resetAllMocks();
    WithAppPage = appPage(Component);
    wrapper = shallow(<WithAppPage {...props} />);
    instance = wrapper.instance();
    newProps = { ...props };
  });

  it('should be a HOC that returns a new component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Component passed', () => {
    expect(wrapper.find(Component).length).toEqual(1);
  });

  it('should adopt the correct displayName', () => {
    // using `displayName`
    Component.displayName = 'testDisplayName';
    WithAppPage = appPage(Component);
    expect(WithAppPage.displayName).toEqual(Component.displayName);
    // using `name` from function style component
    Component.displayName = undefined;
    WithAppPage = appPage(Component);
    expect(WithAppPage.displayName).toEqual(Component.name);
  });

  it('should wrap the rendered Component in `Content` for styling', () => {
    expect(wrapper.find(Content).find(Component).length).toEqual(1);
  });

  it('should render an error message if passed an error', () => {
    newProps.app = newProps.app.set('error', error);
    wrapper.setProps({ ...newProps });
    expect(wrapper.find(ErrorMessage).length).toEqual(1);
  });

  it('should pass the `error` and `to` path to the error message', () => {
    newProps.app = newProps.app.set('error', error);
    wrapper.setProps({ ...newProps });
    expect(wrapper.find(ErrorMessage).prop('error')).toEqual(error);
    expect(wrapper.find(ErrorMessage).prop('to')).toEqual(routes[0].path);
  });

  it('should pass the AppHub base route to the error message if no `to` provided', () => {
    newProps.app.routes = fromJS([]);
    newProps.app = newProps.app.set('error', error);
    newProps.app = newProps.app.set('routes', fromJS([]));
    wrapper.setProps({ ...newProps });
    expect(wrapper.find(ErrorMessage).prop('to')).toEqual('/');
  });

  it('should pass a loading component if loading', () => {
    newProps.app = newProps.app.set('loading', true);
    wrapper.setProps({ ...newProps });
    expect(wrapper.find(Component).prop('Loading')).toEqual(<LoadingMessage />);
  });


  describe('componentWillReceiveProps', () => {
    it('should update as normal when non route props change', () => {
      newProps.app = newProps.app.set('loading', true);
      expect(instance.componentWillReceiveProps(newProps)).toEqual(true);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should update as normal if going to a valid route with no permissions needed', () => {
      newProps.app = newProps.app.set('routes', fromJS([{ key: 'key3', path: '/test3' }]));
      history.location.pathname = '/test3';
      expect(instance.componentWillReceiveProps(newProps)).toEqual(true);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should update as normal if going to a valid route user has permissions for', () => {
      newProps.app = newProps.app.set('routes', fromJS([{ key: 'key3', path: '/test3', roles: [userRoles[0]] }]));
      history.location.pathname = '/test3';
      expect(instance.componentWillReceiveProps(newProps)).toEqual(true);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should redirect to the app home if going to a route user doesnt have permissions for', () => {
      newProps.app = newProps.app.set('routes', fromJS([routes[0], { key: 'key3', path: '/test3', roles: ['otherRole'] }]));
      history.location.pathname = '/test3';
      expect(instance.componentWillReceiveProps(newProps)).toEqual(false);
      expect(history.push).toHaveBeenCalledWith(routes[0].path);
    });

    it('should redirect to the AppHub home if going to a route user doesnt have permissions for and no app home route', () => {
      newProps.app = newProps.app.set('routes', fromJS([{ key: 'key3', path: '/test3', roles: ['otherRole'] }]));
      history.location.pathname = '/test3';
      expect(instance.componentWillReceiveProps(newProps)).toEqual(false);
      expect(history.push).toHaveBeenCalledWith('/');
    });
  });
});

