import React from 'react';
import PropTypes from 'prop-types';

import {
  HELP_PANEL,
  APPS_PANEL,
  APP_NAV_PANEL,
  ALERTS_PANEL,
  DEV_PANEL,
} from 'containers/AppHub/constants';

import Wrapper from './Wrapper';
import Section from './Section';
import UserInfo from './UserInfo';
import Logo from './Logo';
import Line from './Line';

import Link from './Link';

global.isDev = process.env.NODE_ENV === 'development';


class Header extends React.PureComponent {
  render() {
    const {
      isMobile,
      onClick,
      appName,
      appPath,
      panel,
      isOpen,
      userName,
      alerts,
    } = this.props;

    const initials = userName ? userName.split(/[. ]/, 2).map((x) => x[0].toUpperCase()).join('') : '';
    const hasAlerts = alerts && alerts.length;

    return (
      <Wrapper>
        <Section>

          {/* MOBILE ? APP NAV HAMBUGER : CDT LOGO */}
          {
            (isMobile && appName) &&
            <Link
              iconProps={{
                iconName: 'appMenu',
              }}
              title={`${appName} Navigation`}
              panel={APP_NAV_PANEL}
              onClick={onClick}
              checked={panel === APP_NAV_PANEL && isOpen}
            />
          }
          {
            !isMobile &&
            <Logo />
          }
          {
            !isMobile &&
            <Line partial />
          }
          {/* APP HUB TITLE */}
          {
            (!isMobile || !appName) &&
            <Link
              iconProps={{
                iconName: 'Apphub',
                style: { fontSize: '24px', marginRight: '10px' },
              }}
              title={'App Hub'}
              text={'App Hub'}
              to={'/'}
              onClick={onClick}
              padding={'15px'}
            />
          }
          {
            appName &&
            <Line partial={!isMobile} />
          }
          {/* APP TITLE */}
          {
            appName &&
            <Link
              title={appName}
              text={appName}
              to={appPath}
              onClick={onClick}
              padding={'15px'}
            />
          }
        </Section>
        {/* RIGHT SECTION */}
        <Section>
          {/* USER INFO */}
          {
            (!isMobile && userName) &&
            <UserInfo
              name={userName}
              initials={initials}
            />
          }
          <Line />
          {
            global.isDev &&
            <Link
              iconProps={{
                iconName: 'settingsMenu',
              }}
              title={'Dev Panel'}
              panel={DEV_PANEL}
              onClick={onClick}
              checked={panel === DEV_PANEL && isOpen}
            />
          }
          {
            global.isDev &&
            <Line />
          }
          {/* TODO: CONDITIONAL IF ALERTS */}
          {/* ALERTS PANEL */}
          {
            hasAlerts &&
            <Link
              iconProps={{
                iconName: 'alertsMenu',
              }}
              title={'Alerts Panel'}
              panel={ALERTS_PANEL}
              onClick={onClick}
              checked={panel === ALERTS_PANEL && isOpen}
            />
          }
          {
            hasAlerts &&
            <Line />
          }
          {/* /TODO: CONDITIONAL IF ALERTS */}
          {/* HELP PANEL */}
          <Link
            iconProps={{
              iconName: 'helpMenu',
            }}
            title={'Help Panel'}
            panel={HELP_PANEL}
            onClick={onClick}
            checked={panel === HELP_PANEL && isOpen}
          />
          <Line />
          {/* APP HUB NAV PANEL */}
          <Link
            dark
            iconProps={{
              iconName: 'appHubMenu',
            }}
            title={'Hub Navigation'}
            panel={APPS_PANEL}
            onClick={onClick}
            checked={panel === APPS_PANEL && isOpen}
          />
        </Section>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  appName: PropTypes.string,
  appPath: PropTypes.string,
  panel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  alerts: PropTypes.array,
};

export default Header;
