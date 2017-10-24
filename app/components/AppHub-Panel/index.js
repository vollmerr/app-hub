import React from 'react';
import PropTypes from 'prop-types';

import AppNav from 'containers/App-Nav';
import Panel from 'components/Panel';
import {
  HELP_PANEL,
  APPS_PANEL,
  APP_NAV_PANEL,
  ALERTS_PANEL,
  DEV_PANEL,
} from 'containers/AppHub/constants';

import Help from './Help';
import Apps from './Apps';
import Alerts from './Alerts';
import Dev from './Dev';

const panels = {
  [HELP_PANEL]: Help,
  [APPS_PANEL]: Apps,
  [APP_NAV_PANEL]: AppNav,
  [ALERTS_PANEL]: Alerts,
  [DEV_PANEL]: Dev,
};

class AppHubPanel extends React.PureComponent {
  render() {
    const { panel, isOpen, onClick, routes, appRoutes, isMobile } = this.props;
    const Content = panels[panel];
    const left = panel === APP_NAV_PANEL;

    /* istanbul ignore next */
    return (
      <Panel isOpen={isOpen} onClick={onClick} left={left}>
        <Content onClick={() => onClick()} routes={routes} appRoutes={appRoutes} isMobile={isMobile} />
      </Panel>
    );
  }
}

AppHubPanel.propTypes = {
  panel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  routes: PropTypes.array,
  appRoutes: PropTypes.array,
  isMobile: PropTypes.bool.isRequired,
};

export default AppHubPanel;
