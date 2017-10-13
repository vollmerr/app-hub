/**
 *
 * AppHub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import AppHubHeader from 'components/AppHub-Header';
import AppHubPanel from 'components/AppHub-Panel';
import theme from 'utils/theme';

import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';
import {
  makeSelectIsMobile,
  makeSelectPanelIsOpen,
  makeSelectPanelSelected,
  makeSelectAppRoutes,
  makeSelectAppMeta,
  makeSelectUserSam,
} from './selectors';
// import reducer from './reducer';
import saga from './saga';
import { changeMobile, changePanelOpen, changePanelSelected, authUserRequest } from './actions';
import meta from './meta';

export class AppHub extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(authUserRequest());
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { dispatch, isMobile } = this.props;
    const mobile = window.innerWidth <= theme.breakpoints.lg;

    if (mobile !== isMobile) {
      dispatch(changeMobile(mobile));
      dispatch(changePanelOpen(false));
    }
  }

  handlePanelClick = (panel) => {
    const { dispatch, panelSelected, panelIsOpen } = this.props;
    const selected = panel || panelSelected; // errors if null, so set a default
    // click on same panel or overlay
    if (!panel || (panelSelected === panel && panelIsOpen)) {
      // close it
      dispatch(changePanelOpen(false));
    } else {
      // open the panel (don't dispatch unessecary actions if already open)
      if (!panelIsOpen) {
        dispatch(changePanelOpen(true));
      }
      dispatch(changePanelSelected(selected));
    }
  }

  render() {
    const { isMobile, panelSelected, panelIsOpen, appMeta, appRoutes, routes, userName } = this.props;
    const appPath = appRoutes.length ? appRoutes.find((route) => route.key.match(/Home/)).path : '';

    const headerProps = {
      isMobile,
      userName,
      appPath,
      appName: appMeta.title,
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

AppHub.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  panelIsOpen: PropTypes.bool.isRequired,
  panelSelected: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  appMeta: PropTypes.object.isRequired,
  appRoutes: PropTypes.array.isRequired,
  routes: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
  panelIsOpen: makeSelectPanelIsOpen(),
  panelSelected: makeSelectPanelSelected(),
  appRoutes: makeSelectAppRoutes(),
  appMeta: makeSelectAppMeta(),
  userName: makeSelectUserSam(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
