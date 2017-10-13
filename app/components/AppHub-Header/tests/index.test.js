import React from 'react';
import { shallow } from 'enzyme';

import {
  HELP_PANEL,
  APPS_PANEL,
  APP_NAV_PANEL,
  ALERTS_PANEL,
  DEV_PANEL,
} from 'containers/AppHub/constants';

import AppHubHeader from '../index';
import Section from '../Section';
import UserInfo from '../UserInfo';
import Logo from '../Logo';

global.isDev = false;

const props = {
  isMobile: false,
  onClick: jest.fn(),
  appName: 'test app name',
  appPath: '/test-route',
  panel: 'test panel name',
  isOpen: false,
  userName: 'test user',
  alerts: [{ app: 'app name 1', message: 'message 1' }],
};

const testIfChecked = (wrapper, panel) => {
  wrapper.setProps({ panel, isOpen: true });
  expect(wrapper.find({ panel }).prop('checked')).toEqual(true);
};


describe('<AppHubHeader />', () => {
  describe('desktop view', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <AppHubHeader {...props} />
      );
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render two sections (left and right)', () => {
      expect(wrapper.find(Section).length).toEqual(2);
    });

    it('should not render app nav link', () => {
      const panel = APP_NAV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(0);
    });

    it('should render the logo', () => {
      expect(wrapper.find(Logo).length).toEqual(1);
    });

    it('should render the App Hub title/icon', () => {
      const text = 'App Hub';
      expect(wrapper.find({ text }).length).toEqual(1);
    });

    it('should render the app title if passed an `appName`', () => {
      const text = props.appName;
      expect(wrapper.find({ text }).length).toEqual(1);

      wrapper.setProps({ appName: undefined });
      expect(wrapper.find({ text }).length).toEqual(0);
    });

    it('should render the user information if passed a `userName`', () => {
      expect(wrapper.find(UserInfo).length).toEqual(1);

      wrapper.setProps({ userName: undefined });
      expect(wrapper.find(UserInfo).length).toEqual(0);
    });

    it('should generate the correct user intitials', () => {
      const initials = 'TU'; // for 'test user'
      expect(wrapper.find(UserInfo).prop('initials')).toEqual(initials);
    });

    it('should render the dev panel link if in development mode', () => {
      const panel = DEV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(0);

      global.isDev = true;
      wrapper = shallow(<AppHubHeader {...props} />);
      testIfChecked(wrapper, panel);
      global.isDev = false; // reset to not dev mode for other tests.
      expect(wrapper.find({ panel }).length).toEqual(1);
    });

    it('should render the alerts panel link if passed `alerts`', () => {
      const panel = ALERTS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);

      wrapper.setProps({ alerts: [] });
      expect(wrapper.find({ panel }).length).toEqual(0);
    });

    it('should render the help panel link', () => {
      const panel = HELP_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);
    });

    it('should render the App Hub navigation link', () => {
      const panel = APPS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);
    });
  });

  describe('mobile view', () => {
    let wrapper;
    beforeEach(() => {
      const mobileProps = { ...props, isMobile: true };
      wrapper = shallow(
        <AppHubHeader {...mobileProps} />
      );
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render two sections (left and right)', () => {
      expect(wrapper.find(Section).length).toEqual(2);
    });

    it('should render app nav link if passed a `appName`', () => {
      const panel = APP_NAV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);

      wrapper.setProps({ appName: undefined });
      expect(wrapper.find({ panel }).length).toEqual(0);
    });

    it('should not render the logo', () => {
      expect(wrapper.find(Logo).length).toEqual(0);
    });

    it('should not render the App Hub title/icon', () => {
      const text = 'App Hub';
      expect(wrapper.find({ text }).length).toEqual(0);
    });

    it('should render the app title if passed one', () => {
      const text = props.appName;
      expect(wrapper.find({ text }).length).toEqual(1);

      wrapper.setProps({ appName: undefined });
      expect(wrapper.find({ text }).length).toEqual(0);
    });

    it('should not render the user information', () => {
      expect(wrapper.find(UserInfo).length).toEqual(0);
    });

    it('should render the dev panel link if in development mode', () => {
      const panel = DEV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(0);

      global.isDev = true;
      wrapper = shallow(<AppHubHeader {...props} />);
      testIfChecked(wrapper, panel);
      global.isDev = false; // reset to not dev mode for other tests.
      expect(wrapper.find({ panel }).length).toEqual(1);
    });

    it('should render the alerts panel link if passed `alerts`', () => {
      const panel = ALERTS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);

      wrapper.setProps({ alerts: [] });
      expect(wrapper.find({ panel }).length).toEqual(0);
    });

    it('should render the help panel link', () => {
      const panel = HELP_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);
    });

    it('should render the App Hub navigation link', () => {
      const panel = APPS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);

      testIfChecked(wrapper, panel);
    });
  });
});
