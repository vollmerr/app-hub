import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from '../../../utils/testUtils';
import theme from '../../../utils/theme';
import Router from '../../../components/Router';
import Loading from '../../../components/Loading';

import Header from '../Header';
import Panels from '../Panels';
import { changeMobile, changePanelOpen, changePanelSelected, authUser } from '../actions';
import { AppHub, mapDispatchToProps } from '../index';


const props = {
  app: {
    name: 'testApp',
    error: null,
  },
  user: {
    name: 'testName',
    isAuthenticated: true,
  },
  view: {
    isMobile: false,
  },
  panel: {
    isOpen: false,
    name: 'testPanel',
  },
  onAuthUser: jest.fn(),
  onChangeMobile: jest.fn(),
  onChangePanelOpen: jest.fn(),
  onChangePanelSelected: jest.fn(),
};


describe('<AppHub />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<AppHub {...props} />);
    instance = wrapper.instance();
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
        wrapper.setProps({ panel: { isOpen: true } });
        global.window.innerWidth = theme.breakpoints.lg - 1;
        instance.handleResize();
        expect(props.onChangeMobile).toHaveBeenCalledWith(true);
        expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
        // still mobile
        global.window.innerWidth = theme.breakpoints.lg - 3;
        wrapper.setProps({ view: { isMobile: true } }); // simluate being updated in redux store
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

    it('should not dispatch `onChangePanelOpen` if the panel is closed', () => {
      const oldWidth = global.window.innerWidth;
      try {
        // make view change to get in if statement
        wrapper.setProps({ panel: { isOpen: false } });
        global.window.innerWidth = theme.breakpoints.lg - 1;
        instance.handleResize();
        expect(props.onChangePanelOpen).not.toHaveBeenCalled();
      } finally {
        // reset window width to avoid global bleed over into other tests
        global.window.innerWidth = oldWidth;
      }
    });
  });


  describe('handlePanelClick', () => {
    it('should close the panel if there is none selected', () => {
      instance.handlePanelClick(undefined);
      expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
    });

    it('should close the panel if it is the same panel and open', () => {
      wrapper.setProps({ panel: { isOpen: true, name: props.panel.name } });
      instance.handlePanelClick(props.panel.name);
      expect(props.onChangePanelOpen).toHaveBeenCalledWith(false);
    });

    it('should not open but select the panel if it is different and already open', () => {
      const panel = 'other panel';
      wrapper.setProps({ panel: { isOpen: true, name: props.panel.name } });
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


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have render a `Header`, `Panels`, and `Router`', () => {
      expect(wrapper.find(Header).length).toEqual(1);
      expect(wrapper.find(Panels).length).toEqual(1);
      expect(wrapper.find(Router).length).toEqual(1);
      expect(wrapper.find(Loading).length).toEqual(0);
    });

    it('should render a `Loading` indicator if not authenicated', () => {
      wrapper.setProps({ user: { isAuthenticated: false } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      authUser,
      changeMobile,
      changePanelOpen,
      changePanelSelected,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
