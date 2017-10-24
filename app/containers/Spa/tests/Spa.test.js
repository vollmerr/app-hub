import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import theme from 'utils/theme';

import AppContainer from 'containers/App-Container';
import { Spa, mapDispatchToProps } from '../Spa';

const props = {
  meta: { desc: 'test desc' },
  routes: [{ name: 'route1', key: 'testHome', path: '/testpath' }, { name: 'route2', key: '2', path: '/testpath2' }],
};


describe('<Spa />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<Spa {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have render a AppContainer', () => {
    expect(wrapper.find(AppContainer).length).toEqual(1);
  });

  it('should pass the AppContainer the routes and meta for Spa', () => {
    expect(wrapper.find(AppContainer).prop('app')).toEqual());
  });

  describe('componentDidMount', () => {
    it('should authorize the user', () => {
      expect(props.onAuthUserRequest).toHaveBeenCalled();
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
    const actions = [
      changeMobile,
      changePanelOpen,
      changePanelSelected,
      authUserRequest,
    ];

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
