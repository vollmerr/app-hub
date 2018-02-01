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
import * as C from '../constants';

import NavLink from './NavLink';
import Logo from './Logo';
import UserInfo from './UserInfo';


export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${theme.hub.headerHeight}px;
  box-sizing: border-box;
  background: ${theme.neutralDark};
`;


export const Section = styled.div`
  display: flex;
`;


export const Line = styled.div`
  width: 1px;
  margin: auto;
  background: ${theme.neutralSecondary};
  height: ${(props) => props.partial ?
    `${theme.hub.headerHeight - 15}px` :
    `${theme.hub.headerHeight - 2}px`
  };
`;


global.isDev = process.env.NODE_ENV === 'development';
global.isMock = process.env.NODE_ENV === 'MOCK';


export class Header extends React.PureComponent {
  /**
   * Renders a nav link
   * @param {object} props    - props to pass through to nav link
   *
   * @return {JSX}            - NavLink to render
   */
  renderLink = (props) => {
    const { panel, onClick } = this.props;
    const linkProps = {
      onClick,
      ...props,
    };

    if (panel) {
      linkProps.checked = props.panel === panel.name && panel.isOpen;
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
    const { name: appName, home } = app;
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
        to: home.path,
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

    const devPanel = {
      isVisible: global.isDev || global.isMock,
      props: {
        iconProps: {
          iconName: 'settingsMenu',
        },
        title: 'Developer Panel',
        panel: C.DEV_PANEL,
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
          {appName && <Line partial={!isMobile} />}

          {appTitle.isVisible && this.renderLink(appTitle.props)}
        </Section>

        <Section>
          {userInfo.isVisible && <UserInfo {...userInfo.props} />}
          <Line />

          {devPanel.isVisible && this.renderLink(devPanel.props)}
          {devPanel.isVisible && <Line />}

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
  onClick: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
  view: selectors.getView,
  panel: selectors.getViewPanel,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Header);
