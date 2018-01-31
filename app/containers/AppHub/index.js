import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import toJS from '../../hocs/toJS';
import injectSaga from '../../utils/injectSaga';
import theme from '../../utils/theme';
import Router from '../../components/Router';
import Loading from '../../components/Loading';

import Header from './Header';
import Panels from './Panels';
import routes from './routes';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';


export const Wrapper = styled(Fabric) `
  height: 100%;
  overflow: hidden;
`;


export class AppHub extends React.PureComponent {
  componentDidMount() {
    const { onAuthUser } = this.props;
    onAuthUser();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Handles window resizing, determines if is mobile or desktop view
   */
  handleResize = () => {
    const { onChangeMobile, onChangePanelOpen, view, panel } = this.props;
    const mobile = window.innerWidth <= theme.breakpoints.lg;

    if (mobile !== view.isMobile) {
      onChangeMobile(mobile);
      if (panel.isOpen) {
        onChangePanelOpen(false);
      }
    }
  }

  /**
   * Handles clicking on a panel from the header, determines if should open or close
   */
  handlePanelClick = (name) => {
    const { onChangePanelOpen, onChangePanelSelected, panel } = this.props;
    const selected = name || panel.name; // errors if null, so set a default
    // click on same panel or overlay
    if (!name || (panel.name === name && panel.isOpen)) {
      // close it
      onChangePanelOpen(false);
    } else {
      // open the panel (don't dispatch unessecary actions if already open)
      if (!panel.isOpen) {
        onChangePanelOpen(true);
      }
      onChangePanelSelected(selected);
    }
  }

  render() {
    const { app, user } = this.props;

    const headerProps = {
      onClick: this.handlePanelClick,
    };

    const routerProps = {
      routes,
    };

    const loadingProps = {
      loading: !user.isAuthenticated && !app.error,
      error: app.error,
    };

    const panelProps = {
      onClick: this.handlePanelClick,
    };

    return (
      <Wrapper>
        <Header {...headerProps} />
        {
          user.isAuthenticated ?
            <Router {...routerProps} /> :
            <Loading {...loadingProps} />
        }
        <Panels {...panelProps} />
      </Wrapper>
    );
  }
}


const { object, func } = PropTypes;

AppHub.propTypes = {
  app: object.isRequired,
  user: object.isRequired,
  view: object.isRequired,
  panel: object.isRequired,
  onAuthUser: func.isRequired,
  onChangeMobile: func.isRequired,
  onChangePanelOpen: func.isRequired,
  onChangePanelSelected: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
  view: selectors.getView,
  panel: selectors.getViewPanel,
});

export const mapDispatchToProps = (dispatch) => ({
  onAuthUser: () => dispatch(actions.authUser()),
  onChangeMobile: (isMobile) => dispatch(actions.changeMobile(isMobile)),
  onChangePanelOpen: (open) => dispatch(actions.changePanelOpen(open)),
  onChangePanelSelected: (panel) => dispatch(actions.changePanelSelected(panel)),
});

const withSaga = injectSaga({ key: 'appHub', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withSaga,
  withConnect,
  toJS,
)(AppHub);
