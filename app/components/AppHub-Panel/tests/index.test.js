import React from 'react';
import { shallow } from 'enzyme';

import {
  HELP_PANEL,
  APPS_PANEL,
  APP_NAV_PANEL,
  ALERTS_PANEL,
  DEV_PANEL,
  MOCK_PANEL,
} from 'containers/AppHub/constants';

import Panel from 'components/Panel';
import AppNav from 'containers/App-Nav';
import AppHubPanel from '../index';
import Help from '../Help';
import Apps from '../Apps';
import Alerts from '../Alerts';
import Dev from '../Dev';
import Mock from '../Mock';

const props = {
  panel: HELP_PANEL,
  isOpen: true,
  onClick: jest.fn(),
  routes: [],
  appRoutes: [],
  isMobile: false,
};


describe('<AppHubPanel />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppHubPanel {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the correct panel based off `panel`', () => {
    wrapper.setProps({ panel: HELP_PANEL });
    expect(wrapper.find(Help).length).toEqual(1);

    wrapper.setProps({ panel: APPS_PANEL });
    expect(wrapper.find(Apps).length).toEqual(1);

    wrapper.setProps({ panel: APP_NAV_PANEL });
    expect(wrapper.find(AppNav).length).toEqual(1);

    wrapper.setProps({ panel: ALERTS_PANEL });
    expect(wrapper.find(Alerts).length).toEqual(1);

    wrapper.setProps({ panel: DEV_PANEL });
    expect(wrapper.find(Dev).length).toEqual(1);

    wrapper.setProps({ panel: MOCK_PANEL });
    expect(wrapper.find(Mock).length).toEqual(1);

    expect(wrapper.children().length).toEqual(1);
  });

  it('should render the panel on the left only if APP_NAV_PANEL', () => {
    expect(wrapper.find(Panel).length).toEqual(1);
    expect(wrapper.find(Panel).prop('left')).toEqual(false);

    wrapper.setProps({ panel: APP_NAV_PANEL });
    expect(wrapper.find(Panel).prop('left')).toEqual(true);
  });
});
