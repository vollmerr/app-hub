import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';

import * as C from '../../constants';

import { Header, Wrapper, Section, Line } from '../index';
import UserInfo from '../UserInfo';
import Logo from '../Logo';


testStyledComponent(Wrapper);
testStyledComponent(Section);
testStyledComponent(Line);


describe('<Line/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Line />);
  });

  it('should render correctly if is `partial`', () => {
    wrapper.setProps({ partial: true });
    expect(wrapper).toMatchSnapshot();
  });
});


global.isDev = false;

const props = {
  app: {
    name: 'app name',
    homePath: '/test',
  },
  user: {
    name: 'user name',
  },
  view: {
    isMobile: false,
  },
  panel: {
    name: 'test panel',
    isOpen: false,
  },
  onClick: jest.fn(),
};

const testIfChecked = (wrapper, name) => {
  wrapper.setProps({ panel: { name, isOpen: true } });
  expect(wrapper.find({ panel: name }).prop('checked')).toEqual(true);
};


describe('<Header />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(
      <Header {...props} />
    );
    instance = wrapper.instance();
  });

  describe.only('renderLink', () => {
    let linkWrapper;
    it.only('should render a checked `NavLink` if the selected panel is open', () => {
      const linkProps = {
        panel: props.panel.name,
      };
      wrapper.setProps({ panel: { ...props.panel, isOpen: true } });
      linkWrapper = shallow(instance.renderLink(linkProps));
      expect(linkWrapper.prop('checked')).toEqual(true);
    });

    it('should render an unchecked `NavLink` if is not open or not the panel selected', () => {
      let linkProps = {
        panel: 'other panel',
      };
      wrapper.setProps({ panel: { ...props.panel, isOpen: true } });
      linkWrapper = shallow(instance.renderLink(linkProps));
      expect(linkWrapper.prop('checked')).toEqual(false);

      linkProps = {
        panel: props.panel.name,
      };
      linkWrapper = shallow(instance.renderLink(linkProps));
      expect(linkWrapper.prop('checked')).toEqual(false);
    });
  });

  describe('render - desktop view', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render two sections (left and right)', () => {
      expect(wrapper.find(Section).length).toEqual(2);
    });

    it('should not render the app nav hamburger link', () => {
      const panel = C.APP_NAV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(0);
    });

    it('should render the logo', () => {
      expect(wrapper.find(Logo).length).toEqual(1);
    });

    it('should render the App Hub title/icon', () => {
      const text = 'App Hub';
      expect(wrapper.find({ text }).length).toEqual(1);
    });

    it('should render the app title if passed an `app.name`', () => {
      const text = props.app.name;
      expect(wrapper.find({ text }).length).toEqual(1);

      wrapper.setProps({ app: {} });
      expect(wrapper.find({ text }).length).toEqual(0);
    });

    it('should render the user information if passed a `user.name`', () => {
      expect(wrapper.find(UserInfo).length).toEqual(1);

      wrapper.setProps({ user: {} });
      expect(wrapper.find(UserInfo).length).toEqual(0);
    });

    it('should generate the correct user intitials', () => {
      const initials = 'UN'; // for 'User Name'
      expect(wrapper.find(UserInfo).prop('initials')).toEqual(initials);
    });

    it('should render the dev panel link if in development mode', () => {
      try {
        const panel = C.DEV_PANEL;
        expect(wrapper.find({ panel }).length).toEqual(0);

        global.isDev = true;
        wrapper = shallow(<Header {...props} />);

        expect(wrapper.find({ panel }).length).toEqual(1);
        testIfChecked(wrapper, panel);
      } finally {
        global.isDev = false; // reset to not dev mode for other tests.
      }
    });

    it('should render the dev panel link if in mock mode', () => {
      try {
        const panel = C.DEV_PANEL;
        expect(wrapper.find({ panel }).length).toEqual(0);

        global.isMock = true;
        wrapper = shallow(<Header {...props} />);

        expect(wrapper.find({ panel }).length).toEqual(1);
        testIfChecked(wrapper, panel);
      } finally {
        global.isMock = false; // reset to not dev mode for other tests.
      }
    });

    // it('should render the alerts panel link if passed `alerts`', () => {
    //   const panel = ALERTS_PANEL;
    //   expect(wrapper.find({ panel }).length).toEqual(1);

    //   testIfChecked(wrapper, panel);

    //   wrapper.setProps({ alerts: [] });
    //   expect(wrapper.find({ panel }).length).toEqual(0);
    // });

    it('should render the help panel link', () => {
      const panel = C.HELP_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);
      testIfChecked(wrapper, panel);
    });

    it('should render the App Hub navigation link', () => {
      const panel = C.APPS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);
      testIfChecked(wrapper, panel);
    });
  });

  describe('render - mobile view', () => {
    beforeEach(() => {
      const mobileProps = { ...props, view: { isMobile: true } };
      wrapper = shallow(
        <Header {...mobileProps} />
      );
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render two sections (left and right)', () => {
      expect(wrapper.find(Section).length).toEqual(2);
    });

    it('should render app nav link if passed a `app.name`', () => {
      const panel = C.APP_NAV_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);
      testIfChecked(wrapper, panel);

      wrapper.setProps({ app: {} });
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
      const text = props.app.name;
      expect(wrapper.find({ text }).length).toEqual(1);

      wrapper.setProps({ app: {} });
      expect(wrapper.find({ text }).length).toEqual(0);
    });

    it('should not render the user information', () => {
      expect(wrapper.find(UserInfo).length).toEqual(0);
    });

    it('should render the dev panel link if in development mode', () => {
      try {
        const panel = C.DEV_PANEL;
        expect(wrapper.find({ panel }).length).toEqual(0);

        global.isDev = true;
        wrapper = shallow(<Header {...props} />);
        testIfChecked(wrapper, panel);
        expect(wrapper.find({ panel }).length).toEqual(1);
      } finally {
        global.isDev = false; // reset to not dev mode for other tests.
      }
    });

    //   it('should render the alerts panel link if passed `alerts`', () => {
    //     const panel = ALERTS_PANEL;
    //     expect(wrapper.find({ panel }).length).toEqual(1);

    //     testIfChecked(wrapper, panel);

    //     wrapper.setProps({ alerts: [] });
    //     expect(wrapper.find({ panel }).length).toEqual(0);
    //   });

    it('should render the help panel link', () => {
      const panel = C.HELP_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);
      testIfChecked(wrapper, panel);
    });

    it('should render the App Hub navigation link', () => {
      const panel = C.APPS_PANEL;
      expect(wrapper.find({ panel }).length).toEqual(1);
      testIfChecked(wrapper, panel);
    });
  });
});
