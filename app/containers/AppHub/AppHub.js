import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import AppHubHeader from 'components/AppHub-Header';
import AppHubPanel from 'components/AppHub-Panel';
import { routesProp } from 'utils/propTypes';
import theme from 'utils/theme';

import injectSaga from 'utils/injectSaga';

import {
  makeSelectIsMobile,
  makeSelectPanelIsOpen,
  makeSelectPanelSelected,
  makeSelectAppName,
  makeSelectAppRoutes,
  makeSelectUserSam,
} from './selectors';

import saga from './saga';
import { changeMobile, changePanelOpen, changePanelSelected, authUser } from './actions';
import meta from './meta';


export class AppHub extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onAuthUser } = this.props;

    onAuthUser();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { onChangeMobile, onChangePanelOpen, isMobile } = this.props;
    const mobile = window.innerWidth <= theme.breakpoints.lg;

    if (mobile !== isMobile) {
      onChangeMobile(mobile);
      onChangePanelOpen(false);
    }
  }

  handlePanelClick = (panel) => {
    const { onChangePanelOpen, onChangePanelSelected, panelSelected, panelIsOpen } = this.props;
    const selected = panel || panelSelected; // errors if null, so set a default
    // click on same panel or overlay
    if (!panel || (panelSelected === panel && panelIsOpen)) {
      // close it
      onChangePanelOpen(false);
    } else {
      // open the panel (don't dispatch unessecary actions if already open)
      if (!panelIsOpen) {
        onChangePanelOpen(true);
      }
      onChangePanelSelected(selected);
    }
  }

  render() {
    const { isMobile, panelSelected, panelIsOpen, appName, appRoutes, routes, userName } = this.props;
    const appPath = appRoutes.length ? appRoutes.find((route) => route.key.match(/Home/)).path : '';

    const headerProps = {
      isMobile,
      userName,
      appPath,
      appName,
      panel: panelSelected,
      isOpen: panelIsOpen,
      onClick: this.handlePanelClick,
    };

    const panelProps = {
      isMobile,
      routes,
      appRoutes,
      panel: panelSelected,
      isOpen: panelIsOpen,
      onClick: this.handlePanelClick,
    };

    return (
      <div>
        <Helmet>
          <title>{meta.title}</title>
          <meta name={'description'} content={meta.desc} />
          <meta name={'keywords'} content={meta.keywords} />
        </Helmet>
        <AppHubHeader {...headerProps} />
        <AppHubPanel {...panelProps} />
      </div>
    );
  }
}


const { func, bool, string } = PropTypes;

AppHub.propTypes = {
  onChangePanelOpen: func.isRequired,
  onChangePanelSelected: func.isRequired,
  onChangeMobile: func.isRequired,
  onAuthUser: func.isRequired,
  isMobile: bool.isRequired,
  panelIsOpen: bool.isRequired,
  panelSelected: string.isRequired,
  userName: string.isRequired,
  appName: string.isRequired,
  appRoutes: routesProp.isRequired,
  routes: routesProp.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
  panelIsOpen: makeSelectPanelIsOpen(),
  panelSelected: makeSelectPanelSelected(),
  appName: makeSelectAppName(),
  appRoutes: makeSelectAppRoutes(),
  userName: makeSelectUserSam(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePanelOpen: (open) => dispatch(changePanelOpen(open)),
    onChangePanelSelected: (panel) => dispatch(changePanelSelected(panel)),
    onChangeMobile: (isMobile) => dispatch(changeMobile(isMobile)),
    onAuthUser: () => dispatch(authUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'appHub', reducer });
const withSaga = injectSaga({ key: 'appHub', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(AppHub);
