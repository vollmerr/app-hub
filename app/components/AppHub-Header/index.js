/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';
import Section from './Section';
import UserInfo from './UserInfo';
import Icon from './Icon';
import Logo from './Logo';
import Line from './Line';
import Text from './Text';

// , routes = []
function Header({ isMobile = false, onClick = () => alert('clicki..') }) {
  return (
    <Wrapper>
      <Section>
        {!isMobile && <Logo />}
        {!isMobile && <Line partial />}
        <Icon
          icon={'Glimmer'}
          size={'24px'}
          title={'App Hub'}
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
          name={'PaneHelp.name'}
          icon={'Help'}
          title={'Help'}
          onClick={onClick}
        />
        <Line />
        <Icon
          name={'PaneNav.name'}
          icon={'Waffle'}
          size={'40px'}
          title={'Hub Navigation'}
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

};

export default Header;
