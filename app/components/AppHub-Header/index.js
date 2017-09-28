/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { HELP_PANEL, APPS_PANEL } from 'containers/AppHub/constants';

import Wrapper from './Wrapper';
import Section from './Section';
import UserInfo from './UserInfo';
import Icon from './Icon';
import Logo from './Logo';
import Line from './Line';
import Text from './Text';


function Header({ isMobile = false, onClick }) {
  return (
    <Wrapper>
      <Section>
        {!isMobile && <Logo />}
        {!isMobile && <Line partial />}
        <Icon
          icon={'Glimmer'}
          size={24}
          title={'App Hub'}
          onClick={onClick}
        />
        <Text text={'App Hub'} />
      </Section>

      <Section>
        {
          !isMobile &&
          <UserInfo
            text={'Vollmer, Ryan@CIO'}
            initals={'RV'}
          />
        }
        <Line />
        <Icon
          icon={'Help'}
          title={'Help'}
          panel={HELP_PANEL}
          onClick={onClick}
        />
        <Line />
        <Icon
          icon={'Waffle'}
          size={40}
          title={'Hub Navigation'}
          panel={APPS_PANEL}
          onClick={onClick}
        />
      </Section>

      {/* {
        Object.values(routes).map((route) => (
          <Link key={route.to} to={route.to}>{route.text}</Link>
        ))
      } */}
    </Wrapper>
  );
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
