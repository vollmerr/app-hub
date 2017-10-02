/**
*
* AppHubPanels
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Panel from 'components/Panel';
import { HELP_PANEL, APPS_PANEL, APP_NAV_PANEL } from 'containers/AppHub/constants';

const HelpPanel = Loadable({
  loader: () => import('./Help'),
  loading: () => null,
});

const AppsPanel = Loadable({
  loader: () => import('./Apps'),
  loading: () => null,
});

const AppNavPanel = Loadable({
  loader: () => import('../App-Nav'),
  loading: () => null,
});

const panels = {
  [HELP_PANEL]: HelpPanel,
  [APPS_PANEL]: AppsPanel,
  [APP_NAV_PANEL]: AppNavPanel,
};

class AppHubPanel extends React.PureComponent {
  render() {
    const { panel, isOpen, onClick, routes } = this.props;
    const Content = panels[panel];
    const left = panel === APP_NAV_PANEL;

    return (
      <Panel isOpen={isOpen} onClick={onClick} left={left}>
        <Content onClick={() => onClick()} routes={routes} />
      </Panel>
    );
  }
}

AppHubPanel.propTypes = {
  panel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppHubPanel;
