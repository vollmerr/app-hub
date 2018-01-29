import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';

import meta from '../meta';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import NavLink from './NavLink';
import Logo from './Logo';
import UserInfo from './UserInfo';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${theme.hub.headerHeight}px;
  box-sizing: border-box;
  background: ${theme.neutralDark};
`;


const Section = styled.div`
  display: flex;
`;


const Line = styled.div`
  width: 1px;
  margin: auto;
  background: ${theme.neutralSecondary};
  height: ${(props) => props.partial ?
    `calc(${theme.hub.headerHeight}px - 15px)` :
    `calc(${theme.hub.headerHeight}px - 2px)`};
`;


class Header extends React.PureComponent {
  /**
   * Handles clicking on a panel from the header, determines if should open or close
   */
  handlePanelClick = (name) => {
    const { onChangePanelOpen, onChangePanelSelected, panel } = this.props;
    const selected = name || panel.selected; // errors if null, so set a default
    // click on same panel or overlay
    if (!name || (panel.selected === name && panel.isOpen)) {
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

  /**
   * Renders a nav link
   * @param {object} props    - props to pass through to nav link
   *
   * @return {JSX}            - NavLink to render
   */
  renderLink = (props) => {
    const { panel } = this.props;
    const linkProps = {
      onClick: this.handlePanelClick,
      ...props,
    };

    if (panel) {
      linkProps.checked = props.panel === panel.selected && panel.isOpen;
    }

    return (
      <NavLink {...linkProps} />
    );
  }

  render() {
    const {
      app,
      user,
      view,
    } = this.props;

    const { name: userName } = user;
    const { name: appName } = app;
    const { isMobile } = view;

    const appMenu = {
      isVisible: isMobile && appName,
      props: {
        iconProps: {
          iconName: 'appMenu',
        },
        title: `${appName} Navigation`,
        panel: C.APP_NAV_PANEL,
      },
    };

    const appHubTitle = {
      isVisible: !isMobile || !appName,
      props: {
        to: '/',
        text: meta.title,
        title: meta.title,
        iconProps: {
          iconName: 'Apphub',
          style: { fontSize: '24px', marginRight: '10px' },
        },
        padding: '15px',
      },
    };

    const appTitle = {
      isVisible: appName,
      props: {
        to: 'app.path', // TODO!
        text: appName,
        title: appName,
        padding: '15px',
      },
    };

    const userInfo = {
      isVisible: !isMobile && userName,
      props: {
        name: userName,
        initials: userName ? userName.split(/[,. ]/, 2).map((x) => x[0].toUpperCase()).join('') : '',
      },
    };

    const helpPanelProps = {
      iconProps: {
        iconName: 'helpMenu',
      },
      title: 'Help Panel',
      panel: C.HELP_PANEL,
    };

    const appHubPanelProps = {
      dark: true,
      iconProps: {
        iconName: 'appHubMenu',
      },
      title: 'App Hub Navigation',
      panel: C.APPS_PANEL,
    };

    return (
      <Wrapper>
        <Section>
          {appMenu.isVisible && this.renderLink(appMenu.props)}

          {!isMobile && <Logo />}
          {!isMobile && <Line partial />}

          {appHubTitle.isVisible && this.renderLink(appHubTitle.props)}
          {!name && <Line partial={!isMobile} />}

          {appTitle.isVisible && this.renderLink(appTitle.props)}
        </Section>

        <Section>
          {userInfo.isVisible && <UserInfo {...userInfo.props} />}
          <Line />

          {/* TODO: DEV/MOCK PANELS (+ Line) */}

          {/* TODO: ALERTS PANEL (+ Line) */}

          {this.renderLink(helpPanelProps)}
          <Line />

          {this.renderLink(appHubPanelProps)}
        </Section>
      </Wrapper>
    );
  }
}


const { func, object } = PropTypes;

Header.propTypes = {
  app: object.isRequired,
  user: object.isRequired,
  view: object.isRequired,
  panel: object.isRequired,
  onChangePanelOpen: func.isRequired,
  onChangePanelSelected: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
  view: selectors.getView,
  panel: selectors.getViewPanel,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePanelOpen: (open) => dispatch(actions.changePanelOpen(open)),
  onChangePanelSelected: (panel) => dispatch(actions.changePanelSelected(panel)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(Header);
