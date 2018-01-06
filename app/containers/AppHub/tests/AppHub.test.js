import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { testMapDispatchToProps } from 'utils/testUtils';
import theme from 'utils/theme';

import AppHubHeader from 'components/AppHub-Header';
import AppHubPanel from 'components/AppHub-Panel';
import { AppHub, mapDispatchToProps } from '../AppHub';
import { changeMobile, changePanelOpen, changePanelSelected, authUser } from '../actions';

const props = {
  onChangePanelOpen: jest.fn(),
  onChangePanelSelected: jest.fn(),
  onChangeMobile: jest.fn(),
  onAuthUser: jest.fn(),
  isMobile: false,
  panelIsOpen: false,
  panelSelected: 'test panel',
  userName: 'test name',
  appName: 'test app name',
  appRoutes: fromJS([{ name: 'approute1', key: 'testHome', path: '/testpath' }, { name: 'approute2', key: '2', path: '/testpath2' }]),
  userRoutes: fromJS([{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }]),
};


describe('<AppHub />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AppHub {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a header and panel', () => {
    expect(wrapper.find(AppHubHeader).length).toEqual(1);
    expect(wrapper.find(AppHubPanel).length).toEqual(1);
  });

  it('should set the appPath as the home path of the app', () => {
    expect(wrapper.find(AppHubHeader).prop('appPath')).toEqual(props.userRoutes.get(0).get('path'));
  });

  it('should not set an appPath if no `appRoutes`', () => {
    wrapper.setProps({ appRoutes: fromJS([]) });
    expect(wrapper.find(AppHubHeader).prop('appPath')).toEqual('');
  });

  describe('componentDidMount', () => {
    it('should authorize the user', () => {
      expect(props.onAuthUser).toHaveBeenCalled();
    });

    it('should handle resizing', () => {
      instance.handleResize = jest.fn();
      instance.componentDidMount();
      expect(instance.handleResize).toHaveBeenCalled();
    });

    it('should add `handleResize` to the resize listener', () => {
      global.window.addEventListener = jest.fn();
      instance.componentDidMount();
      expect(global.window.addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
    });
  });

  describe('componentWillUnmount', () => {
    it('should remove `handleResize` from the resize listener', () => {
      global.window.removeEventListener = jest.fn();
      wrapper.unmount();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
    });
  });

  describe('handleResize', () => {
    it('should set if the view is mobile and close any panels when the viewport changes', () => {
      const oldWidth = global.window.innerWidth;
      try {
        // make mobile
        global.window.innerWidth = theme.breakpoints.lg - 1;
        instance.handleResize();
        expect(props.onChangeMobile).toHaveBeenCalledWith(true);
        expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
        // still mobile
        global.window.innerWidth = theme.breakpoints.lg - 3;
        wrapper.setProps({ isMobile: true }); // simluate being updated in redux store
        jest.resetAllMocks();
        instance.handleResize();
        expect(props.onChangeMobile).not.toHaveBeenCalled();
        expect(props.onChangePanelOpen).not.toHaveBeenCalled();
        // make desktop
        global.window.innerWidth = theme.breakpoints.lg + 3;
        jest.resetAllMocks();
        instance.handleResize();
        expect(props.onChangeMobile).toHaveBeenCalledWith(false);
        expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
      } finally {
        // reset window width to avoid global bleed over into other tests
        global.window.innerWidth = oldWidth;
      }
    });
  });

  describe('handlePanelClick', () => {
    it('should close the panel if there is none selected', () => {
      instance.handlePanelClick();
      expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
    });

    it('should close the panel if it is the same panel and open', () => {
      wrapper.setProps({ panelIsOpen: true });
      instance.handlePanelClick(props.panelSelected);
      expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
    });

    it('should not open but select the panel if it is already open', () => {
      const panel = 'other panel';
      wrapper.setProps({ panelIsOpen: true });
      instance.handlePanelClick(panel);
      expect(props.onChangePanelOpen).not.toHaveBeenCalled();
      expect(props.onChangePanelSelected).toHaveBeenCalledWith(panel);
    });

    it('should open and select the panel if its a different panel and not already open', () => {
      const panel = 'other panel';
      instance.handlePanelClick(panel);
      expect(props.onChangePanelOpen).toHaveBeenCalledWith(true);
      expect(props.onChangePanelSelected).toHaveBeenCalledWith(panel);
    });
  });

  describe('mapDispatchToProps', () => {
    const actions = {
      changeMobile,
      changePanelOpen,
      changePanelSelected,
      authUser,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
