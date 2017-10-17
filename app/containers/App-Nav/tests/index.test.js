import React from 'react';
import { shallow, mount } from 'enzyme';

import { history } from 'configureStore';
import AppNav from '../index';

const props = {
  onClick: jest.fn(),
  isMobile: false,
  appRoutes: [
    { name: 'test route1', path: '/test-route', key: 'test-key' },
  ],
};

history.push = jest.fn();

describe('<AppNav />', () => {
  let wrapper;
  let instance;
  let event;
  let element;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AppNav {...props} />);
    instance = wrapper.instance();
    event = { preventDefault: jest.fn() };
    element = { path: '/test' };
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
      history.push = jest.fn();
      instance.handleClickLink(event, element);
      expect(history.push).toHaveBeenCalledWith(element.path);
    });

    it('should handle routing for external links (href)', () => {
      element = { href: 'http://www.google.com' };
      instance.handleClickLink(event, element);
      expect(history.push).toHaveBeenCalledWith(element.href);
    });
  });

  describe('getSelectedKey', () => {
    it('should exist', () => {
      expect(instance.getSelectedKey).toBeDefined();
    });

    it('should set the selectedKey if path found', () => {
      const location = { pathname: props.appRoutes[0].path };
      instance.getSelectedKey(props.appRoutes, location);
      expect(wrapper.state('selectedKey')).toEqual(props.appRoutes[0].key);
    });

    it('should set not the selectedKey if path not found', () => {
      const location = { pathname: '' };
      instance.getSelectedKey(props.appRoutes, location);
      expect(wrapper.state('selectedKey')).toEqual(null);
    });
  });

  it('should unsubscribe from history when unmounting', () => {
    instance.history = jest.fn();
    wrapper.unmount();
    expect(instance.history).toHaveBeenCalled();
  });

  it('should handle receiveing props', () => {
    const render = jest.spyOn(AppNav.prototype, 'render');
    const mounted = mount(<AppNav {...props} />);
    const newProps = { ...props, appRoutes: [{ name: 'new route' }, ...props.appRoutes] };
    const inst = mounted.instance();
    inst.getSelectedKey = jest.fn();

    // called with different routes
    mounted.setProps({ ...newProps });
    expect(inst.getSelectedKey).toHaveBeenCalled();
    expect(render).toHaveBeenCalled();

    // call with same props
    jest.resetAllMocks();
    mounted.setProps({ ...newProps });
    expect(inst.getSelectedKey).not.toHaveBeenCalled();
    expect(render).not.toHaveBeenCalled();

    // call with different props but same routes
    jest.resetAllMocks();
    newProps.isMobile = true;
    mounted.setProps({ ...newProps });
    expect(inst.getSelectedKey).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalled();
  });

  it('should bind the history listener to this.history', () => {
    expect(instance.history).toBeDefined();
  });
});
