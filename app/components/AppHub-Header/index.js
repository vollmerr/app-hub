import React from 'react';
import PropTypes from 'prop-types';

import {
  HELP_PANEL,
  APPS_PANEL,
  APP_NAV_PANEL,
  ALERTS_PANEL,
  DEV_PANEL,
  MOCK_PANEL,
} from 'containers/AppHub/constants';

import Wrapper from './Wrapper';
import Section from './Section';
import UserInfo from './UserInfo';
import Logo from './Logo';
import Line from './Line';

import Link from './Link';

global.isDev = process.env.NODE_ENV === 'development';
global.isMock = process.env.NODE_ENV === 'MOCK';


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

    const initials = userName ? userName.split(/[,. ]/, 2).map((x) => x[0].toUpperCase()).join('') : '';
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
            global.isMock &&
            <Link
              iconProps={{
                iconName: 'settingsMenu',
              }}
              title={'Mock Panel'}
              panel={MOCK_PANEL}
              onClick={onClick}
              checked={panel === MOCK_PANEL && isOpen}
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

const { func, bool, string, array } = PropTypes;

Header.propTypes = {
  isMobile: bool.isRequired,
  onClick: func.isRequired,
  appName: string,
  appPath: string,
  panel: string.isRequired,
  isOpen: bool.isRequired,
  userName: string,
  alerts: array,
};

export default Header;
