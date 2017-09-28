/**
*
* AppHubPanels
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Panel from 'components/Panel';
import { HELP_PANEL, APPS_PANEL } from 'containers/AppHub/constants';


const HelpPanel = Loadable({
  loader: () => import('./Help'),
  loading: () => null,
});

const AppsPanel = Loadable({
  loader: () => import('./Apps'),
  loading: () => null,
});

const panels = {
  [HELP_PANEL]: HelpPanel,
  [APPS_PANEL]: AppsPanel,
};

function AppHubPanel({ panel, isOpen, onClick }) {
  const Content = panels[panel];

  return (
    <Panel isOpen={isOpen} onClick={onClick}>
      <Content />
    </Panel>
  );
}

AppHubPanel.propTypes = {
  panel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppHubPanel;
