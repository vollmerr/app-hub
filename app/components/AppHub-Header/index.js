/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { HELP_PANEL, APPS_PANEL, APP_NAV_PANEL, ALERTS_PANEL } from 'containers/AppHub/constants';

import Wrapper from './Wrapper';
import Section from './Section';
import UserInfo from './UserInfo';
import Logo from './Logo';
import Line from './Line';

import Link from './Link';

class Header extends React.PureComponent {
  render() {
    const { isMobile, onClick, appName, appPath, panel, isOpen } = this.props;

    return (
      <Wrapper>
        <Section>

          {/* MOBILE ? APP NAV HAMBUGER : CDT LOGO */}
          {
            (isMobile && appName) &&
            <Link
              iconProps={{
                iconName: 'GlobalNavButton',
                style: { fontSize: '28px' },
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
                iconName: 'Glimmer',
                style: { fontSize: '24px', marginRight: '10px' },
              }}
              title={'App Hub'}
              text={'App Hub'}
              to={'/'}
            />
          }
          {appName && <Line partial={!isMobile} />}

          {/* APP TITLE */}
          <Link
            title={appName}
            text={appName}
            to={appPath}
          />
        </Section>

        {/* RIGHT SECTION */}
        <Section>

          {/* USER INFO */}
          {
            !isMobile &&
            <UserInfo
              text={'Vollmer, Ryan@CIO'}
              initals={'RV'}
            />
          }
          <Line />

{/* TODO: CONDITIONAL IF ALERTS */}
          {/* ALERTS PANEL */}
          <Link
            iconProps={{
              iconName: 'Warning',
              style: { fontSize: '28px' },
            }}
            title={'Alerts Panel'}
            panel={ALERTS_PANEL}
            onClick={onClick}
            checked={panel === ALERTS_PANEL && isOpen}
          />
          <Line />
{/* /TODO: CONDITIONAL IF ALERTS */}

          {/* HELP PANEL */}
          <Link
            iconProps={{
              iconName: 'Help',
              style: { fontSize: '28px' },
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
              iconName: 'Waffle',
              style: { fontSize: '40px' },
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
};

export default Header;
