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

import {
  makeSelectIsMobile,
  makeSelectPanelIsOpen,
  makeSelectPanelSelected,
  makeSelectAppRoutes,
  makeSelectAppMeta,
  makeSelectUserSam,
} from './selectors';

import saga from './saga';
import { changeMobile, changePanelOpen, changePanelSelected, authUserRequest } from './actions';
import meta from './meta';

export class AppHub extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onAuthUserRequest } = this.props;

    onAuthUserRequest();
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
  onChangePanelOpen: PropTypes.func.isRequired,
  onChangePanelSelected: PropTypes.func.isRequired,
  onChangeMobile: PropTypes.func.isRequired,
  onAuthUserRequest: PropTypes.func.isRequired,
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

export function mapDispatchToProps(dispatch) {
  return {
    onChangePanelOpen: (open) => dispatch(changePanelOpen(open)),
    onChangePanelSelected: (panel) => dispatch(changePanelSelected(panel)),
    onChangeMobile: (isMobile) => dispatch(changeMobile(isMobile)),
    onAuthUserRequest: () => dispatch(authUserRequest()),
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
